var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(index);
  res.end();
}).listen(8000);

console.log("File can be seen at http://localhost:8000/")