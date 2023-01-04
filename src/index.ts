const express = require('express');
const multer= require("multer");

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



app.post('/uploadFile', upload.single('image'), (req,res) => {
    console.log(req.file,"<=====>")
})

app.listen(3000, ()=>{
    console.log("Listening to the port 3000...")
})



