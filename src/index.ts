const express = require('express');
const multer= require("multer");
var streamingS3 = require('streaming-s3'),
fs = require('fs');


const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/')
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype=="image/jpeg" || file.mimetype=='image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
};

const upload = multer({storage:storage,fileFilter:fileFilter});
const app = express();



app.post('/uploadFile', upload.single('image'), (req, res) => {
    try {
        console.log(req.file,"<=====>")
        var fStream = fs.createReadStream('./uploads/' + 'capAmerica.jpg');
        
        let accessKey = "AKIAZ2OL7XHFDX2CFBFV";
        let secretKey= "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"
        
        var uploader = new streamingS3(fStream, {accessKeyId: accessKey, secretAccessKey: secretKey},
            {
                Bucket: 'file-mover-prototype-bucket',
                Key: 'image',
                ContentType: 'image/jpg'
            }
            );
            
            uploader.on('data', function(bytesRead) {
                console.log(bytesRead, ' bytes read.');
            });
            
            uploader.on('part', function(number) {
                console.log('Part ', number, ' uploaded.');
            });
            
            // All parts uploaded, but upload not yet acknowledged.
            uploader.on('uploaded', function(stats) {
                console.log('Upload stats: ', stats);
            });
            
            uploader.on('finished', function(resp, stats) {
                console.log('Upload finished: ', resp);
            });
            
            uploader.on('error', function(e) {
                console.log('Upload error: ', e);
            });
            
            uploader.begin();
        } catch (error) {
            console.log(error)
        }
    })
    
    app.listen(3000, ()=>{
        console.log("Listening to the port 3000...")
    })
    
    
    
    