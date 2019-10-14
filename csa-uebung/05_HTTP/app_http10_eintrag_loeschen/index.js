const http = require('http');
let addresses = require('./data');
const getList = require('./list');
const deleteAddress = require('./delete');

http
  .createServer((request, response) => {
    let responseBody;
    const parts = request.url.split('/');
    if (parts.includes('delete')) {
      addresses = deleteAddress(addresses, parts[2]);
      redirect(response, '/');
    } else {
      response.writeHead(200, { 'content-type': 'text/html' });
      responseBody = getList(addresses);
      response.end(responseBody);
    }
  })
  .listen(8080, () =>
    console.log('Adressbuch erreichbar unter http://localhost:8080'),
  );

function redirect(response, to) {
  response.writeHead(302, { location: '/', 'content-type': 'text/plain' });
  response.end('302 Redirecting to /');
}
