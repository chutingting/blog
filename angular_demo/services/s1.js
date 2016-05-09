/**
 * Created by wupeng5 on 2016/5/9.
 */

angular.module('app').factory("s1",function($http){
    var t = function(){
        this.name = 1;
    }

    return new t();
})