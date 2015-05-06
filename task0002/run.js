var http = require('http'),
      fs = require('fs'),
      path = require('path'),
      url = require('url');
      
function serveStaticFile(res, pathName) { 
    
    var contentType, filePath;
    var extName = path.extname(pathName);
    
    filePath = __dirname + pathName; 
    switch(extName) {
        case '.js': 
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.html':
            contentType = 'text/html';
        default:
            break;
    }
    
    fs.readFile(filePath, function(err, data){
        if(err){
            res.writeHead(500, { 'Content-Type': 'text/plain' }); 
            res.end('500 - Internal Error2');
        } else {
            res.writeHead(200, {"Content-Type": contentType});
            res.end(data, 'utf-8');
        }
    });
}

http.createServer(function(req,res){
    var path = url.parse(req.url).pathname;
    if(path === '/getstring'){
        serveStaticFile(res, '/test.json');
    } else if(path === '/' || path === '/index'){
        serveStaticFile(res, '/task0002_4.html');
    } else {
        serveStaticFile(res, path);
        }
    }).listen(3000);
console.log('Server started on localhost:3000; press Ctrl-C to terminate....');