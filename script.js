// Quarterly Sales Revenue and Transactions Chart
function createQuarterlySalesChart() {
  fetch("File Json/Quarterly_Sales_revenue.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      var arrRevenue = [];
      var arrQuarters = [];
      var arrTransactions = [];

      data.forEach((element) => {
        arrRevenue.push(element.TOTAL_REVENUE);
        arrTransactions.push(element.TOTAL_TRANSACTIONS);
        arrQuarters.push(
          `Q${element.EXTRACTED_QUARTER} ${element.EXTRACTED_YEAR}`
        );
      });

      var objChart = {
        total_revenue: arrRevenue,
        quarters: arrQuarters,
        total_transactions: arrTransactions,
      };

      createQuarterlyChart(objChart, "line"); // Tipe chart sekarang adalah 'line'
    })
    .catch(function (error) {
      console.error("Error during fetch operation:", error);
    });
}

function createQuarterlyChart(arrPassed, type) {
  const ctx = document.getElementById("mychart_1");
  new Chart(ctx, {
    type: type, // Sekarang adalah grafik garis
    data: {
      labels: arrPassed.quarters,
      datasets: [
        {
          label: "Total Revenue",
          data: arrPassed.total_revenue,
          borderColor: "rgb(0, 0, 255)",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          borderWidth: 1,
          fill: false, // Pastikan area di bawah garis tidak diisi
          tension: 0.4, // Menambahkan kelengkungan pada garis
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "QUARTERLY SALES REVENUE",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = "Total Revenue: " + context.raw || "";
              let index = context.dataIndex;
              let totalTransactions = arrPassed.total_transactions[index];
              return [label, "Total Transactions: " + totalTransactions];
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1400000000, // Atur nilai maksimal untuk pendapatan
          title: {
            display: true,
            text: "Total Revenue (in USD)",
          },
        },
      },
      responsive: true,
    },
  });
}

// Memulai proses pembuatan grafik
createQuarterlySalesChart();

//MONTHLY AVERAGE REVENUE
const chart2 = document.getElementById("mychart_2").getContext("2d");
let chartMonthlyRevenue = null;

fetch("File Json/Monthly_Average_Revenue.json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    const arrYearMonth = data.map((item) => item.YEAR_MONTH);
    const arrAverageSalePrice = data.map((item) => item.AVERAGE_SALE_PRICE);

    const objChart = {
      Year_month: arrYearMonth,
      Avg_salesprice: arrAverageSalePrice,
    };
    console.log(objChart);
    window.dataMonthlyRevenue = objChart;
    generateMonthlyRevenueFilter(objChart);
    createChart7(objChart, "line");
  });

function generateMonthlyRevenueFilter(dataMonthlyRevenuePassed) {
  const startSelect = document.getElementById("start-month");
  const endSelect = document.getElementById("end-month");

  dataMonthlyRevenuePassed.Year_month.forEach((Yearmonth, index) => {
    const startOption = document.createElement("option");
    startOption.value = Yearmonth;
    startOption.textContent = Yearmonth;
    startSelect.appendChild(startOption);

    if (index === dataMonthlyRevenuePassed.Year_month.length - 1) {
      const endOption = document.createElement("option");
      endOption.value = Yearmonth;
      endOption.textContent = Yearmonth;
      endSelect.appendChild(endOption);
      endOption.selected = true;
    }
  });

  startSelect.addEventListener("change", function (event) {
    const selectedStartMonth = event.target.value;
    const startIndex =
      window.dataMonthlyRevenue.Year_month.indexOf(selectedStartMonth);

    endSelect.innerHTML = "";

    for (
      let i = startIndex;
      i < window.dataMonthlyRevenue.Year_month.length;
      i++
    ) {
      const endOption = document.createElement("option");
      endOption.value = window.dataMonthlyRevenue.Year_month[i];
      endOption.textContent = window.dataMonthlyRevenue.Year_month[i];
      endSelect.appendChild(endOption);

      if (i === window.dataMonthlyRevenue.Year_month.length - 1) {
        endOption.selected = true;
      }
    }
  });

  startSelect.dispatchEvent(new Event("change"));
}

