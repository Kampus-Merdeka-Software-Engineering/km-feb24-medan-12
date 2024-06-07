// Fungsi untuk memperbarui statistik di halaman
function updateStatistics(data) {
  document.getElementById("total-transaction").textContent = data.length;
  var totalRevenue = data.reduce(
    (acc, curr) => acc + parseInt(curr.SALE_PRICE),
    0
  );
  var totalCommercial = data.reduce(
    (acc, curr) => acc + parseInt(curr.COMMERCIAL_UNITS),
    0
  );
  var totalResidential = data.reduce(
    (acc, curr) => acc + parseInt(curr.RESIDENTIAL_UNITS),
    0
  );

  document.getElementById("total-revenue-text").textContent = `$${Math.floor(
    totalRevenue / 1000000
  )}M`;
  document.getElementById("average-sales").textContent = `$${Math.floor(
    data.length ? (totalRevenue / data.length / 1000).toFixed(2) : 0
  )}K`;
  document.getElementById("total-commercial").textContent = totalCommercial;
  document.getElementById("total-residential").textContent = totalResidential;
}

// Fungsi untuk memuat dan memfilter data
function loadData() {
  fetch("data_NYC.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // Tampilkan semua data secara default
      updateStatistics(data);

      // Tambahkan event listener untuk form
      document
        .getElementById("filter-form")
        .addEventListener("submit", function (event) {
          event.preventDefault(); // Mencegah pengiriman form

          const neighborhood = document.getElementById("NEIGHBORHOOD").value;
          const fromDate = document.getElementById("start-date").value;
          const toDate = document.getElementById("end-date").value;

          // Validasi input tanggal
          const minDate = new Date("2016-09-01");
          const maxDate = new Date("2017-08-31");

          if (
            fromDate &&
            (new Date(fromDate) < minDate || new Date(fromDate) > maxDate)
          ) {
            alert("From Date must be between 01-09-2016 and 31-08-2017.");
            return;
          }

          if (
            toDate &&
            (new Date(toDate) < minDate || new Date(toDate) > maxDate)
          ) {
            alert("To Date must be between 01-09-2016 and 31-08-2017.");
            return;
          }

          // Filter data berdasarkan input form
          const filteredData = data.filter((item) => {
            const saleDate = new Date(item.SALE_DATE);
            const fromCondition = fromDate
              ? saleDate >= new Date(fromDate)
              : true;
            const toCondition = toDate ? saleDate <= new Date(toDate) : true;
            const neighborhoodCondition = neighborhood
              ? item.NEIGHBORHOOD === neighborhood
              : true;
            return (
              fromCondition &&
              toCondition &&
              (neighborhood === "" || neighborhoodCondition)
            );
          });

          // Update statistik berdasarkan data yang difilter
          updateStatistics(filteredData);
        });
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

// Panggil fungsi loadData saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadData);

// Insight Chart Total Revenue by Neighbourhood
function showHideInsight(event) {
  var modal = document.getElementById("insightMegaModal");
  modal.style.display = "block";
}

function closeMegaModal() {
  var modal = document.getElementById("insightMegaModal");
  modal.style.display = "none";
}

window.onclick = function(event) {
  var modal = document.getElementById("insightMegaModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Insight Chart Sales Composition
function showHideComposition(event) {
  var modal = document.getElementById("insightCompositionModal");
  modal.style.display = "block";
}

function closeCompositionModal() {
  var modal = document.getElementById("insightCompositionModal");
  modal.style.display = "none";
}

window.onclick = function(event) {
  var modal = document.getElementById("insightCompositionModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Insight Chart Quarterly Sales Revenue
function showHideQuarter(event) {
  var modal = document.getElementById("insightModal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("insightModal");
  modal.style.display = "none";
}

window.onclick = function(event) {
  var modal = document.getElementById("insightModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//INSIGHT BUTTON REVENUE BY BUILDING CATEGORY
function showHideInsight2(event) {
  var modal = document.getElementById("insight2MegaModal");
  modal.style.display = "block";
}

function closeMega2Modal() {
  var modal = document.getElementById("insight2MegaModal");
  modal.style.display = "none";
}

window.onclick = function(event) {
  var modal = document.getElementById("insight2MegaModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//insight Chart Monthly Average Revenue
//function showHideMonthly(e) {
//   var chart_line = document.getElementById("insightLineChart");

//   if (chart_line.classList.contains("hidden")) {
//     chart_line.classList.remove("hidden");
//     chart_line.classList.add("show");
//   } else if (chart_line.classList.contains("show")) {
//     chart_line.classList.remove("show");
//     chart_line.classList.add("hidden");
//   }
// }

//Insight Chart Total Revenue by Tax Class
function showHideTaxClass(e) {
  var modal = document.getElementById("insightTaxClassModal");
  modal.style.display = "block";

  const select = document.getElementById("chart-4-taxclass");
  const selectedTaxClass = select.value;
  const taxClassIndex = window.dataTaxClass.tax_class.indexOf(selectedTaxClass);
  const revenue = window.dataTaxClass.total_revenue[taxClassIndex];

  let insightMessage = "";
  if (selectedTaxClass === "All") {
    insightMessage = `Terdapat perbedaan pendapatan yang signifikan tax class 2 lebih tinggi daripada tax class 1 dengan selisih lebih dari US$ 4 Milyar.`;
  } else if (selectedTaxClass === "2") {
    insightMessage = `Tax Class ${selectedTaxClass} menghasilkan pendapatan total tertinggi, yaitu US$ ${revenue}.`;
  } else if (selectedTaxClass === "4") {
    insightMessage = `Tax Class ${selectedTaxClass} menghasilkan pendapatan total kedua tertinggi, yaitu US$ ${revenue}.`;
  } else if (selectedTaxClass === "1") {
    insightMessage = `Tax Class ${selectedTaxClass} menghasilkan pendapatan total terendah, yaitu US$ ${revenue}.`;
  }

  document.getElementById("insightChartTaxClass").textContent = insightMessage;
}

function closeTaxClassModal() {
  var modal = document.getElementById("insightTaxClassModal");
  modal.style.display = "none";
}

window.onclick = function(event) {
  var modal = document.getElementById("insightTaxClassModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}