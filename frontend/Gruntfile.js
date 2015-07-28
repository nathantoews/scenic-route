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
	    autoprefixer: {
	    	options: {
  				browsers: ['last 2 versions']
			},
            single_file: {
                src: 'materialize/sass/materialize.css',
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
		    tasks: ['sass','autoprefixer'],
		  },
		  react:{
		  	files: ['index.jsx','views/*.jsx','stores/*.jsx'],
		  	tasks: ['browserify']
		  }
		}
	});

	// Required packages
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-autoprefixer');

	// Registering tasks
	grunt.registerTask('default',[
									'connect:server',
									'browserify',
									'sass',
									'autoprefixer',
									'watch'
								]);

};
