var execSync = require('child_process').execSync;

console.log('Start server...');
execSync('npm start');

console.log('Start Electron...');
execSync('npm run devApp');
