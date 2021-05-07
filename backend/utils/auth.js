// ============================================================
// This module contain all JWT related authentication methods
// ============================================================
const file = "auth.js"
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

JWT_EXPIRE_TIME     = eval(process.env.JWT_EXPIRE_TIME); // in seconds
COOKIE_EXPIRE_TIME  = eval(process.env.COOKIE_EXPIRE_TIME)*1000 // in miliseconds

async function hash_passwd(password){
    try{
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        return await bcrypt.hash(password, salt);
    } catch(err){
        console.log(file, ": hash_passwd :",err);
    }
}

function signAccessToken(userid, usertype){
    // this is payload of JWT token to be set on cookie
    // can be seen by everyone so DON'T keep secret information!!
    const payload = {id:userid, type:usertype}
    const options = {
        expiresIn: JWT_EXPIRE_TIME, // time in seconds
    }
    return JWT.sign(payload, process.env.SECRET, options);
}

/* "jwt" cookie is set for only server-side use (i.e. httpOnly)
    for client-side user we set another cookie "jwt-helper" */
function set_jwt_token(res, id, type){
    const token = signAccessToken(id, type);
    res.cookie("jwt", token, {
        httpOnly:true,
        // secure:true,
        maxAge: COOKIE_EXPIRE_TIME,
    });
    res.cookie("jwt-helper", token, {
        // secure:true,
        maxAge: COOKIE_EXPIRE_TIME,
    });
}

// to unset cookie => make them empty with 1ms time
function unset_jwt_tokens(res){
    res.cookie('jwt', "", {maxAge:1});
    res.cookie('jwt-helper', "", {maxAge:1});
}

function decodeToken(token){
    return JWT.decode(token)
}

// middleware for authenticating clients
function requireAuth(req, res, next){
    const token = req.cookies.jwt;
    if(token){
        JWT.verify(token, process.env.SECRET, (err, decodedToken)=>{
            if(err){
                console.log(file, err.message, "Unauthorized access denied1");
                res.send({error:"Unauthorized access denied1"})
            }else{
                // console.log(file, decodedToken);
                res.locals.dtoken = decodedToken;
                next();
            }
        });
    }else{
        console.log(file, ": Unauthorized access denied2")
        res.send({error:"Unauthorized access denied2"})
    }
}

module.exports = {
    hash_passwd,
    signAccessToken,
    set_jwt_token,
    requireAuth,
    decodeToken,
    unset_jwt_tokens,
}
