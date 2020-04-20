// These are our required libraries to make the server work.

const express = require('express');
const fetch = require('node-fetch');
const sqlite3 = require('sqlite3').verbose(); // We're including a server-side version of SQLite, the in-memory SQL server.


const app = express();
const port = process.env.PORT || 3000;

const db = new sqlite3.Database(':memory:', (err) => {
  if(err){
    return console.error('err.message');
  }
  console.log('Connected to the in-memory SQL database');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



function processDataForFrontEnd(req, res) {
  const baseURL = ''; // Enter the URL for the data you would like to retrieve here

  // Your Fetch API call starts here
  // Note that at no point do you "return" anything from this function -
  // it instead handles returning data to your front end at line 34.
    fetch(baseURL)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        res.send({ data: data }); // here's where we return data to the front end
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/error');
      });
}

// Syntax change - we don't want to repeat ourselves,
// or we'll end up with spelling errors in our endpoints.
// 
app.route('/api')
  .get((req, res) => {processDataForFrontEnd(req, res)})
  .post((req, res) => {
    console.log("/api post request", req.body);
    res.send('your request was successful'); // simple mode
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
