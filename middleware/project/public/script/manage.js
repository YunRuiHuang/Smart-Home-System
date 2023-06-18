(()=>{
    'use strict';

    angular.module('app',[])
    .controller('controller1',controller1)
    .service('getDataService',getDataService);

    controller1.$inject = ['getDataService'];
    function controller1(getDataService){
        this.machine = [{ machineId:-1,status: "offline"}];
        
        getDataService.getMachineStatus().then((data)=>{
            // console.log(data);
            this.machine=this.machine.concat(data);
        },(err)=>{
            // console.log(err);
            this.machine=this.machine.concat(err);
        });



    }


    getDataService.$inject = ['$q','$http'];
    function getDataService($q,$http){
        this.getMachineStatus = ()=>{
            var deferred = $q.defer();

            $http({
                method:"GET",
                url:("/dataPort/4/1")
            }).then((res)=>{
                var update = res.data.rows[0].time;
                var now = new Date();
                var time = new Date(update).toLocaleString("en-US", {timeZone: "America/New_York"});
                // console.log(typeof time);
                var timeDiff = now.getTime() - new Date(time).getTime();
                // console.log(timeDiff);
                const timeDiffHours = timeDiff / (1000 * 60 * 60);
                
                if(timeDiffHours<1){
                    deferred.resolve([{
                        machineId:res.data.rows[0].machine_id,
                        status: "online",
                        lastUpdate:time
                     }]);
                }else{
                    deferred.resolve([{
                        machineId:res.data.rows[0].machine_id,
                        status: "offline",
                        lastUpdate:time
                     }]);
                }
                
            },(err)=>{
                deferred.reject([{
                    err:err,
                    status: "err",
                    lastUpdate:""
                }]);
            })

            return deferred.promise;
        }

    }


})();