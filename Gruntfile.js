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
        "htmlmin": {
            "options": {
                "removeComments": true,
                "collapseWhitespace": true,
                "decodeEntities": true,
                "collapseBooleanAttributes": true,
            },
            "page": {
                "files": {
                    "index.html": "index.html",
                },
            }
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
	// js
	"browserify": {
	    "options": {
		"transform": [ "babelify" ],
	    },
	    "scripts": {
		"files": {
		    "assets/js/script.js": "src/js/main.js",
		},
	    },
	},
	"uglify": {
	    "options": {
		"mangle": {
		    "except": [ "jQuery" ],
		},
	    },
	    "scripts": {
		"files": {
		    "assets/js/script.min.js": "assets/js/script.js",
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
                "files": "src/stylus/**/*.styl",
                "tasks": [ "css" ],
            },
	    "js": {
		"files": "src/js/**/*.js",
		"tasks": [ "js" ],
	    },
        },
    } );

    grunt.registerTask( "html", [ "pug", "htmlmin" ] );

    grunt.registerTask( "assets", [ "image" ] );

    grunt.registerTask( "css", [ "stylus", "csso" ] );

    grunt.registerTask( "js", [ "browserify", "uglify" ] );

    grunt.registerTask( "default", [ "assets", "html", "css", "js" ] );

    grunt.registerTask( "work", [ "default", "watch" ] );

};
