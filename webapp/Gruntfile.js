module.exports = function(grunt) {
	/*
	 * Do grunt related things here
	 * Every thing happens inside the wrapper function
	 */

	 /** Project configuration **/

	 grunt.initConfig({
	 	pkg: grunt.file.readJSON('package.json'),
	 	uglify: {
	 		options: {
	 			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	 		},
	 		custom: {
	 			src: 'dest/js/main.js',
	 			dest: 'dest/js/main.min.js'
	 		}
	 	},
	 	concat: {
	 		options: {
	 			separator: ';',
	 		},
	 		custom: {
	 			src: 'static/js/*.js',
	 			dest: 'dest/js/main.js',
	 		},
	 	},
	 	compass: {
	 		dist: {
	 			options: {
	 				sassDir: 'static/scss/',
	 				cssDir: 'static/css/',
	 			},
	 		},
	 	},
	 	concat_css: {
    		options: {
      			// Task-specific options go here.
    		},
    		all: {
      			src: 'static/css/*.css',
      			dest: 'dest/css/style.css',
    		},
  		},
  		clean: {
  			css: 'static/css/',
  		},
  		watch: {
  			options: {
  				livereload: true,
  			},
  			css: {
  				files: 'static/scss/**/*.scss',
  				tasks: 'update-css',
  			},
  			scripts: {
  				files: 'static/js/**/*.js',
  				tasks: 'update-js',
  			},
  			templates: {
  				files: 'index.html',
  			},
  		}
	});

	/** Load npm tasks from node_modules **/

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-concat-css');

	/** Grunt tasks **/

	grunt.registerTask('update-css', ['clean', 'compass', 'concat_css']);
	grunt.registerTask('update-js', ['concat', 'uglify']);

	grunt.registerTask('default', ['update-css', 'update-js']);
	grunt.registerTask('development', ['update-css', 'update-js']);
};

// Don't cross this line ----------------------------------