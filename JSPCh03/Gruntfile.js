/**
 * Gruntfile.js
 */
module.exports = function(grunt) {
	// Start the config's initialization function.
	grunt.initConfig({
		// Cache the settings in package.json file
		// That way those values can be referenced 
		// elsewhere in the Gruntfile.
		pkg: grunt.file.readJSON('package.json'),
		// Configure a task for concatenating 
		// the scripts in the app.
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		// Configure a task for minification.
		uglify: {
			options: {
				// The banner text is added 
				// to the top of the output.
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				// Minify all files produced in the concat task 
				// and safe them in the dist/ directory. 
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		// Configure qunit
		qunit: {
			// Define the location of the test runner files
			files: ['test/**/*.html']
		},
		// Configure a task for linting,
		// which checks the syntax of the JavaScript 
		// for errors or poor formatting.
		jshint: {
			files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			options: {
				// Options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		// Configure the watch plugin,
		// which runs tasks automatically whenever a file changes.
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'qunit']
		}
	});
	// Load in the Grunt plugins.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');	
	grunt.loadNpmTasks('grunt-contrib-qunit');	
	grunt.loadNpmTasks('grunt-contrib-jshint');	
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Setup the tasks to run,
	// most importantly the default task.
	// To run the test task, run: grunt test
	grunt.registerTask('test', ['jshint', 'qunit']);
	// To run the default task, run: grunt
	grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};