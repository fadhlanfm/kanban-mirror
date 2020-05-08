const { User } = require('../models')
const { checkPassword } = require('../helpers/crypt')
const { generateToken } = require('../helpers/token')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static signup (req, res, next) {
        let { email, password } = req.body
        
        User.create({
            email, password
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
    }

    static signin (req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: { email }
        })
        .then(data => {
            if(data) {
                if(checkPassword(password, data.password)){
                    const access_token = generateToken(data)
                    res.set({
                        'access_token': access_token
                    })
                    res.status(200).json({ access_token })
                } else {
                    throw { messages: ['Invalid email/password'], statusCode: 400 }
                }
            } else {
                throw { messages: ['Invalid email/password'], statusCode: 400 }
            }
        })
        .catch(next)
    }

    static notFound (req, res, next) {
        throw { messages: ['Page not found'], statusCode: 404 }
    }

    static googleSignIn (req, res, next) {
        let token = req.body.token;
        let payload = null;
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload();
            return User.findOne({ where: { email: payload.email } })
        }).then(data => {
            if (!data) {
                 return User.create({
                    email: payload.email,
                    password: process.env.DEFAULT_GOOGLE_PASSWORD
                })
            } else {
                return data;
            }
        }).then(data => {
            let newPayload = { id: data.id };
            let token = generateToken(newPayload);
            res.status(200).json({ token });
        }).catch(err => {
            next(err);
        });
    }
}

module.exports = UserController