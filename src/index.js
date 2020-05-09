const nodemailer = require('nodemailer');
const app = require("./server");

// nodemailer options
let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, 
    auth: {
       user: process.env.transporterMail, 
       pass: process.env.transporterPass 
     }
});
 
app.post('/api/mail', (req, res) => {
    let mailData = req.body;
    console.log('lol');
    //verificar validez de la token en la BD (si no existe return send.status(401))
    let mailOptions = {
       from: 'Fletes Ya! <no-responder@fletesya.cl>', 
       to:  process.env.personalMail, 
       subject: `Nuevo mensaje de ${mailData.mail}`,
       text: 'Nuevo mensaje',
       html: ` 
    
       <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="background-color:#f5f5f5;">     
            <div style="padding: 20px; max-width:400px; background-color:white;"> 
            <h2>Nuevo mensaje de ${mailData.mail}</h2>
            <hr style="border: 1px dashed #f39c12; width: 150px; margin: auto; margin-top: 5%; margin-bottom: 5%;">
             </div>
                <p style="font-size:12px; color:gray;">
                   ${mailData.message}
                </p>
            </td>
        </tr>
       </table>
       ` 
     };  
 
    transporter.sendMail(mailOptions, function (err, info) {
       if(err)  return res.status(401).json({error: err})
       return res.status(200).json({
          message: info
       });
    });
 
});

//Iniciar el servidor
app.listen(app.get('port'),() => {
    console.log('server on port ', app.get('port'));

});