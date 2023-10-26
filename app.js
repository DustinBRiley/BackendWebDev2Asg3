const express = require('express')
const path = require("path")
const app = express()
const cors = require("cors")
const port = 3000
const {logger} = require('./middleware/logEvents') //get just the logger function from logEvents.js
const errorHandler = require('./middleware/errorHandler')

app.use(logger) // uses logger function from logEvents.js

const whitelist = [ // cors whitelist
  "http://localhost:3000"
]

const corsOptions = { // cors configuration (what to allow and what not to)
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    }
    else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions)) // use cors
app.use(express.urlencoded({extended: false})) // use form data
app.use(express.json()) // use json req decoder
app.use(express.static(path.join(__dirname, "public"))) // use public folder
app.use('/', require('./routes/root')) // route localhost:3000/ to routes/root.js
// app.use(check)
app.use('/api', require('./routes/api/contacts')) // route localhost:3000/constacts to routs/api/contacts.js

app.all('*', (req, res) => {
  res.status(404)
  if(req.accepts("html")) { res.sendFile(path.join(__dirname, "views", "404.html")) }
  else if(req.accepts("json")) { res.json({ error: "404 Not Found"})}
  else { res.type("txt").send("404 Not Found")}
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});