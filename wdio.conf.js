 
const path = require('path');
const argv = require('yargs').argv;
const testCapabilities = require('./utils/capabilities');


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
 
     reporters: [
        'spec',
        [path.resolve(__dirname, './utils/customReporter.js'), {}] // Custom reporter for performance logs
    ],

    waitforTimeout: 15000,
};