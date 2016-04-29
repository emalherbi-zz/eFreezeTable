module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    properties: grunt.file.readJSON('properties.json'),

    banner: '/*!\n' +
    ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
    ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
    ' */\n',

    /* clean directories */
    clean: ['<%= properties.dist %>'],

    /* concat files */
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      basic_and_extras: {
        files: {
          "<%= properties.dist %>/<%= pkg.name %>.js"  : ['<%= pkg.name %>.js' ],
          "<%= properties.dist %>/<%= pkg.name %>.css" : ['<%= pkg.name %>.css']
        },
      },
    },

    /* js validate */
    jshint: {
      all: ['<%= pkg.name %>.js']
    },

    /* css validate */
    csslint: {
      all: ['<%= pkg.name %>.css']
    },

    /* js file minification */
    uglify: {
      options: {
        preserveComments: true
      },
      build: {
        files: {
          '<%= properties.dist %>/<%= pkg.name %>.min.js': [ '<%= properties.dist %>/<%= pkg.name %>.js' ],
        }
      }
    },

    /* css file minification */
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        preserveComments: true
      },
      target: {
        files: {
          '<%= properties.dist %>/<%= pkg.name %>.min.css': ['<%= properties.dist %>/<%= pkg.name %>.css']
        }
      }
    }

  });

  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  // tasks
  grunt.registerTask('build', [
    'clean',
    'concat',
    'jshint',
    'csslint',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
