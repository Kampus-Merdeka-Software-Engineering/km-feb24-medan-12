//Total Revenue By Tax Class
const chart4 = document.getElementById('mychart_4')

//TOP 10 TOTAL REVENUE AND TRANSACTION BY NEIGHBORHOOD CHART
const chart6 = document.getElementById('mychart_6');

fetch('File Json/Total_revenue_transaction_neighborhood.json')
.then(function(response) {

    if(response.ok == true){
        return response.json();
    }
})
.then(function(data){
  console.log(data);
  var arrTotalSales = [];
  var arrTotalTransaction= [];
  var arrNeighborhood = [];
  data.forEach(element => {
    arrTotalSales.push(element.TOTAL_SALES);
    arrTotalTransaction.push(element.TOTAL_TRANSACTIONS);
    arrNeighborhood.push(element.NEIGHBORHOOD);
  });
  console.log(arrTotalSales);
  console.log(arrTotalTransaction);
  var objChart = {
    total_sales : arrTotalSales,
    total_transaction : arrTotalTransaction,
    neighborhood : arrNeighborhood
  };
  console.log(objChart);
  createChart(objChart, 'bar');
})

fetch('File Json/Total_Revenue_by_Tax_Class.json')
.then(function(response) {

    if(response.ok == true){
        return response.json();
    }
})
.then(function(data){
    console.log(data);
    var arrTotalRevenue = [];
    var arrTaxClass = [];
    data.forEach(element => {
      arrTotalRevenue.push(element.TOTAL_REVENUE);
      arrTaxClass.push(element.TAX_CLASS);
    });
    console.log(arrTaxClass);
    console.log(arrTotalRevenue);
    var objChart = {
      tax_class : arrTaxClass,
      total_revenue : arrTotalRevenue,
    };
    console.log(objChart);
    createChart2(objChart, 'bar');
})

function createChart(arrPassed, type){
  new Chart(chart6, {
    type: type,
    data: {
      labels: arrPassed.neighborhood,
      datasets: [{
        label: 'Total Sales',
        data: arrPassed.total_sales,
        borderWidth: 1,
        yAxisID: "sales",
      },
      {
        label: 'Transactions',
        data: arrPassed.total_transaction,
        borderWidth: 1,
        yAxisID: "transaction"
      }
    ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'TOP 10 TOTAL REVENUE & TRANSACTION BY NEIGHBORHOOD'
        }
      },
      layout: {
        padding: {
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          display: false
        },
        'sales':{
          type: 'linear',
          position: 'left',
          min: 0,
          max: 400000000,
          title: {
            display: true,
            text: 'Total Sales'
          }
        },
        'transaction'  : {
          type: 'linear',
          position: 'right',
          min:  0,
          max: 1000,
          display: true,
          title: {
            display: true,
            text: 'Total Transactions'
          }
        }
      }
    }
  });
}

function createChart2(arrPassed2, type){
  new Chart(chart4, {
    type: type,
    data: {
      labels: arrPassed2.tax_class,
      datasets: [{
        label: 'Total Revenue',
        data: arrPassed2.total_revenue,
        borderWidth: 1,
      },
    ]
    },
    options: {
      plugins: {
        title: {
          display : true,
          text : 'TOTAL REVENUE BY TAX CLASS'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        },
      }
    }
  });
}

// Quarterly Sales Revenue and Transactions Chart
function createQuarterlySalesChart() {
  fetch('File Json/Quarterly_Sales_revenue.json')
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function(data) {
      var arrRevenue = [];
      var arrQuarters = [];

      data.forEach(element => {
        arrRevenue.push(element.TOTAL_REVENUE);
        arrQuarters.push(`Q${element.EXTRACTED_QUARTER} ${element.EXTRACTED_YEAR}`);
      });

      var objChart = {
        total_revenue: arrRevenue,
        quarters: arrQuarters
      };

      createQuarterlyChart(objChart, 'line'); // Tipe chart sekarang adalah 'line'
    })
    .catch(function(error) {
      console.error('Error during fetch operation:', error);
    });
}

function createQuarterlyChart(arrPassed, type) {
  const ctx = document.getElementById('mychart_1');
  new Chart(ctx, {
    type: type, // Sekarang adalah grafik garis
    data: {
      labels: arrPassed.quarters,
      datasets: [{
        label: 'Total Revenue',
        data: arrPassed.total_revenue,
        borderColor: 'rgb(0, 0, 255)',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        borderWidth: 1,
        fill: false, // Pastikan area di bawah garis tidak diisi
        tension: 0.4 // Menambahkan kelengkungan pada garis
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Quarterly Sales Revenue'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1400000000, // Atur nilai maksimal untuk pendapatan
          title: {
            display: true,
            text: 'Total Revenue (in USD)'
          }
        }
      },
      responsive: true
    }
  });
}

// Memulai proses pembuatan grafik
createQuarterlySalesChart();

