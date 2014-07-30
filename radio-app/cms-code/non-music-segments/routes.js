'use strict';

define(['require', 'app/app'], function(require, app) {
  
  app.config(function($routeProvider) {

    // Higher routes take precedence... make the detail last so that it doesn't
    // conflict with /users/* or /users/*/anything
    
    $routeProvider.when('/segments', {
      templateUrl: require.toUrl('./promos-controller/segment-promo-controller.html'),
      section: 'non-music-segments',
      requireAuth: true
    });

    $routeProvider.when('/segments/tips', {
      templateUrl: require.toUrl('./tips-controller/segment-tips-controller.html'),
      section: 'non-music-segments',
      requireAuth: true
    });
    
    $routeProvider.when('/segments/greetings', {
      templateUrl: require.toUrl('./greetings-controller/segment-greetings-controller.html'),
      section: 'non-music-segments',
      requireAuth: true
    });


  });

});
