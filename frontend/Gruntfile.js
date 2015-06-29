module.exports = function(grunt) {  	
  	// Initial configuration
	grunt.initConfig({
		browserify:{
			dist: {
			  files: {
			    'bundle.js': ['index.jsx'],
			  },
			  options: {
			    transform: ['babelify']
			  }
			}
		},
	    connect: {
	        server:{ 
	        	options: {
	            	port: 3001,
	            	base: '.'        	
	        	}
	        }
	    },	   
	    sass: {
	        dist: {
	            files: {
	                'materialize/sass/materialize.css': 'materialize/sass/materialize.scss'
	            }
	        }
	    },	     
		watch: {
		  options: {
		    livereload: true
		  },			
		  css: {
		    files: ['materialize/sass/*.scss','materialize/sass/components/*.scss'],
		    tasks: ['sass'],
		  },
		  react:{
		  	files: ['index.jsx','views/*.jsx'],
		  	tasks: ['browserify']
		  }
		}
	});

	// Required packages
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Registering tasks
	grunt.registerTask('default',['connect:server','watch']);
};