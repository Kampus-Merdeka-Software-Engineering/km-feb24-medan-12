const ctx = document.getElementById('mychart_6');
// const cxt = document.getElementById('myChart2');

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

function createChart(arrPassed, type){
  new Chart(ctx, {
    type: type,
    data: {
      labels: arrPassed.neighborhood,
      datasets: [{
        label: 'Total Sales',
        data: arrPassed.total_sales,
        borderWidth: 1,
        yAxisID: "sales"
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
          bottom: 20
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          display: false
        },
        revenue:{
          axis: 'y',
          min: 0,
          max: 500000000,
          display: false
        },
        transaction  : {
          axis: 'y',
          min:  0,
          max: 1000,
          display: false
        }
      }
    }
  });
}