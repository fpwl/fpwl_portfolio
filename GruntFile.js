// GruntFile.js
module.exports = function (grunt) {
    // initiliased the config
    grunt.initConfig({
        jshint: {
            files: ["*.js", "src/js/custom.js"],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        htmlmin: {                                     
            src: {                                    
                options: {                              
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                  
                    'dist/index.min.html': 'src/index.html',     
                }
            },
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'   
                }]
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/js/custom.min.js': ['src/js/custom.js'],
                    'dist/js/project.min.js': ['src/js/project.js'],
                }
            }
        },
        sass: {
            dist: {
                files: {
                    "src/css/style.css": "src/sass/style.scss",
                }
            }
        },
        watch: {
            sass: {
                files: ["src/sass/**/*.scss"],
                tasks: ["sass"]
            },
            js: {
                files: ["src/js/**/*.*"],
                tasks: ["jshint"]
            },
        }


    });
    //Run command tasks
    // running grunt jshint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // run grunt mincss
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // run grunt uglifyy js
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // run gruntSass
    grunt.loadNpmTasks('grunt-contrib-sass');
    // run grunt minhtml
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // run gruntwatch
    grunt.loadNpmTasks('grunt-contrib-watch');


    // In terminal if entered 'grunt debug', 
    // it will only run the tasks inside the array 
    grunt.registerTask("build", ["sass", "cssmin", "jshint", "uglify", "htmlmin"]);
    grunt.registerTask("w", ["watch"]);

};