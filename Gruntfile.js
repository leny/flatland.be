/* leny/flatland.be
 *
 * Gruntfile.js - Grunt tasks definitions
 *
 * coded by leny@flatLand!
 * started at 08/10/2016
 */

/* eslint-disable */

"use strict";

module.exports = function( grunt ) {

    require( "load-grunt-tasks" )( grunt );

    grunt.initConfig( {
        // html
        "pug": {
            "options": {
                "compress": false,
            },
            "page": {
                "files": {
                    "index.html": "src/pug/index.pug",
                },
            },
        },
        // CSS
        "stylus": {
            "options": {
                "compress": false,
                "use": [
                    require( "kouto-swiss" ),
                ],
            },
            "styles": {
                "files": {
                    "assets/css/styles.css": "src/stylus/styles.styl",
                },
            },
        },
        "csso": {
            "options": {
                "report": "gzip",
            },
            "styles": {
                "files": {
                    "assets/css/styles.min.css": "assets/css/styles.css",
                },
            },
        },
        // watch
        "watch": {
            "pug": {
                "files": [ "src/**/*.pug", "src/**/*.svg" ],
                "tasks": [ "html" ],
            },
            "stylus": {
                "files": "src/stylus/styles.styl",
                "tasks": [ "css" ],
            },
        },
    } );

    grunt.registerTask( "html", [ "pug" ] );

    grunt.registerTask( "css", [ "stylus", "csso" ] );

    grunt.registerTask( "default", [ "html", "css" ] );

    grunt.registerTask( "work", [ "default", "watch" ] );

};
