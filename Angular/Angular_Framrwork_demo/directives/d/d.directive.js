/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("productAdmin").directive("paging",function(){
    return {
        templateUrl:"d.html",
        restrict:"EA",
        scope:{
            "callbackFn":"=",
            "url":"@"
        },
        link:function(){},
        controller:function($scope,$http,$rootScope){

        }
    }
})