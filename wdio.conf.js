 
const path = require('path');
const argv = require('yargs').argv;
const testCapabilities = require('./utils/capabilities');
const commandTimings = {};


exports.config = {
    runner: 'local',
    specs: [path.join(__dirname, './tests/spec/**/*.js')],
    maxInstances: 2, 
    capabilities: testCapabilities.filter(capability => {
        const platform = argv.platform;
        if (platform) {
            return capability['wdio:capabilities'].platform === platform;
        }
        return true;
    }),

    // Appium Configuration
    services: ['appium'], //open Appium server 
    port: 4724, // default port for Appium server
    path: '/wd/hub',
    logLevel: 'error',

    // Framework and Hooks
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
 
    reporters: ['spec'],
 
    waitforTimeout: 15000,

    // 👉 Add these hooks to track Events API:
    //
beforeCommand: function (commandName, args) {
    const start = Date.now();
    commandTimings[commandName] = { start, args };
    console.log(`[COMMAND] ${commandName} → ${JSON.stringify(args)}`);
},

afterCommand: function (commandName, args, result, error) {
    const end = Date.now();
    const duration = end - commandTimings[commandName].start;
    console.log(`[RESULT] ${commandName} ← Duration: ${duration} ms`);
}
};