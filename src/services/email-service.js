'use strict';

const path = require("path")
const ejs = require('ejs');

const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(global.config.sendgridKey);

const  send = (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: global.config.email_sender,
        subject: subject,
        html: body
    });
}

exports.sendEmailWelocme= (content) =>{
    ejs.renderFile(
        path.join(__dirname,"/../views/email/welcome.ejs"),
        {data:[content]}
        ,(err, html) => {
            if(!err) send(content.email,"Bem vindo ao Node Store", html);
        });
}