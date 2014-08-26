budgetcalculator
================
This is a simple monthly expense budget calculator single page application, built using the Angular framework and using Google Charts API. It allows a user to add as many or as few fields as needed, and displays an interactive pie chart once at least one expense is added. 

This was built by me as a way to learn Angular.

DEMO

This can be demoed at http://daniellec.byethost13.com/budget.html 

RELEVANT FILES

budget.html - budget calculator application

budget.js - controller which controls the data of the app; also includes google chart code

ABOUT ANGULAR

Angular is a javascript framework that extends HTML with new attributes called directives. Directives are all prefixed with "ng-".  Directives used in this app are:

ng-app: initializes an AngularJS application.

ng-init: initializes application data.

ng-model: binds the value of HTML controls (input, select, textarea) to application data.

ng-controller: defines the application controller

ng-repeat: repeats an HTML element

ng-submit:binds angular expressions to onsubmit events

ng-click: specify custom behavior when an element is clicked.

Angular binds input or output parts of the page to an application model, and scope is the object that refers to this model.  Both controllers and directives have reference to the scope.

ABOUT GOOGLE CHART

Google Chart tools are a variety of interactive charts and data tools that can be customized using the Google Visualization API.  This application uses the pie chart tool, and further customizes it in order to update the data based on the expense data entered by the user.


