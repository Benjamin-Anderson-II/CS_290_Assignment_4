/*
 * Write your server code in this file.
 *
 * name:  Benjamin Anderson II
 * email: anderbe2@oregonstate.edu
 */

var port = process.env.PORT || 3000
var http = require("http")
var fs = require("fs")

//create server
var server = http.createServer(function(req, res){

    //make URL work with '/'
    var URL = (req.url==='/'?'/index.html':req.url)

    //readFile at ./public/URL
    fs.readFile('./public/' + URL, function(err, data) {
        //if file exists for name
        if(!err){
            //get file type index
            var dotoffset = URL.lastIndexOf('.')

            //get mimetype from file type
            var mimetype
            switch(URL.substr(dotoffset)){
            case '.html':
                mimetype = 'text/html'
                break
            case '.css':
                mimetype = 'text/css'
                break
            case '.js':
                mimetype = 'application/javascript'
                break
            case '.jpeg':
                mimetype = 'image/jpeg'
                break
            default:
                mimetype = "text/plain"
                break
            }
            res.setHeader('Content-Type', mimetype)
            res.end(data)
        } else {
            res.writeHead(404, "Not Found")
            res.end(fs.readFileSync("./public/404.html", "utf8"));
        }
    })
})

server.listen(port, function() {
    console.log("== Server is listening on port: ", port)
})