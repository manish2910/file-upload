const express = require('express');
const fileUpload = require('express-fileupload');
// const ejs = require('ejs');
// const path = require('path');

const app = express();
app.use(fileUpload());

app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/upload',(req,res)=>{
    if(req.files === null){
        return res.render('index',{
                           msg:'Error: No file selected'
                       });
    }

    const file = req.files.myImage;
    
    file.mv(`${__dirname}/public/uploads/${file.name}`,err=>{
        if(err){
            return res.render('index',{
                msg:err
            })
        }

        res.render('index',{
            msg:'File Uploaded!',
            file:`/uploads/${file.name}`
        })
    });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})