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
        // css
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
        // assets
        "image": {
            "options": {
                "pngquant": true,
                "optipng": true,
                "zopflipng": false, // TMP
                "jpegRecompress": false,
                "jpegoptim": true,
                "mozjpeg": true,
                "gifsicle": true,
            },
            "assets": {
                "files": [
                    {
                        "expand": true,
                        "cwd": "src/images/",
                        "src": [ "**/*.{png,jpg,gif,svg}" ],
                        "dest": "assets/images/",
                    },
                ],
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

    grunt.registerTask( "assets", [ "image" ] );

    grunt.registerTask( "css", [ "stylus", "csso" ] );

    grunt.registerTask( "default", [ "assets", "html", "css" ] );

    grunt.registerTask( "work", [ "default", "watch" ] );

};
