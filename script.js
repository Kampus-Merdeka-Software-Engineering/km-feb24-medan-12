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