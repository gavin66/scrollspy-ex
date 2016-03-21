'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    copy: {
      options: {
        banner: '<%= banner %>'
      },
      dev: {
        src: 'dev/scrollspy-ex.js',
        dest: 'dist/scrollspy-ex.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dev: {
        files: [{
          expand:true,
          cwd:'dist/',
          src:['*.js', '!*.min.js'],
          dest: 'dist/',
          ext: '.min.js'
        }]
      }
    },

    sass: {
      dev: {
        options:{
          sourcemap:'none',
          noCache:true,
          style:'expanded'
        },
        files:{
          'dist/xxx.css': 'dev/xxx.scss'
        }
      }
    },

    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      target: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/',
          ext: '.min.css'
        }]
      }
    },

    livereload: {
      options: {
        base: ''
      },
      files: ['dist/**/*.css','dist/**/*.js']
    },

    watch: {
      sass: {
        files: ['dev/**/*.scss'],
        tasks: ['sass:dev','cssmin']
      },
      js: {
        files: ['dev/**/*.js'],
        tasks: ['copy:dev','uglify:dev']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-livereload');


  grunt.registerTask('default', ['cssmin','copy:dev','uglify:dev']);

  //grunt.registerTask('live',['livereload','watch']);
  grunt.registerTask('live',['watch']);
};
