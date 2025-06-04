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

function filterTableByPublisher() {
  const publisherInput = document.getElementById("publisherSearch").value.toLowerCase().trim();
  const publisherDropdown = document.getElementById("publisherFilter");
  const dropdownValue = publisherDropdown.value.toLowerCase();

  // Sync dropdown with input
  if (publisherInput !== dropdownValue) {
    // If input matches one of the dropdown options, select it
    let foundMatch = false;
    for (let i = 0; i < publisherDropdown.options.length; i++) {
      if (publisherDropdown.options[i].value.toLowerCase() === publisherInput) {
        publisherDropdown.selectedIndex = i;
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) {
      publisherDropdown.selectedIndex = 0; // 'All'
    }
  }

  // Sync input with dropdown (if dropdown changed)
  if (dropdownValue !== publisherInput) {
    document.getElementById("publisherSearch").value = dropdownValue === 'all' ? '' : publisherDropdown.options[publisherDropdown.selectedIndex].value;
  }

  const table = document.getElementById("movieTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const publisherCell = rows[i].getElementsByTagName("td")[4]; // Publisher column
    if (publisherCell) {
      const publisherText = publisherCell.textContent.toLowerCase().trim();
      if (
        dropdownValue === 'all' ||
        publisherText.startsWith(publisherInput) ||
        publisherText === dropdownValue
      ) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

// Attach event listeners to input and dropdown after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("publisherSearch").addEventListener("keyup", filterTableByPublisher);
  document.getElementById("publisherFilter").addEventListener("change", filterTableByPublisher);
});
