(()=>{
    'use strict';

    angular.module('app',[])
    .controller('controller1',controller1)
    .controller('controller2',controller2)
    .filter('testing',testingFilter)
    .controller('controller3',controller3)
    .controller('controller4',controller4)
    .service('testingService',testingService)
    .controller('controller5',controller5)
    .factory('testingFactory',testingFactory)
    .controller('controller6',controller6)
    .provider('testing',testingProvider)
    .controller('controller7',controller7)
    .service('testingAsynService',testingAsynService)
    .controller('controller8',controller8)
    .constant('APIurl',"/dataport")
    .config(config);

    controller1.$inject = ['$scope','$filter','testingFilter'];
    function controller1($scope,$filter,testingFilter){
        $scope.testingObj = "testing";
        $scope.testingFunc = ()=>{
            return $scope.testingObj + "success";
        };

    

    }

    controller2.$inject = ['$scope','$filter','testingFilter'];
    function controller2($scope,$filter,testingFilter){
        this.testingObj2 = "abcd";
        this.testingFilter = testingFilter;
    }

    function testingFilter(){
        return (input)=>{
            input = input || "abc";
            return input.length;

        }
    }

    controller3.$inject = ['testingService'];
    function controller3(testingService){
        this.itemName = "";
        this.itemValue = "";
        this.addItem = ()=>{
            testingService.addItem(this.itemName,this.itemValue);
        };

    };

    controller4.$inject = ['testingService'];
    function controller4(testingService){
        this.items = testingService.getData();
        this.removeItem = (index) =>{
            testingService.removeItem(index);
        };
    }

    controller5.$inject = ['testingFactory'];
    function controller5(testingFactory){
        var service = testingFactory(5);
        this.itemName = "";
        this.itemValue = "";
        this.addItem = ()=>{
            try{
                service.addItem(this.itemName,this.itemValue);
            }catch(err){
                this.err = err;
            }
            
        };
        this.items = service.getData();
        this.removeItem = (index) =>{
            service.removeItem(index);
        };

    };


    function testingService(){
        var data = [];

        this.addItem = (itemName, itemValue)=>{
           data.push({name : itemName, value : itemValue});
            
        };

        this.removeItem = (index)=>{
            data.splice(index,1);
        };

        this.getData = ()=>{
            return data;
        };
    }

    function testingService2(maxItem){
        var data = [];

        this.addItem = (itemName, itemValue)=>{
            if((maxItem === undefined) || 
                (maxItem !== undefined) && (data.length < maxItem)){
                data.push({name : itemName, value : itemValue});
            }else{
                throw new Error("item more than max item of (" + maxItem +")");
            }
            
        };

        this.removeItem = (index)=>{
            data.splice(index,1);
        };

        this.getData = ()=>{
            return data;
        };
    }

    function testingFactory(){
        return (maxitem)=>{
            return new testingService2(maxitem);
        };
    }


    controller6.$inject = ['testing'];
    function controller6(testing){
        this.itemName = "";
        this.itemValue = "";
        this.addItem = ()=>{
            try{
                testing.addItem(this.itemName,this.itemValue);
            }catch(err){
                this.err = err;
            }
            
        };
        this.items = testing.getData();
        this.removeItem = (index) =>{
            testing.removeItem(index);
        };

    };

    function testingProvider(){
        this.defaults = { maxItem : 10};
        this.$get = ()=>{
            return new testingService2(this.defaults.maxItem);
        }
    }

    config.$inject = ['testingProvider'];
    function config(testingProvider){
        testingProvider.defaults.maxItem = 5;
    }


    controller7.$inject = ['$q','testingAsynService','testingFactory']
    function controller7($q,testingAsynService,testingFactory){
        var service = testingFactory(5);
        this.itemName = "";
        this.itemValue = "";
        this.addItem = ()=>{
            var promise = testingAsynService.checkName(this.itemName);
            promise.then((res)=>{
                var nextPromise = testingAsynService.checkNumber(this.itemValue);

                nextPromise.then((res)=>{

                    try{
                        service.addItem(this.itemName,this.itemValue);
                    }catch(err){
                        this.err = err;
                    }
                    
                },(err)=>{
                    this.err = err.massage;
                    console.log(err.massage);
                });
            },(err)=>{
                this.err = err.massage;
                console.log(err.massage);
            });
        };
        this.items = service.getData();
        this.removeItem = (index) =>{
            service.removeItem(index);
        };


    }

    testingAsynService.$inject = ['$q','$timeout']
    function testingAsynService($q,$timeout){
        this.checkName = (name)=>{
            var deferred = $q.defer();

            $timeout(()=>{
                if(name.toLowerCase().indexOf('abc') === -1){
                    deferred.resolve({massage:""})
                }else{
                    deferred.reject({massage:"not allow include abc"})
                }
            },3000)

            return deferred.promise;
        };

        this.checkNumber = (value)=>{
            var deferred = $q.defer();

            $timeout(()=>{
                if(value<15){
                    deferred.resolve({massage:""})
                }else{
                    deferred.reject({massage:"not allow more than 15"})
                }
            },1000)

            return deferred.promise;
        }

    }

    controller8.$inject = ['$http','APIurl'];
    function controller8($http,APIurl){
        var response = $http({
            method:"GET",
            url:(APIurl+"/4/3/12/2023/18")
        });
        response.then((res)=>{
            this.data = res.data;
        },(err)=>{
            this.err = "err";
        })

    }




})();