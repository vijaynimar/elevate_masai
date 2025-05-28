const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logFilePath = process.argv[2];

if (!logFilePath) {
  console.error(' Please provide a log file path. Example: node analyze.js sample.log');
  process.exit(1);
}

const stats = {
  totalRequests: 0,
  error4xx: 0,
  error5xx: 0,
  urlCount: {},
};

try {
  const fileStream = fs.createReadStream(logFilePath);

  fileStream.on('error', (err) => {
    console.error(`Error opening file: ${err.message}`);
    process.exit(1);
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => {
    const parts = line.trim().split(' ');
    if (parts.length !== 3) {
      console.warn(` Skipping invalid line: ${line}`);
      return;
    }

    const [ip, url, statusCodeStr] = parts;
    const statusCode = parseInt(statusCodeStr, 10);

    if (isNaN(statusCode)) {
      console.warn(`Invalid status code: ${statusCodeStr}`);
      return;
    }

    stats.totalRequests++;

    if (statusCode >= 400 && statusCode < 500) stats.error4xx++;
    if (statusCode >= 500 && statusCode < 600) stats.error5xx++;

    stats.urlCount[url] = (stats.urlCount[url] || 0) + 1;
  });

  rl.on('close', () => {
    const topUrls = Object.entries(stats.urlCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([url, count]) => ({ url, count }));

    const finalStats = {
      totalRequests: stats.totalRequests,
      error4xx: stats.error4xx,
      error5xx: stats.error5xx,
      top3URLs: topUrls,
    };

    fs.writeFileSync('stats.json', JSON.stringify(finalStats, null, 2));
    console.log(' Analysis complete! Stats saved to stats.json');
  });

} catch (err) {
  console.error(`Unexpected error: ${err.message}`);
}
