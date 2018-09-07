module.exports = function(grunt) {
  grunt.initConfig({
    pug: {
      release: {
        options: {
          data: {
            debug: true,
            pretty: false
          }
        },
        files: {
          "public/index.html": "host_src/index.pug"
        }
      }
    },
    copy: {
      fonts: {
        files: [
          {
            expand: true,
            cwd: "host_src/img/",
            src: ["[^_]**.png"],
            dest: "public/img",
            filter: "isFile"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-pug");

  //grunt.loadNpmTasks("grunt-contrib-uglify");
  //grunt.loadNpmTasks("grunt-contrib-less");

  grunt.registerTask("_Dist", ["pug",'copy']);
};