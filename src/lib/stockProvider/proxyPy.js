const spawn = require('child_process').spawn;

const proxyPy = {
  get(url) {
    return new Promise((resolve, reject) => {
      let html = '';
      let state = 'PROXYPY_WAIT';

      const pythonProcess = spawn('python', [`${__dirname}/proxy.py`, url]);
      pythonProcess.stdout.on('data', (data) => {
        const strBuf = data.toString().trim();

        switch (state) {
          case 'PROXYPY_WAIT':
            if (strBuf === 'PROXYPY_START') {
              state = 'PROXYPY_START';
            }
            break;

          case 'PROXYPY_START':
            if (strBuf === 'PROXYPY_END') {
              pythonProcess.kill();
              resolve(html);
            } else {
              html += strBuf;
            }
            break;
        }
      });

      pythonProcess.stderr.on('data', (data) => {
        pythonProcess.kill();
        reject(new Error(`proxyPy fails at ${url}: ${data.toString()}`));
      });
    });
  },
};

module.exports = proxyPy;
