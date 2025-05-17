const path = require('path');
const getPort = (base, index) => base + index;

const capabilities = [
     {
            "platformName": 'iOS',
            'appium:deviceName': 'iPhone 16',
            'appium:platformVersion': '18.3',
            'appium:automationName': 'XCUITest',
            "wdio:capabilities": {
                platform: 'ios'
            },
             "appium:app" : "path/to/your/app.app",
            "appium:usePrebuiltWDA": true, 
            "appium:showXcodeLog": true, 
          }, 
          {
            "platformName": "Android",
            "appium:deviceName": "Medium_Phone_API_35",
            "appium:platformVersion": "15.0",
            "appium:automationName": "UiAutomator2",
            "appium:app": path.join(__dirname, '..', 'app', 'debug-app.apk'), // or if you don't have an apk in a specific directory like "app" , write just "path/to/your/app.apk"
            "wdio:capabilities": {
                platform: 'android'
            }
        }
];
module.exports = capabilities;

