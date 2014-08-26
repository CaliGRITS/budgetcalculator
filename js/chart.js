       // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
     // google.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Expense Type');
        data.addColumn('number', 'Amount');
        data.addRows($scope.expenses.length);
		for(var i = 0; i < $scope.expenses.length; i++){
			data.setValue(i, 0, $scope.expenses.text);
			data.setValue(i, 1, $scope.expenses.amount);
		}

        // Set chart options
        var options = {'title':'Where Your Money Goes',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chartDiv'));
        chart.draw(data, options);
      }
    