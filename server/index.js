/* 

*/

//====NPM MODULES
const express = require('express')
const app = express()
const session = require('express-session')
require('dotenv').config()

const wordsApiRouter = require('./api/words')

const PORT = process.env.PORT || 8080

app.set('trust proxy', 1) // trust first proxy

app.use(express.json())
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // https://stackoverflow.com/questions/35066462/req-session-in-express-session-not-persisting
    // cookie: { secure: true, maxAge: 60000 }
    cookie: {
      secure: false,
      maxAge: 60000
    }
  })
)

app.use('/api/words', wordsApiRouter)

//====SERVER CONNECTION
app.listen(PORT, function () {
  console.info('Server listening on port ' + PORT)
})