function updateMonthlyRevenueChart(e) {
  e.preventDefault();

  const startSelect = document.getElementById("start-month");
  const endSelect = document.getElementById("end-month");

  const from = startSelect.value;
  const to = endSelect.value;

  const fromIndex = window.dataMonthlyRevenue.Year_month.indexOf(from);
  const toIndex = window.dataMonthlyRevenue.Year_month.indexOf(to);

  const yearMonth = window.dataMonthlyRevenue.Year_month.slice(
    fromIndex,
    toIndex + 1
  );
  const averageRevenue = window.dataMonthlyRevenue.Avg_salesprice.slice(
    fromIndex,
    toIndex + 1
  );

  chartMonthlyRevenue.data.labels = yearMonth;
  chartMonthlyRevenue.data.datasets[0].data = averageRevenue;
  chartMonthlyRevenue.update();
}

function createChart7(arrLine3, type) {
  chartMonthlyRevenue = new Chart(chart2, {
    type: type,
    data: {
      labels: arrLine3.Year_month,
      datasets: [
        {
          label: "Monthly_Average_Revenue",
          data: arrLine3.Avg_salesprice,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "MONTHLY AVERAGE REVENUE",
        },
      },
      scales: {
        y: {
          display: true,
          ticks: {
            beginAtZero: true,
            max: 800000,
            min: 500000,
          },
        },
      },
    },
  });
}

// SALES COMPOSITION
const ctx = document.getElementById("mychart_3");

fetch("File Json/Sales_Composition_building_classification (1).json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data);
    var arrBuildingClass = [];
    var arrTotalRevenue = [];
    data.forEach((element) => {
      arrTotalRevenue.push(element.TOTAL_REVENUE);
      arrBuildingClass.push(element.BUILDING_CLASS);
    });
    console.log(arrBuildingClass);
    console.log(arrTotalRevenue);
    var objChart = {
      total_revenue: arrTotalRevenue,
      building_class: arrBuildingClass,
    };
    console.log(objChart);
    createChart3(objChart, "pie");
  });

