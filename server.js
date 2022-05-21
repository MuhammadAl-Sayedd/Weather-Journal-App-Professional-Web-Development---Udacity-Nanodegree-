// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const express = require('express')
// Start up an instance of app
const app = express()

/* Dependencies */
const bodyParser = require('body-parser');


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('website'))
// app.use(express.json())

app.listen(8000,() => {
  console.log('server is running')
})


app.post('/saveData' , (req,res) => {
  projectData = req.body
  res.json({msg: 'done'})
})

app.get('/getData',(req,res) => {
  res.json(projectData)
})