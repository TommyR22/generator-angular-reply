module.exports = function ( grunt ) {
    grunt.loadNpmTasks( 'grunt-war' );

    var taskConfig = {
        war: {
            target: {
                options: {
                    war_verbose: true,
                    war_dist_folder: 'build', // Folder path seperator added at runtime.
                    war_name: '<%= title %>',     // .war will be appended if omitted
                    webxml_welcome: 'index.html',
                    webxml_display_name: '<%= title %>',
                    war_extras: [ {filename: '/WEB-INF/jboss-web.xml', data: '<jboss-web> <context-root><%= title %></context-root></jboss-web>'} ]  //it adds jboss-web.xml file,Jboss needs it to read context root
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: ['**'],
                        dest: ''
                    }
                ]
            }
        }
    };

    grunt.initConfig( taskConfig );
};
