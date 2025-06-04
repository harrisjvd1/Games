// Filters by size
function sortTable(columnIndex) {
  const table = document.getElementById("movieTable");
  const rows = Array.from(table.rows).slice(1);
  const isNumeric = columnIndex === 1;
  const direction = table.getAttribute("data-sort-dir") === "asc" ? -1 : 1;

  rows.sort((a, b) => {
    const aText = a.cells[columnIndex].textContent.trim();
    const bText = b.cells[columnIndex].textContent.trim();

    if (isNumeric) {
      const aSize = parseFloat(aText) * (aText.includes("GB") ? 1024 : 1);
      const bSize = parseFloat(bText) * (bText.includes("GB") ? 1024 : 1);
      return (aSize - bSize) * direction;
    }

    return aText.localeCompare(bText) * direction;
  });

  rows.forEach(row => table.tBodies[0].appendChild(row));
  table.setAttribute("data-sort-dir", direction === 1 ? "asc" : "desc");
}
// Filters Alphabetically
function filterTable() {
  const input = document.getElementById("searchInput").value.toUpperCase();
  const table = document.getElementById("movieTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const gameName = rows[i].getElementsByTagName("td")[0];
    if (gameName) {
      const match = gameName.textContent.toUpperCase().includes(input);
      rows[i].style.display = match ? "" : "none";
    }
  }
}

// For the dropdown menu
const publisherFilter = document.getElementById("publisherFilter");
const table = document.getElementById("movieTable");

publisherFilter.addEventListener("change", () => {
  const selected = publisherFilter.value.toLowerCase();
  const rows = table.tBodies[0].rows;

  for (let row of rows) {
    const publisherCell = row.cells[4].textContent.toLowerCase();

    if (selected === "all" || publisherCell === selected) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});
