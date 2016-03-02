module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
        build: {
            files: {
                src: [
                  'dist/css',
                  'dist/js'
                ]
            }
        }

    },
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: [
          'img/**',
          'fonts/**',
          '*.txt',
          '*.html',
          '*.ico',
          '*.png'
        ],
        dest: 'dist'
      }
    },
    cssmin: {
      dist: {
        files: grunt.file.expandMapping(['src/css/**/*.css'], 'dist/', {
          rename: function(destBase, destPath) {
            return destBase+destPath.replace('src/css', 'css');
          }
        })
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'src/js/app/**/*.js',
        'src/js/app.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    watch: {
      files: ['src/**'],
      tasks: ['build']
    },
    htmlmin: {
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: false,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dist/index.html': 'dist/index.html'
        }
      }
    },
    cache_control: {
      dist: {
        source: 'src/index.html',
        options: {
          version: '2.0.1',
          links: true,
          scripts: true,
          replace: false,
          outputDest: 'dist/index.html'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      min: {
        files: grunt.file.expandMapping(['src/js/**/*.js'], 'dist/', {
          rename: function(destBase, destPath) {
            return destBase+destPath.replace('src/js', 'js');
          }
        })
      }
    }
  });

  /**
   * Distribution tasks.
   */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-cache-control');

  /**
   * Test tasks.
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bootlint');

  /**
   * Development task.
   */
  grunt.loadNpmTasks('grunt-contrib-watch');

  /**
   *
   */
  grunt.registerTask('default', 'Default grunt task.', ['build']);

  grunt.registerTask('build', ['clean','copy','cache_control','cssmin','htmlmin','uglify']);

  grunt.registerTask('test', ['jshint','bootlint']);

};