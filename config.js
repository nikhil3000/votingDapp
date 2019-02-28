const mongo_id = process.env.MLABUSER;
const mongo_pwd = process.env.MLABPWD;
let mongoURI = '';

if(process.env.NODE_ENV === 'production'){
		mongoURI = 'mongodb://' +mongo_id+':'+mongo_pwd+'@ds137703.mlab.com:37703/sentient'
}
else
{	
		mongoURI = 'mongodb://localhost:27017/votingDapp'
}

module.exports = {
    db : {
        mongoURI: mongoURI
    },
    googleCred :{
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost:5000/auth/google/callback"
       }
}