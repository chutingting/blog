/**
 * Created by wupeng5 on 2016/5/9.
 */


var app = angular.module("app",[
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

//当路由变化的时候触发
app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, current, previous) {

        if(current.name == "loginSafe" || current.name == "loginAdmin"){
            $rootScope.rootShow = false;
        }else{
            $rootScope.rootShow = true;
        }

        if(current.name.indexOf('safeRoom') != -1){
            $rootScope.cls1 = "navbar_hover";
            $rootScope.cls3 = "";
        }
        if(current.name.indexOf('roomManage') != -1){
            $rootScope.cls1 = "";
            $rootScope.cls3 = "navbar_hover";
        }
    });
}]);