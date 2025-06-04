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

function filterByPublisher() {
  const dropdown = document.getElementById("publisherFilter");
  const selected = dropdown.value.trim().toLowerCase();
  const table = document.getElementById("movieTable");
  const tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td")[4]; // 5th column: Publisher
    if (td) {
      const txtValue = (td.textContent || td.innerText).trim().toLowerCase();
      if (selected === "all" || txtValue === selected) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function filterByPublisherInput() {
  const input = document.getElementById("publisherSearch").value.toLowerCase();
  const table = document.getElementById("movieTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) { // Skip header
    const publisherCell = rows[i].getElementsByTagName("td")[4];
    if (publisherCell) {
      const publisher = publisherCell.textContent.toLowerCase();
      if (publisher.startsWith(input)) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}