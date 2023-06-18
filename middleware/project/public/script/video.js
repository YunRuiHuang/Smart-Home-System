(()=>{
    'use strict';

    angular.module('app',[])
    .controller('controller1',controller1)
    .factory('dataFactory',dataFactory)
    .filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);

    controller1.$inject = ['dataFactory'];
    function controller1(dataFactory){
        this.test = "success";
        this.videoName = "2022.mp4";
        this.video = '/video/2022.mp4?path=["1","2"]';
        this.path = [];
        this.files = [1,2];
        this.update = ()=>{
            dataFactory(this.path).then((data)=>{
                this.files = data;
            },(err)=>{
                this.files = [];
            }
            )
        };
        this.update();
        this.deletePath = ()=>{
            this.path.pop();
            this.update();
        };

        this.changePath = (index)=>{
            let element = this.files[index];
            let type = element.slice(-3);
            if(type == "mp4"){
                this.video = "/video/" + element + "?path=" + JSON.stringify(this.path);
                this.videoName = element;
                console.log(this.video);
            }else{
                this.path.push(element);
                this.update();
            }
        }


    }

    dataFactory.$inject = ['$q','$http'];
    function dataFactory($q,$http){
        return (paths)=>{
            var deferred = $q.defer();

            $http({
                method:"POST",
                url:("/path"),
                data:{path:paths}
                
            }).then((res)=>{
                
                deferred.resolve(res.data.file);
            },(err=>{
                deferred.reject(err);
            }))

            return deferred.promise;
        };
    }

})();