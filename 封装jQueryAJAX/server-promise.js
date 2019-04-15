var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号，如： \nnode server.js 8888')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /********** *************/

if(path === '/'){
  var string = fs.readFileSync('./index.html','utf-8')
  var acount = fs.readFileSync('./db','utf-8')
  string = string.replace('&&&acount&&&',acount)

  response.setHeader('Content-Type','text/html;utf-8')
  response.write(string)
  response.end()
}else if(path === '/pay'){
  let newAcount = fs.readFileSync('./db','utf-8')-1
  fs.writeFileSync('./db',newAcount)
  response.setHeader('Content-Type','text/json;utf-8')
  response.write(`{
    "acount":${newAcount}
  }`)
  response.end()
}else{
  response.statusCode = 404
  response.end()
}
  /*********** ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)