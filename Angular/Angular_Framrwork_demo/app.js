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

        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        $httpProvider.defaults.transformRequest = [function(data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];

        //配合nginx处理本地开发, 服务器调式的问题(接口是跨域的)
        $httpProvider.interceptors.push(function($q){
            return {
                'request':function(config){
                    if(config.url.indexOf('html') == -1){
                        config.url = "api" + config.url;
                    }
                    return config || $q.when(config);
                }
            }
        })


    })

//当路由变化的时候触发
app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, current, previous) {

    });
}]);