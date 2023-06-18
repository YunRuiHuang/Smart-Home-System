(()=>{
    'use strict';

    angular.module('app',[])
    .controller('controller1',controller1)
    .service('getDataService',getDataService)
    .factory('dataFactory',dataFactory);

    controller1.$inject = ['dataFactory'];
    function controller1(dataFactory){
        this.machineId=4;
        this.listSize=5;
        this.size = 4;

        this.update = (a,b)=>{
            this.machineId=a||this.machineId;
            this.listSize=b||this.listSize;
            dataFactory(this.machineId,this.listSize).then((data)=>{
                this.home = data;
                this.size = this.home.length-1;
            },(err)=>{
                this.home = err;
                this.size = this.home.length-1;
            });
        } 
        this.update();


    }

    getDataService.$inject = ['$q','$http'];
    function getDataService($q,$http){
        this.getHomeData = ()=>{
            var deferred = $q.defer();

            $http({
                method:"GET",
                url:("/dataPort/4/10")
            }).then((res)=>{
                
                var data = [];
                for(var i = 9; i > -1; i--){
                    data.push({
                        C : (res.data.rows[i].temp*1).toFixed(2),
                        F : (res.data.rows[i].temp * 9 / 5 + 32).toFixed(2),
                        H : (res.data.rows[i].humidity*1).toFixed(2),
                        B : res.data.rows[i].bright,
                        time : new Date(res.data.rows[i].time).toLocaleTimeString("en-US", {hour12: false}),
                        date : new Date(res.data.rows[i].time).toLocaleString("en-US", {timeZone: "America/New_York"}).slice(0, 10)
                    })
                }

                deferred.resolve(data);
            },(err)=>{
                deferred.reject([{
                    C : err,
                    F : err,
                    H : err,
                    time : err
                }])
            })

            return deferred.promise;
        }
    }

    dataFactory.$inject = ['$q','$http'];
    function dataFactory($q,$http){
        return (machineId, listSize)=>{
            var deferred = $q.defer();

            $http({
                method:"GET",
                url:("/dataPort/"+machineId+"/"+listSize)
            }).then((res)=>{
                
                var data = [];
                for(var i = (res.data.rows.length-1); i > -1; i--){
                    data.push({
                        C : (res.data.rows[i].temp*1).toFixed(2),
                        F : (res.data.rows[i].temp * 9 / 5 + 32).toFixed(2),
                        H : (res.data.rows[i].humidity*1).toFixed(2),
                        B : res.data.rows[i].bright,
                        time : new Date(res.data.rows[i].time).toLocaleTimeString("en-US", {hour12: false}),
                        date : new Date(res.data.rows[i].time).toLocaleString("en-US", {timeZone: "America/New_York"}).slice(0, 10)
                    })
                }

                deferred.resolve(data);
            },(err)=>{
                deferred.reject([{
                    C : err,
                    F : err,
                    H : err,
                    time : err
                }])
            })

            return deferred.promise;
        };
    }


})();