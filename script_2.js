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

function showHideInsight(e) {
  var chart_mega = document.getElementById("insightChartMega");

  if (chart_mega.classList.contains("hidden")) {
    chart_mega.classList.remove("hidden");
    chart_mega.classList.add("show");
  } else if (chart_mega.classList.contains("show")) {
    chart_mega.classList.remove("show");
    chart_mega.classList.add("hidden");
  }
}

function showHide(e) {
  var chart_pie = document.getElementById("insightPieChart");

  if (chart_pie.classList.contains("hidden")) {
    chart_pie.classList.remove("hidden");
    chart_pie.classList.add("show");
  } else if (chart_pie.classList.contains("show")) {
    chart_pie.classList.remove("show");
    chart_pie.classList.add("hidden");
  }
}
