// const express = require('express')
// // const bodyParser = require('body-parser')
// const path = require('path')
// const app = express()
// app.use(express.static(path.join(__dirname, 'build')))

// app.get('/ping', function (req, res) {
//   return res.send('pong')
// })

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Server is listening on port ${process.env.PORT || 8080}`)
// })

/* 
App deployed in heroku here: https://manhang-irv.herokuapp.com/
*/

//====NPM MODULES
const express = require('express')
const app = express()
const session = require('express-session')
require('dotenv').config()

const wordsApiRouter = require('./api/word')

const PORT = process.env.PORT || 8080

app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // https://stackoverflow.com/questions/35066462/req-session-in-express-session-not-persisting
    // cookie: { secure: true, maxAge: 60000 }
    cookie: { secure: false, maxAge: 60000 }
  })
)

app.use(express.json())
app.use((req, res, next) => {
  console.log('BASE URL: ', req.baseUrl)
  next()
})

app.use('/word', wordsApiRouter)

//====SERVER CONNECTION
app.listen(PORT, function (a, b, c, d) {
  console.log('Server listening on port ' + PORT)
})
