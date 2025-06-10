var http = require('http');

http.createServer(function(request, response){
    response.end("Olá, Mundo!")
}).listen(8000);

console.log("O servidor está em ação!")