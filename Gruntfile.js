module.exports = function (grunt) {
    
    var chromePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
    var jasmineRunner = "http://localhost/html5lab/unit_test/runner.html";
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('./app.json'),
        cwd: __dirname,
        'shell': {
            appengine: {
                command: [
                    '"C:\\Program Files\\Internet Explorer\\iexplore.exe" "https://amers1.views.cp.icp2.mpp.reutest.com/TRS/ClickOnce/EikonAppEngine/EikonAppEngine.application?a=true&d=1.0.9.1,<%= cwd %>"',
                    'node-inspector'
                ].join('&&')
            },
            jsdoc: {
                command: 'java -jar build\\goog\\jsdoc-toolkit\\jsrun.jar build\\goog\\jsdoc-toolkit\\app\\run.js -t=build\\goog\\jsdoc-toolkit\\templates\\jsdoc -r scripts\\  -d=output\\docs\\'
            },
            padding: {
                command: '"build\\trwebchart\\padding_version.bat"'
            },
            unittest: {
                command: '"' + chromePath + '" "' + jasmineRunner + '"'
            }
        },
        //
        'jshint': {
            options: {
                // Enforcing                
                plusplus: false,
                // Relaxing
                asi: true,
                expr: true,
                evil: true,
                laxbreak: true,
                multistr: true,
                sub: true,
                smarttabs: true
            },
            source: {
                src: [
                    './Gruntfile.js',
                    './scripts/**/*.js',
                    './import/novakit_trwebchart/**/*.js'
                    ]
            }
        },
        'closureBuilder': {
            options: {
                builder: './build/goog/closure-tools/ClosureCompiler/bin/build/closurebuilder.py',
                compilerFile: './build/goog/closure-tools/ClosureCompiler/bin/build/compiler.jar',
                compile: true, // boolean
                namespaces: ['tr.ext.chart'],
                compilerOpts: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    generate_exports: true,
                    externs: [
                        './build/goog/closure-lib/closure/externs/charts.js',
                        './build/goog/closure-lib/closure/externs/jetQuotes.js',
                        './build/goog/closure-lib/closure/externs/jquery-1.7.js'
                    ],
                    define: ['goog.DEBUG=false', 'goog.IS_COMPILED=true', 'goog.CHARTS_ONLY_LAYER=false'],
                    charset: 'UTF-8',
                    closure_entry_point: 'tr.ext.chart',
                    warning_level: 'verbose',
                    jscomp_error: [
                        'accessControls',
                        'ambiguousFunctionDecl',
                        'checkDebuggerStatement',
                        'const',
                        'constantProperty',
                        'deprecated',
                        'duplicate',
                        'fileoverviewTags',
                        'globalThis',
                        'internetExplorerChecks',
                        'strictModuleDepCheck',
                        'undefinedNames',
                        'undefinedVars',
                        'unknownDefines',
                        'uselessCode',
                        'invalidCasts',
                        'nonStandardJsDocs',
                        'visibility',
                        'checkVars'
                    ],
                    jscomp_off: [
                        'externsValidation'
                    ],
                    summary_detail_level: 3,
                    output_wrapper: "'(function(){%output%}).call(this);'"
                },
                execOpts: {
                    maxBuffer: 999999 * 1024
                }
            },
            advance: {
                src: [
                    './dev/scripts/third_party/closure/',
                    './dev/scripts/tr/',
                    './build/goog/closure-lib/closure/',
                    './import/novakit_trwebchart/',
                    './scripts/FinancialChart/',
                    './scripts/ChartingShared/',
                    './scripts/BusinessChart/'              
                ],
                dest: './output/scripts/trwebchart.min.js'
            },
            lite: {
                options: {
                    namespaces: ['chart_lite'],
                    compilerOpts: {
                        compilation_level: 'ADVANCED_OPTIMIZATIONS',
                        generate_exports: true,
                        externs: [
                            './build/goog/closure-lib/closure/externs/charts.js',
                            './build/goog/closure-lib/closure/externs/jetQuotes.js',
                            './build/goog/closure-lib/closure/externs/jquery-1.7.js'
                        ],                      
                        charset: 'UTF-8',
                        define: ['goog.DEBUG=false', 'goog.IS_COMPILED=true', 'goog.CHARTS_ONLY_LAYER=false'],
                        closure_entry_point: 'chart_lite',
                        warning_level: 'verbose',
                        jscomp_error: [
                            'accessControls',
                            'ambiguousFunctionDecl',
                            'checkDebuggerStatement',
                            'const',
                            'constantProperty',
                            'deprecated',
                            'duplicate',
                            'fileoverviewTags',
                            'globalThis',
                            'internetExplorerChecks',
                            'strictModuleDepCheck',
                            'undefinedNames',
                            'undefinedVars',
                            'unknownDefines',
                            'uselessCode',
                            'invalidCasts',
                            'nonStandardJsDocs',
                            'visibility',
                            'checkVars'
                        ],
                        summary_detail_level: 3,
                        output_wrapper: "'(function(){%output%}).call(this);'"
                    }
                },
                src: [
                    './dev/scripts/third_party/closure/',
                    './dev/scripts/tr/',
                    './build/goog/closure-lib/closure/',
                    './import/novakit_trwebchart/',
                    './scripts/FinancialChart/',
                    './scripts/ChartingShared/',
                    './scripts/BusinessChart/'
                ],
                dest: './output/scripts/trwebchart.lite.js' 
            },  
            lite_normal: {
                options: {
                    namespaces: ['chart_lite'],
                    compilerOpts: {
                        compilation_level: 'WHITESPACE_ONLY',                   
                        formatting: 'pretty_print',
                        charset: 'UTF-8',
                        closure_entry_point: 'chart_lite',
                        warning_level: 'verbose'
                    }
                },
                src: [
                    './dev/scripts/third_party/closure/',
                    './dev/scripts/tr/',
                    './build/goog/closure-lib/closure/',
                    './import/novakit_trwebchart/',
                    './scripts/FinancialChart/',
                    './scripts/ChartingShared/',
                    './scripts/BusinessChart/'              
                ],
                dest: './output/scripts/trwebchart.lite.normal.js'
            },      
            whitespace: {
                options: {
                    namespaces: ['tr.ext.chart'],
                    compilerOpts: {
                        compilation_level: 'WHITESPACE_ONLY',                   
                        formatting: 'pretty_print',
                        charset: 'UTF-8',
                        closure_entry_point: 'tr.ext.chart',
                        warning_level: 'verbose'
                    }
                },
                src: [
                    './dev/scripts/third_party/closure/',
                    './dev/scripts/tr/',
                    './build/goog/closure-lib/closure/',
                    './import/novakit_trwebchart/',
                    './scripts/FinancialChart/',
                    './scripts/ChartingShared/',
                    './scripts/BusinessChart/'              
                ],
                dest: './output/scripts/trwebchart.js'
            }
        },
        'closureDepsWriter': {
            options: {
                depswriter: './build/goog/closure-tools/ClosureCompiler/bin/build/depswriter.py'
            },
            trwebchart: {
                options: {
                    root_with_prefix: 
                    [
                        '"./import/novakit_trwebchart ../../../../../import/novakit_trwebchart"',
                        '"./scripts/BusinessChart ../../../../../scripts/BusinessChart"',
                        '"./scripts/ChartingShared ../../../../../scripts/ChartingShared"',
                        '"./scripts/FinancialChart ../../../../../scripts/FinancialChart"'
                    ],
                },
                dest: './test_harness/harness-trwebchart-deps.js'
            }
        },
        'compile': {
            message: {
                src: './scripts/Localization/',
                dest1: './output/locale/',
                dest2: './scripts/Localization/dist/'
            }
        },
        'copy': {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: './output/locale/',
                        src: ['**'],
                        dest: './test_harness/locale/'
                    },
                    {
                        expand: true,
                        cwd: './output/scripts/',
                        src: ['**'],
                        dest: './test_harness/scripts/'
                    },
                    {
                        expand: true,
                        cwd: './output/locale/',
                        src: ['**'],
                        dest: './appserver/Web/locale/'
                    },
                    {
                        expand: true,
                        cwd: './output/scripts/',
                        src: ['**'],
                        dest: './appserver/Web/scripts/'
                    }
                ]
            }              
        },
        'compress': {
          main: {
            options: {
              archive: './<%= pkg.sprint %>.zip'
            },
            files: [
               {
                    expand: true, 
                    cwd: './output/',
                    src: ['**', '!docs/**'],
                    dest: './<%= pkg.name %>-v<%= pkg.version %>'
                }
            ]
          }
        }, 
        'karma': {
            dev: {
                configFile: 'unit_test/config/karma.dev.conf.js'
            },
            ci: {
                configFile: 'unit_test/config/karma.conf.js'
            }
        },
        'plato': {
            chart: {
                options : {
                     jshint: {
                        options: {
                            strict: true
                        }
                    },
                    complexity : {
                        trycatch : true
                    },
                    excludeFromFile: ''
                },
                files: {
                    'unit_test/reports/plato': ['test_harness/scripts/trwebchart.js', 'test_harness/scripts/trwebchart.lite.normal.js']
                }
            }
        },
        
        "gitRemoteTag": {
            release: {
                options: {
                    tag: 'waitingToReplace',
                    remote: 'origin', // optional: default value is 'origin', 
                    message: 'Tagged from Jenkins Task-> nova-chart.release.bower', // optional: if not provided it will use the tag as the message, 
                    force: true|false // optional: default value is false 
                },
                src: './'
            }
        }
    });
    //
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-closure-tools');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-plato');
    
    grunt.registerTask('jenkins-ci','Perform all the validation tasks.', ['karma:ci' ,'plato:chart']);
    grunt.registerTask('jshint-report','Perform all the validation tasks.', ['plato:chart']);

    //
    grunt.registerTask('appengine', 'To Run nova-chart in appengine', ['shell:appengine']);
    grunt.registerTask('zip', 'To compress file at output folder to release',['compress']);

    grunt.registerTask('ci', 'Full compile with stuff', [
        'jshint:source',
        'closureBuilder:whitespace',
        'closureBuilder:advance',
        'closureBuilder:lite',
        'closureBuilder:lite_normal',
        'compile:message',
        'closureDepsWriter:trwebchart',
        'shell:padding',
        'copy',
        'jenkins-ci'
    ]);
   
	grunt.registerTask('compile', 'Full compile', [
        'jshint:source',
        'closureBuilder:whitespace',
        'closureBuilder:advance',
        'closureBuilder:lite',
        'closureBuilder:lite_normal',
        'compile:message',
        'closureDepsWriter:trwebchart',
        'shell:padding',
        'copy'
    ]);
    grunt.registerTask('compile:advance', 'Compile with advanced optimizations option.', [
        'jshint:source',
        'closureBuilder:advance',
        'closureDepsWriter:trwebchart',
        'copy'
    ]);
    grunt.registerTask('compile:whitespace', 'Compile with whitespace only option.', [
        'jshint:source',
        'closureBuilder:whitespace',
        'closureDepsWriter:trwebchart'
    ]);
    grunt.registerTask('compile:lite', 'Compile light version chart option.', [
        'jshint:source', 
        'closureBuilder:lite',
        'closureDepsWriter:trwebchart'
    ]);
    grunt.registerTask('compile:lite_normal', 'Compile light with whitespace version.', [
        'jshint:source', 
        'closureBuilder:lite_normal',
        'closureDepsWriter:trwebchart'
    ]);
    grunt.registerTask('tag', 'to tag code from master', function(version){
        if (version === null) {
            grunt.warn('Please pass version as paremeter e.g. "4.37.1"');
        }
        grunt.config.set('gitRemoteTag.release.options.tag', version);
        grunt.task.run( 'gitRemoteTag' )
    });
    grunt.registerTask('compile:message','Build localization message files.', function() {
        grunt.config.requires('compile.message');
        config = grunt.config.get('compile.message');
        var path = require('path');
        // Enumerate thru each language folder
        var messageFiles = {};
        grunt.file.recurse(config.src, function(abspath, rootdir, subdir, filename) {
            if (messageFiles[subdir] === undefined) {
                messageFiles[subdir] = [];
            }
            if(subdir !== 'en' && filename !== 'Html5ChartMessages.json' && filename !== '.gitignore'){
                messageFiles[subdir].push(filename);
            }
        });
        var lang;
        var content;
        var contentLib ;
        var files;
        var file;
        var json;
        var i;

        for (lang in messageFiles) {
            if(lang === 'ja' || lang === 'zh')
            {
                content = '';
                // Loop thru each file in the language folder
                files = messageFiles[lang];
                for (i = 0, len = files.length; i < len; i += 1) {
                    file = files[i];
                    json = grunt.file.read(path.join(config.src, lang) + '/' + file);
                    if(i +1 !== len){
                        content = content.concat(json + '},{');
                    }
                    else{
                        content = content.concat(json);
                    }
                }
                JSON.minify = JSON.minify || require("node-json-minify");
                content = JSON.minify(content);

                content = content.replace("}},{{" , "," );
                // create message localization file distination is 'output' folder
                contentLib = 'window["EikonLocale"]="' + lang + '";window.Html5ChartMessages=' + content ;
                grunt.file.write(config.dest1 + '/trwebchart-message-' + lang + '.js', contentLib+';');

                // destination is 'dist' folder for novakit.js integration
                grunt.file.write(config.dest2 + '/'+lang+'/Html5ChartMessages.json', content );
             }
        }
    });
    //
  //  grunt.registerTask('unittest', 'To Run jasmine TDD', ['shell:unittest']);  

};


