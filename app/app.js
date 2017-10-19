
// Declare app level module which depends on views, and components
angular.module('myApp', [])

.factory('nameFactory', [function(){
  var o = {
    characters: []
  };
  return o;
}])


.controller('MainCtrl', [
	'$scope',
	'$http',
	'nameFactory',
	function($scope, $http, nameFactory) {
	
		$scope.characters = nameFactory.characters;

		$scope.nameSearch = function(){
			if($scope.formContent === '') {return;}
			var name = $scope.formContent;
			var ts = new Date().getTime();
  			var hash = CryptoJS.MD5(ts + '99f8280781ce7f3663b214c28b245b14986cf32d' + '91359f0be412233f86c3953f37f078ac').toString();
			console.log(name);
			var search = 'https://gateway.marvel.com:443/v1/public/characters';
			$http ({
				method: 'GET',
				url: search,
				params: {nameStartsWith : name,
						apikey : '91359f0be412233f86c3953f37f078ac',
						hash : hash,
						ts : ts
						}
			}).then(function(response) {
	        	console.log(response);
	            $scope.characters = response.data.data.results;
	            console.log($scope.characters);
	        }, function(error){
	        	console.log(error);
			});
	        $scope.formContent = '';
		};
	}
]);
