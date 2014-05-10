var openCurrency = angular.module('openCurrency', []);

Drupal.behaviors.openCurrency = {
	attach: function(context, settings){
		openCurrency.constant('open_exchange_appid', Drupal.settings.openCurrency.appid);
	}
}

openCurrency.controller('currencyCtrl', ['$scope', '$http', '$log', 'open_exchange_appid', function ($scope, $http, $log, open_exchange_appid) {

  var listUrl = 'http://openexchangerates.org/currencies.json';
  var ratesUrl = 'http://openexchangerates.org/api/latest.json?app_id=' + open_exchange_appid;

	function http(url, success, error){
		$http.jsonp(url, {params : {
			callback: 'JSON_CALLBACK'
		}})
			.success(success).
			error(function(data, status, headers, config){
				$log.error('Error fectching data from' + url);
			});
	}

	//populate currency drop down lists
	http(listUrl, function(data, status, headers, config){
		$scope.currencies = data;
	});

	//get latest exchange rates
	http(ratesUrl, function(data, status, headers, config){
		if (typeof fx !== "undefined" && fx.rates){
			fx.rates = data.rates;
			fx.base = data.base;
		} else {
			var fxSetup = {
				rates: data.rates, 
				base: data.base
			}
		}
		
	});

	$scope.convert = function(){
		if ($scope.amount != null && $scope.currencyForm.amount.$valid && $scope.currencyFrom != null && $scope.currencyTo != null){
			var total = fx.convert($scope.amount, {from: $scope.currencyFrom, to: $scope.currencyTo});
			$scope.message = $scope.amount + ' ' + $scope.currencies[$scope.currencyFrom] + ' = ' + total.toFixed(5) + ' ' + $scope.currencies[$scope.currencyTo];
		} else {
			$scope.message = "Oops! Please check the amount and selected currencies."
		}
		
	}


}]);





