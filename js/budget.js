google.load('visualization', '1.0', {'packages':['corechart']});

angular.module('budgetApp', []).controller('BudgetController', ['$scope', function($scope) {

	$scope.incomes = [ ];
	$scope.incomeTotal=0;
	$scope.expenseTotal=0;
	$scope.leftTotal=0;
	$scope.incomeTypes = [
	    {text:'Salary/Wages'},
		{text:'Pension/Social Security'},
		{text:'Investment Income'},
		{text:'Child Support/Alimony'},
		{text:'Other Income'},
	];
	
	$scope.addIncome = function() {
		if($scope.validateInput($scope.incomeAmount,$scope.selectedIncome)){
			var categoryFound=false;
			angular.forEach($scope.incomes, function(income) {
				if (income.text==$scope.selectedIncome.text){
					income.amount=parseInt(income.amount,10)+parseInt($scope.incomeAmount,10);
					categoryFound=true;
				}
			});
			if(categoryFound==false){
				$scope.incomes.push({text:$scope.selectedIncome.text, amount:$scope.incomeAmount, remove:false});
			}
			$scope.selectedIncome = '';
			$scope.incomeAmount='';
			$scope.incomeTotal=$scope.totalIncomes();
			$('#incomeTotal').animateNumber({ number: $scope.incomeTotal });
			$scope.leftTotal=$scope.incomeTotal-$scope.expenseTotal;
			
			$('#leftTotal').animateNumber({ number: $scope.leftTotal });
			if($scope.leftTotal>0){$('.leftTotal').css('color','#3C0')}
			else{$('.leftTotal').css('color','#F00')}
			
		}
	};
    $scope.removeIncome = function() {
		var currentIncomes = $scope.incomes;
		$scope.incomes = [];
		angular.forEach(currentIncomes, function(income) {
			if (!income.remove) $scope.incomes.push(income);
		});
		$scope.incomeTotal=$scope.totalIncomes();
		$('#incomeTotal').animateNumber({ number: $scope.incomeTotal });
		$scope.leftTotal=$scope.incomeTotal-$scope.expenseTotal;
		$('#leftTotal').animateNumber({ number: $scope.leftTotal });
		if($scope.leftTotal>0){$('.leftTotal').css('color','#3C0')}
			else{$('.leftTotal').css('color','#F00')}
	};
	$scope.expenses = [ ];
	$scope.expenseTypes = [ 
		{text:'Rent/Mortgage'},
		{text:'Utilities'},
		{text:'Internet/Cable/Phone'},
		{text:'Insurance - Medical/Home/Car'},
		{text:'Food'},
		{text:'Childcare'},
		{text:'Education'},
		{text:'Transportation'},
		{text:'Healthcare'},
		{text:'Clothing'},
		{text:'Personal Care - Cosmetics, Beauty'},
		{text:'Entertainment'},
		{text:'Credit Card/Loan'},
		{text:'Savings'},
		{text:'Charitable Contributions'},
		{text:'Other'}
	];
 
	$scope.totalExpenses = function() {
		var total = 0;
		console.log(total);
		for(var i = 0; i < $scope.expenses.length; i++){
			total +=  parseInt($scope.expenses[i].amount,10);
		}
		return total;
	};
	
	$scope.totalIncomes = function() {
		var total = 0;
		console.log(total);
		for(var i = 0; i < $scope.incomes.length; i++){
			total +=  parseInt($scope.incomes[i].amount,10);	
		}
		return total;
	};
	
	$scope.addExpense = function() {
		if($scope.validateInput($scope.expenseAmount,$scope.selectedExpense)){
			var categoryFound=false;
			angular.forEach($scope.expenses, function(expense) {
				if (expense.text==$scope.selectedExpense.text){
					expense.amount=parseInt(expense.amount,10)+parseInt($scope.expenseAmount,10);
					categoryFound=true;
				}
			});
			if(categoryFound==false){
				$scope.expenses.push({text:$scope.selectedExpense.text, amount:$scope.expenseAmount, remove:false});
			}
			$scope.selectedExpense = '';
			$scope.expenseAmount='';
			$scope.expenseTotal=$scope.totalExpenses();
			$('#expenseTotal').animateNumber({ number: $scope.expenseTotal });
			$scope.leftTotal=$scope.incomeTotal-$scope.expenseTotal;
			$('#leftTotal').animateNumber({ number: $scope.leftTotal });
			if($scope.leftTotal>0){$('.leftTotal').css('color','#3C0')}
			else{$('.leftTotal').css('color','#F00')}
			$scope.drawChart();
		}
	};
	 $scope.removeExpense = function() {
		var currentExpenses = $scope.expenses;
		$scope.expenses = [];
		angular.forEach(currentExpenses, function(expense) {
			if (!expense.remove) $scope.expenses.push(expense);
		});
		$scope.expenseTotal=$scope.totalExpenses();
		$('#expenseTotal').animateNumber({ number: $scope.expenseTotal });
		$scope.leftTotal=$scope.incomeTotal-$scope.expenseTotal;
		$('#leftTotal').animateNumber({ number: $scope.leftTotal });
		if($scope.leftTotal>0){$('.leftTotal').css('color','#3C0')}
		else{$('.leftTotal').css('color','#F00')}
		if($scope.expenses.length>0){
			$scope.drawChart();
		}
		else{
			$('#chartDiv').hide();
		}
	};
	$scope.validateInput=function(textField, selectOption){
		 var errorString="";
		 var pattern2 = /^\d+$/;

		 if (!pattern2.test(textField)) errorString+="Please enter a whole dollar amount only, with no special characters\n";
		 if (!selectOption) errorString+="Please select a type from the dropdown menu.\n";
		 if (errorString==""){return true}
		 else alert("Please correct the following errors:\n\n"+errorString);
	}
	$scope.drawChart=function() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Expense Type');
        data.addColumn('number', 'Amount');
        data.addRows($scope.expenses.length);
		for(var i = 0; i < $scope.expenses.length; i++){
			data.setValue(i, 0, $scope.expenses[i].text);
			data.setValue(i, 1, $scope.expenses[i].amount);
		}

        // Set chart options
        var options = {'title':'Where Your Money Goes',
                       'width':600,
                       'height':400};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chartDiv'));
        chart.draw(data, options);
		$('#chartDiv').show();
      }
     
}]);
