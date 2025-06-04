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
    const gameNameCell = rows[i].getElementsByTagName("td")[0];
    if (gameNameCell) {
      const originalText = gameNameCell.textContent;
      const textUpper = originalText.toUpperCase();
      const matchIndex = textUpper.indexOf(input);

      if (input && matchIndex > -1) {
        // Highlight matched part
        const beforeMatch = originalText.slice(0, matchIndex);
        const matchText = originalText.slice(matchIndex, matchIndex + input.length);
        const afterMatch = originalText.slice(matchIndex + input.length);

        gameNameCell.innerHTML = `${beforeMatch}<mark>${matchText}</mark>${afterMatch}`;

        // Show row immediately and remove fade-out if any
        rows[i].classList.remove("fade-out");
        rows[i].style.display = "";
      } else if (!input) {
        // No input: reset text and show row
        gameNameCell.textContent = originalText;
        rows[i].classList.remove("fade-out");
        rows[i].style.display = "";
      } else {
        // No match: animate fade-out then hide row, reset text
        gameNameCell.textContent = originalText;
        rows[i].classList.add("fade-out");
        setTimeout(() => {
          if (rows[i].classList.contains("fade-out")) {
            rows[i].style.display = "none";
          }
        }, 300);
      }
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
      // Show row immediately, remove fade
      row.classList.remove("fade-out");
      row.style.display = "";
    } else {
      // Animate fade out
      row.classList.add("fade-out");
      setTimeout(() => {
        if (row.classList.contains("fade-out")) {
          row.style.display = "none";
        }
      }, 300);
    }
  }
});


  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight === 0 ? 0 : scrollTop / docHeight;

    const hue = 220 + scrollPercent * 10;         // 220–230 (cool blue tones)
    const lightness = 94 - scrollPercent * 6;     // Subtle darkening

    document.body.style.backgroundColor = `hsl(${hue}, 40%, ${lightness}%)`;
  });

  
let debounceTimer;
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keyup', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    filterTable();
  }, 300);
});

document.querySelectorAll("td.hover-game").forEach((cell) => {
  const previewBox = document.getElementById("preview");
  const img = previewBox.querySelector("img");

  cell.addEventListener("mouseover", () => {
    const imgUrl = cell.getAttribute("data-image");
    if (imgUrl) {
      img.src = imgUrl;
      previewBox.style.display = "block";
    }
  });

  cell.addEventListener("mousemove", (e) => {
    previewBox.style.top = `${e.pageY + 10}px`;
    previewBox.style.left = `${e.pageX + 10}px`;
  });

  cell.addEventListener("mouseout", () => {
    previewBox.style.display = "none";
  });
});
