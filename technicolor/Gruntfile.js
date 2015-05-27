module.exports = function(grunt) {

  //LOADED NPM TASKS
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  //REGISTERD TASK VARIABLES
  var target = grunt.option('target') || 'build';
  var opt = grunt.option('opt') || 'none'; //none or uglify

  //REGISTERD TASKS
  grunt.registerTask('videojs', ['less:dev']);
  grunt.registerTask('listen',  ['watch']);
  grunt.registerTask('build',   ['less:dev', 'compass:dev', 'clean', 'concat', 'copy']);
  grunt.registerTask('release', ['less:dist', 'compass:dist', 'clean', 'concat', 'copy', 'uglify']);

  // Project configuration.
  grunt.initConfig({
    distdir: 'fullbuild',
    srcdir: 'src',
    pkg: grunt.file.readJSON('package.json'),
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [
          { dest: '<%= distdir %>',
          src : [ 'css/**',
                  'index.html',
                  'favicon.ico',
                  'techcache.mf',
                  'app/**',
                  '!app/**/*.js',
                  'libs/**',
                  'images/**',
                  'Birdman Case Study.pdf',
                  'Whiplash Case Study.pdf',
                  'video/**',
                  'audio/**',
                  '304367/**' //css fonts typography.com
                ],
          expand: true,
          cwd: '<%= srcdir %>' },

          { dest: '<%= distdir %>/libs/',
            src : [ 'video-js/**'],
            expand: true,
            cwd: '<%= srcdir %>/vendor/videojs/dist/' }
        ],
      }
    },//copy
    concat: {
        preload: {
          src: [
            '<%= srcdir %>/vendor/PreloadJS/lib/preloadjs-0.6.0.min.js'
          ],
          dest: '<%= distdir %>/libs/preload.js',
        },
        libs: {
          src: [
            '<%= srcdir %>/vendor/jquery/dist/jquery.js',
            '<%= srcdir %>/vendor/jquery-mousewheel-master/jquery.mousewheel.min.js',
            '<%= srcdir %>/vendor/greensock/src/minified/TweenMax.min.js',
            '<%= srcdir %>/vendor/greensock/src/minified/plugins/ThrowPropsPlugin.min.js',
            '<%= srcdir %>/vendor/greensock/src/minified/plugins/ScrollToPlugin.min.js',
            '<%= srcdir %>/vendor/greensock/src/minified/utils/Draggable.min.js',
            '<%= srcdir %>/vendor/hoverIntent/hoverIntent.min.js',
            '<%= srcdir %>/vendor/iscroll/build/iscroll.js'
          ],
          dest: '<%= distdir %>/libs/libsPackage.js',
        },
        angular: {
          src: [
            '<%= srcdir %>/vendor/angular/angular.js',
            '<%= srcdir %>/vendor/angular-animate/angular-animate.js',
            '<%= srcdir %>/vendor/angular-sanitize/angular-sanitize.js',
            '<%= srcdir %>/vendor/angular-touch/angular-touch.js',
            '<%= srcdir %>/vendor/angular-swipe/dist/angular-swipe.min.js',
            '<%= srcdir %>/vendor/angular-ui-router/release/angular-ui-router.min.js',
            '<%= srcdir %>/vendor/ngkookies/ngkookies.min.js',
          ],
          dest: '<%= distdir %>/libs/angularPackage.js',
        },
        app: {
          src: [
            '<%= srcdir %>/app/_services/trackImage_svc.js',
            '<%= srcdir %>/app/_services/resizeImage_svc.js',
            '<%= srcdir %>/app/_services/requestJson_svc.js',
            '<%= srcdir %>/app/_services/stateChange_svc.js',
            '<%= srcdir %>/app/_services/resizeStatic_svc.js',
            '<%= srcdir %>/app/_directives/howtouse_dir.js',
            '<%= srcdir %>/app/_directives/talent_dir.js',
            '<%= srcdir %>/app/_directives/alertmsgs_dir.js',
            '<%= srcdir %>/app/_directives/gameSlider_dir.js',
            '<%= srcdir %>/app/_directives/colorMileStones_dir.js',
            '<%= srcdir %>/app/_directives/patentMileStones_dir.js',
            '<%= srcdir %>/app/_directives/technicalMileStones_dir.js',
            '<%= srcdir %>/app/_directives/preloader_dir.js',
            '<%= srcdir %>/app/_directives/progressbar_dir.js',
            '<%= srcdir %>/app/_directives/overlayeffect_dir.js',
            '<%= srcdir %>/app/_directives/footerTitle_dir.js',
            '<%= srcdir %>/app/_directives/mainNav_dir.js',
            '<%= srcdir %>/app/_directives/technitrivia_dir.js',
            '<%= srcdir %>/app/error_page/error_mod.js',
            '<%= srcdir %>/app/chapter_intro/intro_mod.js',
            '<%= srcdir %>/app/chapter_empower/empower_mod.js',
            '<%= srcdir %>/app/chapter_colorstory/colorstory_mod.js',
            '<%= srcdir %>/app/chapter_homebeyond/homebeyond_mod.js',
            '<%= srcdir %>/app/chapter_innovators/innovators_mod.js',
            '<%= srcdir %>/app/chapter_talent/talent_mod.js',
            '<%= srcdir %>/app/chapter_end/end_mod.js',
            '<%= srcdir %>/app/app.js'
          ],
          dest: '<%= distdir %>/app.js',
        },
    }, //concat
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          '<%= distdir %>/libs/angularPackage.js': ['<%= distdir %>/libs/angularPackage.js'],
          '<%= distdir %>/libs/libsPackage.js': ['<%= distdir %>/libs/libsPackage.js'],
          '<%= distdir %>/app.js': ['<%= distdir %>/app.js']
        }
      }
    }, //uglify
    compass: {
      dev: {
        options: {
          sassDir: '<%= srcdir %>/sass',
          cssDir:  '<%= srcdir %>/css',
          imagesPath: '../images',
          environment: 'development',
          outputStyle : 'expanded'
        }
      },
      dist: {
        options: {
          sassDir: '<%= srcdir %>/sass',
          cssDir:  '<%= srcdir %>/css',
          imagesPath: '../images',
          environment: 'production',
          outputStyle : 'compressed'
        }
      }
    },//compass
    less: {
      dev: {
        options: {
          sourceMap: false,
          compress: false
        },
        files: {
          "<%= srcdir %>/vendor/videojs/dist/video-js/video-js.css": "<%= srcdir %>/vendor/videojs/dist/video-js/video-js.less"
        }
      },
      dist: {
        options: {
          sourceMap: false,
          compress: true
        },
        files: {
          "<%= srcdir %>/vendor/videojs/dist/video-js/video-js.css": "<%= srcdir %>/vendor/videojs/dist/video-js/video-js.less"
        }
      }
    },//less
    watch: {
      css: {
        files: ['<%= srcdir %>/sass/**'],
        tasks: ['less:dev', 'compass:dev', 'clean', 'concat', 'copy'],
        options: {
          livereload: 80000
        }
      }
    }//watch
  });

};
