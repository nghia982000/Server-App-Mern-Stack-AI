const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const db = require('./configDB')
const route = require('./routes')
const cors= require('cors')
const fileUpload=require('express-fileupload')
const port = process.env.PORT || 5000
//connect with database
db.connect()

app.use(morgan('combined'))
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(fileUpload({
  useTempFiles:true
}))

route(app)


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})