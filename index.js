const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const ConnectSessionKnex = require("connect-session-knex")(session)
const usersRouter = require("./users/users-router")
const db = require("./database/config")

const server = express()
const port = process.env.Port || 9000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "watch me work, shhhhh",
    store: new ConnectSessionKnex({
        knex: db,
        createtable: true, 
    })

}))

server.use(usersRouter)

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something is off",
    })
})

server.listen(port, () => {
    console.log(`Running at http://localhost:{port}`)
})