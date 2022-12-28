const { response } = require("express");
const express = require("express");
const nodemailer = require("nodemailer")
const app = express();
const port = 5000;


function sendMail (){
    return new Promise((resolve, reject)=>{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'gmail@gmail.com',
                pass: ''
            }
        })
        const mail_configs = {
            from: '',
            to: '',
            subject: '',
            html: ``
        }
        transporter.sendMail(mail_configs, function(error, info){
            if(error){
                console.log(error);
                return reject({message: `An error has occured`});
            }
            return(resolve({message: "Email send succesfuly"}));
        })
    })
}

app.get("/", (req, res)=>{
    sendMail()
    .then(response => res.send(response.message))
    .catch(error=> res.status(500).send(error.message))
})

app.listen(port);

