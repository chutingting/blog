/**
 * Created by wupeng5 on 2016/3/5.
 */

if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
    module.exports = 'pagingModule';
}

(function(angular){
    'use strict';

    angular.module("pagingModule",[]).directive("paging",function(){
        return {
            template:"共<span class='red' ng-bind='totalProCount'></span>条" +
             "<input type='button' value='上一页' ng-click='prev();'/>" +
             "<input type='button' value='下一页' ng-click='next()' />" +
             "当前第<span class='red' ng-bind='currentIndex'></span>/<span class='red' ng-bind='allPages'></span>页" +
             "到<input type='text' style='width:20px' class='mb20' ng-model='enterIndex'/>页" +
             "<input type='button' value='确定' ng-click='doEnterSearch();'/>",
            restrict:"EA",
            scope:{
                "callbackFn":"=",
                "getUrl":"="
            },
            link:function(){},
            controller:function($scope,$http){

                if(!$scope.callbackFn || !$scope.getUrl || typeof $scope.callbackFn != "function" || typeof $scope.getUrl != "function"){
                    alert("回调函数和获取URL地址必须配置为函数!");
                    return;
                }

                var index = 1;
                var size = 10;

                $scope.totalProCount = 0;
                $scope.allPages = 0;
                $scope.currentIndex = 0;
                $scope.enterIndex = "1";

                function dealUrl(){

                    var tmp = $scope.getUrl();

                    if(tmp.indexOf('?') == -1){
                        return tmp + "?curPage="+index+"&pageSize="+size+"&ran="+Math.random();
                    }else{
                        return tmp + "&curPage="+index+"&pageSize="+size+"&ran="+Math.random();
                    }
                }

                function getData(url){
                    $http.get(url).success(function(d){

                        d = d.angularPagingData;

                        for(var i=0;i< d.datas.length;i++){
                            d.datas[i].ck = false;
                        }

                        $scope.allPages = d.pageTotalNum;
                        $scope.totalProCount = d.totalCount;
                        $scope.currentIndex = index;

                        $scope.callbackFn(d.datas);
                    })
                }

                $scope.$on("doSearch",function(event,data){
                    index = 1;
                    getData(data.url + "&curPage="+index+"&pageSize="+size+"&ran="+Math.random());
                })

                $scope.doEnterSearch = function(){
                    var val  = parseInt($scope.enterIndex);
                    if(isNaN(val) || val > parseInt($scope.allPages) || val <1 ){
                        alert("请输入小于总页数的正整数!");
                        return;
                    }
                    index = val;
                    getData(dealUrl());
                }

                $scope.prev = function(){
                    if(index == 1){
                        return;
                    }
                    index--;
                    getData(dealUrl());
                }

                $scope.next = function(){
                    if(index == parseInt($scope.allPages)){
                        return;
                    }
                    index++;
                    getData(dealUrl());
                }

                getData(dealUrl());
            }
        }
    })
})(angular);