function createChart3(arrPassed, type) {
  new Chart(ctx, {
    type: type,
    data: {
      labels: arrPassed.building_class,
      datasets: [
        {
          label: "Total Revenue",
          data: arrPassed.total_revenue,
          backgroundColor: [
            "rgb(285, 109, 132)",
            "rgb(89, 89, 119)",
            "rgb(169, 76, 119)",
            "rgb(17, 78, 117)",
            "rgb(241, 186, 124)",
          ],
          hoverOffset: 5,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "SALES COMPOSITION BUILDING CLASSIFICATION",
        },
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

//Total Revenue By Tax Class
const chart4 = document.getElementById("mychart_4");
let dataTaxClass = null;
let chartTaxClass = null;

fetch("File Json/Total_Revenue_by_Tax_Class.json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data);
    var arrTotalRevenue = [];
    var arrTaxClass = [];
    data.forEach((element) => {
      arrTotalRevenue.push(element.TOTAL_REVENUE);
      arrTaxClass.push(element.TAX_CLASS);
    });
    console.log(arrTaxClass);
    console.log(arrTotalRevenue);
    var objChart = {
      tax_class: arrTaxClass,
      total_revenue: arrTotalRevenue,
    };

    window.dataTaxClass = objChart;
    generateTaxClassOptions(objChart);

    console.log(objChart);
    createChart2(objChart, "bar");
  });

function generateTaxClassOptions(dataTaxClassPassed) {
  const select = document.getElementById("chart-4-taxclass");

  const option = document.createElement("option");
  option.value = "All";
  option.textContent = "All";
  select.appendChild(option);

  let arrDataTaxClassPassed = dataTaxClassPassed.tax_class;

  arrDataTaxClassPassed.forEach((taxClass, index) => {
    const option = document.createElement("option");
    option.value = taxClass;
    option.textContent = taxClass;
    select.appendChild(option);
  });
  select.addEventListener("change", updateTaxClassChart);

  select.getElementsByTagName("option")[0].selected = "selected";
}

function updateTaxClassChart(e) {
  e.preventDefault();
  const select = document.getElementById("chart-4-taxclass");
  const selectedTaxClass = select.value;
  const taxClassIndex = window.dataTaxClass.tax_class.indexOf(selectedTaxClass);
  var arrTaxClassFiltered = window.dataTaxClass.tax_class.filter(
    (taxClass, index) => index == taxClassIndex
  );
  var arrTotalRevenueFiltered = window.dataTaxClass.total_revenue.filter(
    (taxClass, index) => index == taxClassIndex
  );
  if (selectedTaxClass == "All") {
    arrTaxClassFiltered = window.dataTaxClass.tax_class;
    arrTotalRevenueFiltered = window.dataTaxClass.total_revenue;
  }
  window.chartTaxClass.data.labels = arrTaxClassFiltered;
  window.chartTaxClass.data.datasets[0].data = arrTotalRevenueFiltered;
  window.chartTaxClass.data.datasets[0].label = "Monthly Average Revenue";
  window.chartTaxClass.update();
}

function sortTaxClass(strSort) {
  let arrTaxClassChart = window.chartTaxClass.data.labels;
  let arrTotalRevenueChart = window.chartTaxClass.data.datasets[0].data;
  let arrSort = [];

  arrTotalRevenueChart.forEach((element, index) => {
    arrSort.push({ taxClass: arrTaxClassChart[index], totalRevenue: element });
  });

  if (strSort == "asc") {
    arrSort.sort((a, b) => a.totalRevenue - b.totalRevenue);
  } else {
    arrSort.sort((a, b) => b.totalRevenue - a.totalRevenue);
  }

  arrTaxClassChart = [];
  arrTotalRevenueChart = [];
  arrSort.forEach((element) => {
    arrTaxClassChart.push(element.taxClass);
    arrTotalRevenueChart.push(element.totalRevenue);
  });

  window.chartTaxClass.data.labels = arrTaxClassChart;
  window.chartTaxClass.data.datasets[0].data = arrTotalRevenueChart;
  window.chartTaxClass.update();
}

function createChart2(arrPassed2, type) {
  window.chartTaxClass = new Chart(chart4, {
    type: type,
    data: {
      labels: arrPassed2.tax_class,
      datasets: [
        {
          label: "Total Revenue",
          data: arrPassed2.total_revenue,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "TOTAL REVENUE BY TAX CLASS",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

//TOP 10 TOTAL REVENUE AND TRANSACTION BY NEIGHBORHOOD CHART
const chart6 = document.getElementById("megachart");

fetch("File Json/Total_revenue_transaction_neighborhood.json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data);
    var arrTotalSales = [];
    var arrTotalTransaction = [];
    var arrNeighborhood = [];
    data.forEach((element) => {
      arrTotalSales.push(element.TOTAL_SALES);
      arrTotalTransaction.push(element.TOTAL_TRANSACTIONS);
      arrNeighborhood.push(element.NEIGHBORHOOD);
    });
    console.log(arrTotalSales);
    console.log(arrTotalTransaction);
    var objChart = {
      total_sales: arrTotalSales,
      total_transaction: arrTotalTransaction,
      neighborhood: arrNeighborhood,
    };
    console.log(objChart);
    createChart(objChart, "bar");
  });

let megaChartSort; // Deklarasikan variabel chart di luar fungsi agar dapat diakses di luar fungsi juga

function createChart(arrPassed, type) {
  const updateChartScales = (chart, isMobile) => {
    if (isMobile) {
      chart.options.scales.sales.display = false;
      chart.options.scales.transaction.display = false;
      chart.options.scales.x.ticks.maxRotation = 90;
      chart.options.scales.x.ticks.minRotation = 90;
    } else {
      chart.options.scales.sales.display = true;
      chart.options.scales.transaction.display = true;
      chart.options.scales.x.ticks.maxRotation = 45;
      chart.options.scales.x.ticks.minRotation = 45;
    }
    chart.update(); // Perbarui grafik setelah memperbarui opsi
  };

  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

  megaChartSort = new Chart(chart6, {
    type: type,
    data: {
      labels: arrPassed.neighborhood,
      datasets: [
        {
          label: "Total Sales",
          data: arrPassed.total_sales,
          borderWidth: 1,
          yAxisID: "sales",
        },
        {
          label: "Transactions",
          data: arrPassed.total_transaction,
          borderWidth: 1,
          yAxisID: "transaction",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "TOP 10 TOTAL REVENUE & TRANSACTION BY NEIGHBORHOOD",
        },
      },
      layout: {
        padding: {},
      },
      scales: {
        x: {
          ticks: {
            maxRotation: isMobile() ? 90 : 45,
            minRotation: isMobile() ? 90 : 45,
          },
        },
        y: {
          beginAtZero: true,
          display: false,
        },
        sales: {
          type: "linear",
          position: "left",
          min: 0,
          max: 400000000,
          display: !isMobile(),
          title: {
            display: true,
            text: "Total Sales",
          },
        },
        transaction: {
          type: "linear",
          position: "right",
          min: 0,
          max: 1000,
          display: !isMobile(),
          title: {
            display: true,
            text: "Total Transactions",
          },
        },
      },
    },
  });

  // Event listener untuk mendeteksi perubahan ukuran layar
  window.addEventListener("resize", () => {
    updateChartScales(megaChartSort, isMobile());
  });

  // Panggil fungsi updateChartScales untuk mengatur skala grafik pada saat pertama kali dimuat
  updateChartScales(megaChartSort, isMobile());
}

document
  .getElementById("sortAscRevenue")
  .addEventListener("click", function () {
    sortChartData("asc", "revenue");
  });

document
  .getElementById("sortDescRevenue")
  .addEventListener("click", function () {
    sortChartData("desc", "revenue");
  });

document
  .getElementById("sortAscTransactions")
  .addEventListener("click", function () {
    sortChartData("asc", "transaction");
  });

document
  .getElementById("sortDescTransactions")
  .addEventListener("click", function () {
    sortChartData("desc", "transaction");
  });

function sortChartData(strSort, sortBy) {
  let arrNeighborhoodChart = megaChartSort.data.labels;
  let arrTotalSalesChart = megaChartSort.data.datasets[0].data;
  let arrTotalTransactionChart = megaChartSort.data.datasets[1].data;
  let arrSort = [];

  arrTotalSalesChart.forEach((element, index) => {
    arrSort.push({
      neighborhood: arrNeighborhoodChart[index],
      totalSales: element,
      totalTransaction: arrTotalTransactionChart[index],
    });
  });

  if (sortBy === "revenue") {
    if (strSort === "asc") {
      arrSort.sort((a, b) => a.totalSales - b.totalSales);
    } else {
      arrSort.sort((a, b) => b.totalSales - a.totalSales);
    }
  } else if (sortBy === "transaction") {
    if (strSort === "asc") {
      arrSort.sort((a, b) => a.totalTransaction - b.totalTransaction);
    } else {
      arrSort.sort((a, b) => b.totalTransaction - a.totalTransaction);
    }
  }

  arrNeighborhoodChart = [];
  arrTotalSalesChart = [];
  arrTotalTransactionChart = [];
  arrSort.forEach((element) => {
    arrNeighborhoodChart.push(element.neighborhood);
    arrTotalSalesChart.push(element.totalSales);
    arrTotalTransactionChart.push(element.totalTransaction);
  });

  megaChartSort.data.labels = arrNeighborhoodChart;
  megaChartSort.data.datasets[0].data = arrTotalSalesChart;
  megaChartSort.data.datasets[1].data = arrTotalTransactionChart;
  megaChartSort.update();
}


//Total Revenue By Building Category
const chart5 = document.getElementById("megachart_2");

fetch("File Json/Total_Revenue_building_Category.json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data);
    var arrTotalRevenue = [];
    var arrBuildingClassCategory = [];
    var arrRevenuePercentage = [];
    data.sort((a, b) => b.Total_Revenue - a.Total_Revenue);
    var slicedData = data.slice(0, 10);

    slicedData.forEach((element) => {
      arrTotalRevenue.push(element.Total_Revenue);
      arrBuildingClassCategory.push(element.BUILDING_CLASS_CATEGORY);
      arrRevenuePercentage.push(element.Revenue_Percentage);
    });
    console.log(arrBuildingClassCategory);
    console.log(arrTotalRevenue);
    console.log(arrRevenuePercentage);
    var objChart = {
      building_class_category: arrBuildingClassCategory,
      total_revenue: arrTotalRevenue,
      revenue_percentage: arrRevenuePercentage,
    };
    console.log(objChart);
    createChart5(objChart, "bar");
  });

function createChart5(arrPassed5, type) {
  let arrBgColors = [];
  arrPassed5.total_revenue.forEach((element, index) => {
    arrBgColors.push(
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.8)`
    );
  });

  window.megaChart2Sort = new Chart(chart5, {
    type: "bar",
    plugins: [ChartDataLabels],
    data: {
      labels: arrPassed5.building_class_category,
      datasets: [
        {
          label: "Total Revenue",
          data: arrPassed5.total_revenue,
          borderColor: "rgb(0, 0, 255)",
          backgroundColor: arrBgColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        x: {
          type: "logarithmic",
        },
      },
      plugins: {
        title: {
          display: true,
          text: "TOP 10 TOTAL REVENUE BY BUILDING CATEGORY",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem, data) {
              const formatterUsd = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              });
              let sum = 0;
              tooltipItem.dataset.data.forEach((data) => {
                sum += parseInt(data);
              });
              let percentage =
                ((parseInt(tooltipItem.parsed.x) * 100) / sum).toFixed(3) + "%";
              var priceValue = formatterUsd.format(tooltipItem.parsed.x);
              var strDisplay = `Total Revenue: ${priceValue} | Percentage: (${percentage})`;

              return strDisplay;
            },
          },
        },
        legend: {
          position: "top",
        },
        datalabels: {
          clip: true,
          align: "end",
          anchor: "end",
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              sum += parseInt(data);
            });
            let percentage = ((parseInt(value) * 100) / sum).toFixed(5) + "%";
            const formatterUsd = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });

            let usdValue = formatterUsd.format(value);
            let strDisplay = `${usdValue} | (${percentage})`;

            return strDisplay;
          },
          color: "#000",
        },
      },
    },
  });
}

document.getElementById("sortChartAsc").addEventListener("click", function () {
  sortChartDataRevenue("asc", "revenue");
});

document.getElementById("sortChartDesc").addEventListener("click", function () {
  sortChartDataRevenue("desc", "revenue");
});

function sortChartDataRevenue(strSort, sortBy) {
  let arrBuildingClassCategoryChart = window.megaChart2Sort.data.labels;
  let arrTotalRevenueChart = window.megaChart2Sort.data.datasets[0].data;
  let arrBackgroundColor =
    window.megaChart2Sort.data.datasets[0].backgroundColor;
  let arrSort = [];

  arrTotalRevenueChart.forEach((element, index) => {
    arrSort.push({
      building_class_category: arrBuildingClassCategoryChart[index],
      totalRevenue: element,
      backgroundColor: arrBackgroundColor[index],
    });
  });

  if (sortBy === "revenue") {
    if (strSort === "asc") {
      arrSort.sort((a, b) => a.totalRevenue - b.totalRevenue);
    } else {
      arrSort.sort((a, b) => b.totalRevenue - a.totalRevenue);
    }
  }

  arrBuildingClassCategoryChart = [];
  arrTotalRevenueChart = [];
  arrBackgroundColor = [];
  arrSort.forEach((element) => {
    arrBuildingClassCategoryChart.push(element.building_class_category);
    arrTotalRevenueChart.push(element.totalRevenue);
    arrBackgroundColor.push(element.backgroundColor);
  });

  window.megaChart2Sort.data.labels = arrBuildingClassCategoryChart;
  window.megaChart2Sort.data.datasets[0].data = arrTotalRevenueChart;
  window.megaChart2Sort.data.datasets[0].backgroundColor = arrBackgroundColor;
  window.megaChart2Sort.update();
}









