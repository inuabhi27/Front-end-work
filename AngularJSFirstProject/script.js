//Angular - MVC.
var myApp = angular.module("myList", []);
myApp.controller("myListController", function($scope)
{
    $scope.items = ["Milk", "Eggs", "Bread"]; //array. In conjunction with loop.
    $scope.newItem = "";
    $scope.pushItem = function ()
    {
        if($scope.newItem != "")
        {
            $scope.items.push($scope.newItem)
            $scope.newItems = "";
        }
    }
    $scope.deleteItem = function(index)
    {
        $scope.items.splice(index, 1);
    }

});