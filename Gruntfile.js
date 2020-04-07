module.exports = function (grunt) {
    grunt.initConfig({
      htmlmin: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          src: 'index.html',  
          dest: 'dist/index.html'
        }
      },
      cssmin: {
        "dist/index.css": "index.css"
      },
      uglify: {
        release:{
          files:{
            "dist/index.js":"index.js"
          }
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
  
    grunt.registerTask('default', ['uglify','cssmin','htmlmin']);
  };