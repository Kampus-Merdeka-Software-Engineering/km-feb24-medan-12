document.getElementById('filter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    fetch("data_NYC.json")
      .then((response) => response.json())
      .then((data) => {
        const neighborhood = document.getElementById('NEIGHBORHOOD').value;
        const fromDate = document.getElementById('start-date').value;
        const toDate = document.getElementById('end-date').value;
  
        // Filter data based on form input
        const filteredData = data.filter(item => {
          const saleDate = new Date(item.SALE_DATE);
          const fromCondition = fromDate ? saleDate >= new Date(fromDate) : true;
          const toCondition = toDate ? saleDate <= new Date(toDate) : true;
          const neighborhoodCondition = neighborhood ? item.NEIGHBORHOOD === neighborhood : true;
          return fromCondition && toCondition && neighborhoodCondition;
        });
  
        // Update statistics based on filtered data
        document.getElementById("total-transaction").textContent = filteredData.length;
        var totalRevenue = filteredData.reduce((acc, curr) => acc + parseInt(curr.SALE_PRICE), 0);
        var totalCommercial = filteredData.reduce((acc, curr) => acc + parseInt(curr.COMMERCIAL_UNITS), 0);
        var totalResidential = filteredData.reduce((acc, curr) => acc + parseInt(curr.RESIDENTIAL_UNITS), 0);
  
        document.getElementById("total-revenue-text").textContent = totalRevenue;
        document.getElementById("average-sales").textContent = (filteredData.length ? totalRevenue / filteredData.length : 0).toFixed(2);
        document.getElementById("total-commercial").textContent = totalCommercial;
        document.getElementById("total-residential").textContent = totalResidential;
      });
  });
  */