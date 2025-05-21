const WDIOReporter = require('@wdio/reporter').default; // Import the default reporter from WebdriverIO
const fs = require('fs'); // Import the file system module
const path = require('path'); // Import the path module

class PerformanceReporter extends WDIOReporter {
  constructor(options = {}) {
    super(options);
    this.logs = [];
  }

  onBeforeCommand(command) {
    // Store the start time and command details
    this._currentCommandTime = {
      commandName: command.commandName,
      startTime: Date.now(),
      args: command.args
    };
  }

  onError(error) {
  this.logs.push({
    name: 'error',
    error: error.message || error,
    timestamp: new Date().toISOString()
  });
}

  onAfterCommand(command) {
    if (!this._currentCommandTime) return; // Ensure we have a command to log
    const endTime = Date.now();
    const duration = endTime - this._currentCommandTime.startTime;
    const commandName = command || 'unknown';
    const args = command.args || [];

    this.logs.push({
      name: commandName,
      args: args,
      result: command.result,
      error: command.error || null,
      duration: duration + ' ms',
      timestamp: new Date().toISOString(),
    }); // Store the command log

    this._currentCommandTime = null; // Reset the current command info
  }

  onRunnerEnd() {
    const outputDir = this.outputDir || './performance-logs';

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    } // Create the output directory if it doesn't exist

    const filePath = path.join(outputDir, `session-${Date.now()}.json`);
    fs.writeFileSync(filePath, JSON.stringify(this.logs, null, 2), 'utf-8'); // Write the logs to file
    console.log(`💾 Detailed performance logs saved to ${filePath}`);
  }
}

module.exports = PerformanceReporter;