
const express = require('express');
const multer= require("multer");
const uploadStream = require("./controller/uploader.ts")


const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/')
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype=="application/octet-stream" || file.mimetype=='image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
};

const upload = multer({storage:storage,fileFilter:fileFilter});
const app = express();



app.post('/uploadFile', upload.single('image'), (req, res) => {
    try {
        console.log(req.body.url,process.env.ACCESS_KEY,"<=====>")
         uploadStream(req.body.url)
        } catch (error) {
            console.log(error)
        }
    })
    
    app.listen(3000, ()=>{
        console.log("Listening to the port 3000...")
    })
    
    
    
    