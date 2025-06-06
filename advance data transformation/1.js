const employees = [
  { id: 1, name: 'Alice', dept: 'HR', joined: 2021, salary: 40000, active: true },
  { id: 2, name: 'Bob', dept: 'Tech', joined: 2020, salary: 75000, active: true },
  { id: 3, name: 'Charlie', dept: 'Finance', joined: 2018, salary: 62000, active: true },
  { id: 4, name: 'David', dept: 'Tech', joined: 2022, salary: 80000, active: true },
  { id: 5, name: 'Eve', dept: 'Finance', joined: 2021, salary: 68000, active: false },
  { id: 6, name: 'Frank', dept: 'HR', joined: 2023, salary: 42000, active: true },
  { id: 7, name: 'Grace', dept: 'Tech', joined: 2023, salary: 95000, active: true },
];

function topDepartments() {
  const filtered = [];
  for (let i = 0; i < employees.length; i++) {
    const e = employees[i];
    if (e.joined > 2019 && e.active) {
      filtered.push(e);
    }
  }

  const depts = [];
  for (let i = 0; i < filtered.length; i++) {
    const d = filtered[i].dept;
    if (depts.indexOf(d) === -1) {
      depts.push(d);
    }
  }

  const averages = [];
  for (let i = 0; i < depts.length; i++) {
    const d = depts[i];
    let total = 0;
    let count = 0;
    for (let j = 0; j < filtered.length; j++) {
      if (filtered[j].dept === d) {
        total += filtered[j].salary;
        count++;
      }
    }
    averages.push({ dept: d, avg: total / count });
  }

  for (let i = 0; i < averages.length - 1; i++) {
    for (let j = i + 1; j < averages.length; j++) {
      if (averages[j].avg > averages[i].avg) {
        const temp = averages[i];
        averages[i] = averages[j];
        averages[j] = temp;
      }
    }
  }

  const result = [];
  for (let i = 0; i < Math.min(3, averages.length); i++) {
    result.push(averages[i].dept);
  }
  return result;
}

console.log(topDepartments());
