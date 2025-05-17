# Appium
Introduction to Appium with simple examples.
This repository contains a set of automated tests for mobile applications

# Prerequisites 
- Node.js (v14 + recommended)
- Appium server installed ('npm install -g appium')
- Android SDK / Xcode (for iOS)
- Necessary device/emulators configured

# Installation
1. Clone the repository.

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the tests:

    ```bash
    npx wdio run wdio.conf.js
    ```

   # Configuration
   - Capabilities and environment variables are customizable
   - Sensitive data (API keys, device info) should be stored in environment variables or separate config files excluded from git
