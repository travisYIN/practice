var ora = require('ora');
var shell = require('shelljs');
var spinner = ora('for release...\n');
spinner.start();

shell.exec('git pull origin')
shell.exec('git add -A');
shell.exec('git commit');
shell.exec('git push origin')
spinner.stop();
