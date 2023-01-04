const express = require('express');
const app = express();


app.post('/uploadFile', (req,res)=>{
    console.log(req.body,"<=====>")
})

app.listen(3000, ()=>{
    console.log("Listening to the port 3000...")
})



