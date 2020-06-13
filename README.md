# ReactMonitor
Quickly visualize React's component tree performance for improved onboarding and debugging

## What does it do
By using the ReactMonitor Chrome DevTool, beginning and experienced developers alike are able to get a visual representation of an existing codebase that they are working on. Built with React, this tool will dynamically traverse the fiber root object behind the scenes, displaying state, props, render times and the type of components on the page.

> Placeholder for screenshot/gif

## How to install and run
To be able to use the application, users can:
- Download the 'ReactMonitor' Google Chrome extension from [The Chrome Web Store](https://chrome.google.com/webstore/detail/reactmonitor)
- Run the NPM package in your own codebase by following these steps:
  - Install the package 
  `npm install reactmonitor`
  - Require/Import the package
  `import reactMonitor from 'reactmonitor'`
  or
  `const reactMonitor = require('reactmonitor')`
  - Invoke React Monitor with an input of the DOM element that you are rendering the React Element into
    ```
    const container = document.querySelector('#root');
    `reactDOM.render(<App />, container);`
    reactMonitor(container);
    ```
- Navigate to the domain of your React application that you will be running React Monitor on
- Open your Chrome Developer Tools and select React Monitor
  > Placeholder for Screenshot/Gif
- You are now able to view state changes on your application in real time!




