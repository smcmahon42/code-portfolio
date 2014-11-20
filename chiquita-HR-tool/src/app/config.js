require.config({
  baseUrl: 'app',
  paths: {
    angular: '../vendor/angular/angular',
    'angular-animate': '../vendor/angular-animate/angular-animate',
    'angular-resource': '../vendor/angular-resource/angular-resource',
    'ui-router': '../vendor/angular-ui-router/release/angular-ui-router',
    'es5-shim': '../vendor/es5-shim/es5-shim',
    jquery: '../vendor/jquery/dist/jquery',
    'jquery.cookie': '../vendor/jquery.cookie/jquery.cookie',
    'angular-sanitize': '../vendor/angular-sanitize/angular-sanitize',
    'angular-ui-router': '../vendor/angular-ui-router/release/angular-ui-router',
    requirejs: '../vendor/requirejs/require',
    'requirejs-text': '../vendor/requirejs-text/text',
    html5shiv: '../vendor/html5shiv/dist/html5shiv',
    angulartics: '../vendor/angulartics/src/angulartics',
    'angulartics-ga': '../vendor/angulartics/src/angulartics-ga',
    respond: '../vendor/respond/dest/respond.src'
  },
  shim: {
    angular: {
      deps: [
        'jquery'
      ],
      exports: 'angular'
    },
    'ui-router': {
      deps: [
        'angular'
      ]
    },
    angulartics: {
      deps: [
        'angular'
      ]
    },
    'angulartics-ga': {
      deps: [
        'angular'
      ]
    },
    'jquery.cookie': {
      deps: [
        'jquery'
      ]
    }
  },
  priority: [
    'angular'
  ],
  packages: [

  ]
});

window.name = "NG_DEFER_BOOTSTRAP!";

require( [
  'angular',
  'app',
  'jquery',
  'ui-router',
  'angulartics',
  'angulartics-ga'
], function(angular, app) {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, [app['name']]);
  });

});

