const spawn = require('child_process').spawn;

const proxyPy = {
  get(url) {
    return new Promise((resolve, reject) => {
      console.log(`${__dirname}/proxy.py`);
      const pythonProcess = spawn('python', [`${__dirname}/proxy.py`, url]);
      pythonProcess.stdout.on('data', (data) => {
        resolve(data.toString());
        pythonProcess.kill();
      });

      pythonProcess.stderr.on('data', (data) => {
        reject(new Error(`pyxy fails at ${url}: ${data.toString()}`));
        pythonProcess.kill();
      });
    });
  },
};

module.exports = proxyPy;
