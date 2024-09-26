const grunt = require("grunt")

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production:{
                options:{
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },watch:{
            less:{
                files:['src/styles/**/*.less'],
                tasks:['less:development']
            },
            html:{
                files:['src/index.html'],
                tasks:['replace:dev']
            }
        },
        uglify:{
            target:{
                files:{
                    'dis/scripts/main.min.js':'src/scripts/main.js'
                }
            }
        },
        
        replace:{
            dev:{
                options:{
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['src/index.html'],
                        dest:'dev/'
                    }
                ]
            }
        },

        replace:{
            dist:{
                options:{
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['prebuild/index.html'],
                        dest:'dist/'
                    }
                ]
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files:{
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        sass:{
            dist:{
                options:{
                    style:'compressed'
                },
                files:{
                    'main.css': 'main.scss'
                }
            }
        },
        concurrent:{
            target:['olaGrunt', 'less', 'sass','tarefaDemorada']
        }
    })
    grunt.registerTask('tarefaDemorada', function(){
        const done = this.async();
        setTimeout(function() {
            console.log('olá Grunt');
            done();
        },3000);
    }) 

grunt.registerTask('olaGrunt', function(){
    const done = this.async();
    setTimeout(function() {
        console.log('olá Grunt');
        done();
    },3000);
}) 
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('default',['watch']);
    grunt.registerTask('build',['less:production','htmlmin:dist','replace:dist','clean','uglify']);
}
