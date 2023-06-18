(()=>{
    'use strict';

    angular.module('app',[])
    .controller('controllerRight',controllerRight)
    .service('getDataService',getDataService);

    controllerRight.$inject = ['getDataService'];
    function controllerRight(getDataService){
        getDataService.getHomeData().then((data)=>{
            this.home = data;
        },(err)=>{
            this.home = err;
        });

        getDataService.getOutsideData().then((data)=>{
            this.outside = data;
        },(err)=>{
            this.outside = err;
        });

        // this.outside = {
        //     C : 2,
        //     F : 36,
        //     H : 44
        // }
    }

    getDataService.$inject = ['$q','$http'];
    function getDataService($q,$http){
        this.getHomeData = ()=>{
            var deferred = $q.defer();

            $http({
                method:"GET",
                url:("/dataPort/4/1")
            }).then((res)=>{
                console.log(typeof (res.data.rows[0].temp*1))
                deferred.resolve({
                    C : (res.data.rows[0].temp*1).toFixed(2),
                    F : (res.data.rows[0].temp * 9 / 5 + 32).toFixed(2),
                    H : (res.data.rows[0].humidity*1).toFixed(2)
                });
            },(err)=>{
                deferred.reject({
                    C : err,
                    F : err,
                    H : err
                })
            })

            return deferred.promise;
        }

        this.getOutsideData = ()=>{
            var deferred = $q.defer();

            $http({
                method:"GET",
                url:("http://api.openweathermap.org/data/2.5/group?id=5106834&appid=de6d52c2ebb7b1398526329875a49c57&units=metric")
            }).then((res)=>{
                deferred.resolve({
                    C : res.data.list[0].main.temp.toFixed(2),
                    F : (res.data.list[0].main.temp * 9 / 5 + 32).toFixed(2),
                    H : res.data.list[0].main.humidity.toFixed(2)
                });
            },(err)=>{
                deferred.reject({
                    C : err,
                    F : err,
                    H : err
                })
            })

            return deferred.promise;
        }

    }


})();