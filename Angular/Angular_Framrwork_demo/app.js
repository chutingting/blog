/**
 * Created by wupeng5 on 2016/5/9.
 */


angular.module("app",[
    'ngSanitize',
    'ui.router'
])
    .config(function($stateProvider,$urlRouterProvider,$locationProvider,$httpProvider){
        $urlRouterProvider.otherwise('/mList');

        //$locationProvider.html5Mode(true);

        //配合nginx处理本地开发, 服务器调式的问题(接口是跨域的)
        $httpProvider.interceptors.push(function($q){
            return {
                'request':function(config){
                    if(config.url.indexOf('html') == -1){
                        config.url = "" + config.url;
                    }
                    return config || $q.when(config);
                }
            }
        })
    })