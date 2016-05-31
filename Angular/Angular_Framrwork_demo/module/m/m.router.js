'use strict';

angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mList', {
        url: '/mList',
        params:{entity:{}},
        templateUrl: function(){
            return "mList.html";
        },
        controller: 'mCtrl'
      });
  });
