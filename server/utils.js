var AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-1" });
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var sns = new AWS.SNS({ apiVersion: '2010-03-31' });
var setTransactionalSMSParams = {
    attributes: {
        DefaultSMSType: "Transactional",
    },
}

sns.setSMSAttributes(setTransactionalSMSParams, function (err, data) {
    if (err) {
        console.log("SNS set sms type to transactional failed");
        console.log(err);
    }
    else {
        console.log("SNS set sms type to transactional success")
        console.log(data);
    }
})


exports.sendSMS = function(otp, number){
    var params = {
        Message: otp, /* required */
        PhoneNumber: number,
    };
    sns.publish(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            //res.send(false);
        }
        else {
            console.log(data);
            //res.send(true);
        }
    })
}


exports.email = function(to,otp ) {
    var mailOptions = {
        from: 'automated.nikhilyadav3000@gmail.com',
        to: to,
        subject: 'OTP for IDF VotingDapp',
        text: otp
    };

    sgMail.send(mailOptions, function (err, info) {
        if (err) {
            console.log('err');
            console.log(err);
            return 'err';
        }
        else {
            console.log('success');
            return 'success';
        }
    });

}


// app.get('/sendEmail', (req, res) => {

//     var options = {
//         method: 'POST',
//         url: 'https://api.sendgrid.com/v3/mail/send',
//         headers:
//         {
//             'content-type': 'application/json',
//             authorization: 'Bearer 
//         },
//         body:
//         {
//             personalizations:
//                 [{
//                     to: [{ email: 'nikhilyadav3000@gmail.com', name: 'Nikhil Yadav' }],
//                     subject: 'Hello, World!'
//                 }],
//             from: { email: 'manav@indiadappfest.com', name: 'Manav' },
//             reply_to: { email: 'manav@indiadappfest.com', name: 'manav' },
//             template_id: 'd-3fcdb17c04be40a89db48026918abbb3'
//         },
//         json: true
//     };

//     request(options, function (error, response, body) {
//         if (error) throw new Error(error);

//         console.log(body);
//     });
// })
