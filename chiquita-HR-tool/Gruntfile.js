module.exports = function(grunt) {

  //LOADED NPM TASKS
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  //REGISTERD TASK VARIABLES
  var target = grunt.option('target') || 'build';
  var opt = grunt.option('opt') || 'none'; //none or uglify

  //REGISTERD TASKS
  grunt.registerTask('listen',  ['watch']);
  grunt.registerTask('bbuild',  ['bower']);
  grunt.registerTask('cbuild',  ['compass']);
  grunt.registerTask('rbuild',  ['requirejs']);
  grunt.registerTask('build',   ['compass:dev', 'requirejs', 'clean', 'copy']);
  grunt.registerTask('release', ['compass:release', 'requirejs', 'clean', 'copy']);

  // Project configuration.
  grunt.initConfig({
    distdir: 'dist',
    srcdir: 'src',
    pkg: grunt.file.readJSON('package.json'),
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [{ 
          dest: '<%= distdir %>', 
          src : [ 'css/**',
                  'index.html', 
                  'final.html', 
                  'app/**', 
                  '!app/**/*.js', 
                  'app/main.js',
                  'app/calcData.json', 
                  '!app/_directives', 
                  '!app/_services',
                  'images/**',
                  'vendor/requirejs/require.js',
                  'vendor/respond/dest/respond.min.js' 
                ], 
          expand: true, 
          cwd: '<%= srcdir %>' }]
      }
    },//copy
    bower: {
      target: {
        rjsConfig: '<%= srcdir %>/app/config.js'
      }
    },//bower
    requirejs: { //https://github.com/gruntjs/grunt-contrib-requirejs
        compile: {
            options: {
              mainConfigFile : "src/app/config.js",
              baseUrl : "<%= srcdir %>/app", 
              name: "config", 
              out: "<%= srcdir %>/app/main.js", 
              findNestedDependencies: true,
              keepBuildDir: true,
              optimize: opt
            }
        }
    },//requirejs
    compass: {
      dev: {
        options: {
          sassDir: '<%= srcdir %>/sass',
          cssDir:  '<%= srcdir %>/css',
          imagesPath: '../assets',
          environment: 'development',
          outputStyle : 'expanded'
        }
      },
      release: {
        options: {
          sassDir: '<%= srcdir %>/sass',
          cssDir:  '<%= srcdir %>/css',
          imagesPath: '../assets',
          environment: 'production',
          outputStyle : 'compressed'
        }
      }
    },//compass
    sass: {
      dist: {
        options: {
          banner: "/* This file generated with 'grunt sass'. Don't edit it directly. Edit files in /sass/ directory instead. */",
        },
        files: {
          '<%= srcdir %>/css/main.css': '<%= srcdir %>/sass/main.scss'
        }
      }
    },//sass
    watch: {
      css: {
        files: ['<%= srcdir %>/sass/*/*.scss', '<%= srcdir %>/app/**/*.js', 'test/browser/**/*.js'],
        tasks: ['compass:dev', 'requirejs', 'clean', 'copy'],
        options: {
          livereload: 80000
        }
      }
    }//watch
  });

};

