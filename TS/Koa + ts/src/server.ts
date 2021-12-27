const app = require('./app');

const server = app.listen(3009, () => {
  console.log('Server is running at http://localhost:3009');
  console.log('Press CTRL-C to stop \n');
});

module.exports = server;