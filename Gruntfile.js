/*
 * optimize-amap
 * https://github.com/iStanHua/optimize-amap.git
 *
 * Copyright (c) 2016 iStanHua
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    
    grunt.initConfig({
		filerev: {
			options: {
				algorithm: 'md5',
				length: 8
			}
		},
        jadeUsemin: {
            main: {
                options: {
                    prefix: 'src',
                    targetPrefix: 'dist',
                    tasks: {
                        js: ['concat', 'uglify','filerev'],
                        css: ['concat', 'cssmin','filerev']
                    },
                    dirTasks: ['filerev']
                },
                files: [{
                    src: ['src/**/*.jade'],
                    dest:'dist',
                }]
            }

        },
        clean: {
            jade: ['dist/**/*.jade'],
            build: ['dist']
        },
        jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: true,
						timestamp: "<%= grunt.template.today('yyyymmddHHMMss') %>",
						keywords: "",
						description: "",
						version: "",
					}
				},
				files: [{
					expand: true,
					cwd: 'dist',
					src: ['**/*.jade', '!layout.jade', '!template/**/*.jade'],
					dest: 'dist',
					ext: '.html'
				}]
			}
		},
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-jade-usemin');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('default', [
        'clean',
        'jadeUsemin',
        'jade',
        'clean:jade'
    ]);
}