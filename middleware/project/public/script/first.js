(()=>{
    'use strict';

    //x="aaa";

    //module => for whole page
    angular.module('firstApp',[])
    //controller => for one div
    .controller('firstController',firstController)
    //custom filter
    .filter('first',firstFilter)
    .filter('dataport',dataportFilter);



    //controller function
    firstController.$inject = ['$scope','$filter','$http','firstFilter','dataportFilter'];

    function firstController($scope, $filter, $http, firstFilter, dataportFilter) {

        //for the input string
        $scope.value = "test";
        $scope.num = 0;
        $scope.func = ()=>{
            $scope.num = $scope.value.length;
            return $filter('currency')($scope.num);
        }

        //for the data port link
        $scope.inputHour = "0";
        $scope.links = "";
        $scope.changeTime = ()=>{
            $scope.links = dataportFilter($scope.inputHour);
            var response = $http({
                method:"GET",
                url:("/dataport/4"+$scope.links)
            });
            response.then((res)=>{
                $scope.data = res.data;
            },(err)=>{
                this.err = "err";
            })
        }

        //for the kana image
        $scope.kanaImg = "kana.jpg";
        $scope.clickFunc = ()=>{
            if($scope.kanaImg === "kana.jpg"){
                $scope.kanaImg = "Kana2.png";
            }else{
                $scope.kanaImg = "kana.jpg";
            }
        }

        //for filter
        $scope.value1 = "test";
        $scope.addWord = ()=>{
            return firstFilter($scope.value1);
        };

        //$scope.$apply(function()) can work in jquary


        //test ajax
        $scope.resData = "";
        $scope.getRequest = ()=>{
            $http.get("/dataport/1").then((res)=>{
                console.log(res.data.row);
                //$scope.resData = res.data;
            });
        }
    }

    //filter function
    function firstFilter(){
        return function(input){
            input = input || "";
            return input + " success";
        };
    }

    //filter for dataport
    function dataportFilter(){
        return (input)=>{
            input = input || "all";
            const d = new Date();
            let src = "/" + (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear() + "/";
            return src + input;
        }
    }
    


})();

// alert("hello");