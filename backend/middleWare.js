
var cors = require('cors')

const handleCors = () => {
    return cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
        credentials: true
    })
}

const AutheticateAdmin = async (req, res, next) => {

    console.log("Admin middleware")
    const uname = req.body.uname
    const pass = req.body.pass

    // console.log(uname.length, pass.length)


    if (uname.length < 5) {

        res.status(400).send(" Username is wrong ");
        console.log("Wrong username")
    }

    else if (pass.length < 5) {
        res.status(400).send(" Password is wrong ");
        console.log("Wrong password")
    }

    else
        next()
}

module.exports = { handleCors, AutheticateAdmin }