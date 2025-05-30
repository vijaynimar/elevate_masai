const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'products.json');
const LOG_FILE = path.join(__dirname, 'access.log');
const RATE_LIMIT = 100;
const RATE_WINDOW = 60 * 60 * 1000;

let rateLimitMap = {};

const readData = async () => {
  try {
    const data = await fs.promises.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
};

const writeData = async (data) => {
  await fs.promises.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

const logRequest = (req) => {
  const entry = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  fs.appendFile(LOG_FILE, entry, () => {});
};

const rateLimit = (ip) => {
  const now = Date.now();
  if (!rateLimitMap[ip]) rateLimitMap[ip] = [];
  rateLimitMap[ip] = rateLimitMap[ip].filter(t => now - t < RATE_WINDOW);
  if (rateLimitMap[ip].length >= RATE_LIMIT) return false;
  rateLimitMap[ip].push(now);
  return true;
};

const send = (res, code, data) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

const parseBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      resolve(JSON.parse(body));
    } catch {
      reject();
    }
  });
});

const server = http.createServer(async (req, res) => {
  const ip = req.socket.remoteAddress;
  if (!rateLimit(ip)) return send(res, 429, { error: 'Too Many Requests' });
  logRequest(req);
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === '/products' && req.method === 'GET') {
    const data = await readData();
    const result = data.filter(p => {
      if (query.name && !p.name.toLowerCase().includes(query.name.toLowerCase())) return false;
      if (query.category && p.category !== query.category) return false;
      if (query.minPrice && p.price < parseFloat(query.minPrice)) return false;
      if (query.maxPrice && p.price > parseFloat(query.maxPrice)) return false;
      return true;
    });
    return send(res, 200, result);
  }

  if (pathname === '/products' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      if (!body.name || !body.price || !body.quantity) return send(res, 400, { error: 'Missing fields' });
      const data = await readData();
      const newProduct = { id: Date.now().toString(), ...body };
      data.push(newProduct);
      await writeData(data);
      return send(res, 201, newProduct);
    } catch {
      return send(res, 400, { error: 'Invalid JSON' });
    }
  }

  if (pathname.startsWith('/products/') && req.method === 'PUT') {
    try {
      const id = pathname.split('/')[2];
      const body = await parseBody(req);
      const data = await readData();
      const index = data.findIndex(p => p.id === id);
      if (index === -1) return send(res, 404, { error: 'Not Found' });
      const updated = { ...data[index], ...body };
      if (!updated.name || !updated.price || !updated.quantity) return send(res, 400, { error: 'Missing fields' });
      data[index] = updated;
      await writeData(data);
      return send(res, 200, updated);
    } catch {
      return send(res, 400, { error: 'Invalid JSON' });
    }
  }

  if (pathname.startsWith('/products/') && req.method === 'DELETE') {
    const id = pathname.split('/')[2];
    const data = await readData();
    const index = data.findIndex(p => p.id === id);
    if (index === -1) return send(res, 404, { error: 'Not Found' });
    const deleted = data.splice(index, 1)[0];
    await writeData(data);
    return send(res, 200, deleted);
  }

  send(res, 404, { error: 'Not Found' });
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
