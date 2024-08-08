require('dotenv').config()
const Pepesan = require("pepesan");
const router = require("./router");
const { ALLOWED_NUMBERS } = process.env;

(async () => {
    const config = {
        allowedNumbers: null,
        browserName: 'Dewakoding App',
        sessionPath: './example/session',
        db: {
            path: './example/data.sqlite',
            username: 'mqad21',
            password: '4dm!n'
        }
    }
    const pepesan = Pepesan.init(router, config)
    await pepesan.connect()
})()    