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


exports.sendSMS = function(otp, number,res){
    var params = {
        Message: otp, /* required */
        PhoneNumber: number,
    };
    sns.publish(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            res.send(false);
        }
        else {
            console.log(data);
            res.send(true);
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
            console.log(err.response.body);
            return 'err';
        }
        else {
            // console.log(info);
            return 'success';
        }
    });

}
