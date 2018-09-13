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
        files: [
          {"public/index.html": "host_src/index.pug"},
          {"public/privacy.html": "host_src/privacy.pug"},
        ]
      }
    },
    copy: {
      img: {
        files: [
          {
            expand: true,
            cwd: "host_src/img/",
            src: ["[^_]**.png"],
            dest: "public/img",
            filter: "isFile"
          }
        ]
      },
      sound: {
        files: [
          {
            expand: true,
            cwd: "host_src/sounds/",
            src: ["**.mp3"],
            dest: "public/sounds",
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