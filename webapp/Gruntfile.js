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
	 		app: {
	 			src: 'dest/js/app.js',
	 			dest: 'dest/js/app.min.js'
	 		},
	 		lib: {
	 			src: 'dest/js/lib.js',
	 			dest: 'dest/js/lib.min.js',
	 		}
	 	},
	 	concat: {
	 		options: {
	 			separator: ';',
	 		},
	 		app: {
	 			src: ['static/js/app/app.js', 'static/js/app/router.js', 'static/js/app/helpers/*.js', 'static/js/app/data/*.js', 'static/js/app/views/*.js'],
	 			dest: 'dest/js/app.js',
	 		},
	 		lib: {
	 			src: 'static/js/lib/*.js',
	 			dest: 'dest/js/lib.js',
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
      			src: ['static/css/layout.css', 'static/css/blocks/*.css'],
      			dest: 'dest/css/style.css',
    		},
  		},
  		clean: {
  			css: ['dest/css/', 'static/css/'],
  			js: 'dest/js/',
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
  				files: ['static/js/app/**/*.js', 'static/js/lib/*.js'],
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

	grunt.registerTask('update-css', ['clean:css', 'compass', 'concat_css']);
	grunt.registerTask('update-js', ['clean:js', 'concat:app', 'concat:lib', 'uglify:app', 'uglify:lib' ]);

	grunt.registerTask('default', ['update-css', 'update-js']);
	grunt.registerTask('development', ['update-css', 'update-js']);
};

// Don't cross this line ----------------------------------