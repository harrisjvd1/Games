function sortTable(colIndex) {
  const table = document.getElementById("movieTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);

  const isSize = colIndex === 1;

  rows.sort((a, b) => {
    let aText = a.cells[colIndex].innerText.toLowerCase();
    let bText = b.cells[colIndex].innerText.toLowerCase();

    if (isSize) {
      const parseSize = s => parseFloat(s) * (s.includes('gb') ? 1000 : 1);
      aText = parseSize(aText);
      bText = parseSize(bText);
    }

    return aText > bText ? 1 : -1;
  });

  rows.forEach(row => tbody.appendChild(row));
}