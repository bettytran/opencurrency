<div id="openCurrencyApp" ng-controller="currencyCtrl">
	<div class='result'><p>{{message}}</p></div>
	<form name="currencyForm">
		<input name="amount" ng-model="amount" type="number" placeholder="Amount"></input>
		<select name="currencyFrom" ng-model="currencyFrom" ng-options="key as value for (key, value) in currencies">
			<option value="">From</option>
		</select>
		<select ng-model="currencyTo" ng-options="key as value for (key, value) in currencies">
			<option value="">To</option>
		</select>
		<button ng-click="convert()">Convert</button>
	</form>
 </div>
