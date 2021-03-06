var mockery = require('mockery');
mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
});

mockery.registerMock('vsts-task-lib/task', {
    writeFile: function (file, data, options) {
        console.log("web.config contents: " + data);
    },
    debug: function(message: string) {
        console.log("##[debug]: " + message);
    }
});

mockery.registerMock('fs', {
    readFileSync: function (path, format) {
        return "{NodeStartFile};{Handler}"
    }
});

var generateWebConfig = require('webdeployment-common/generatewebconfig.js');
generateWebConfig.generateWebConfigFile('node',
    'TemplatePath/node',
    {
        "Handler": {
            "value": "iisnode"
        },
        "NodeStartFile": {
            "value": "server.js"
        }
    });

