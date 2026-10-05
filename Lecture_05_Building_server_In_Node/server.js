import http from 'http'

const server = http.createServer((req,res)=>{
    res.end("you requested for something from a crome url by localhost:1000")
});

const port = 1000;
// server.listen(port,()=>console.log(`server is running on port ${port}`))
server.listen(port,()=>console.log("server is running on port",port))
