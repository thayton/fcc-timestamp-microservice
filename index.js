const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

// The API endpoint is GET [project_url]/api/timestamp/:date_string?
app.get('/api/timestamp/:date_string?', (req, res) => {
    let dateString = req.params.date_string;
    let isValid = (d) => !isNaN(d.getTime());
    let isNum = (n) => !isNaN(Number(n));
    
    if (dateString !== undefined && isNum(dateString)) {
        dateString = parseInt(dateString, 10);
    }

    let date = (dateString === undefined)
        ? new Date()
        : new Date(dateString);
    
    // If the date string is valid the api returns a JSON having the structure
    // {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
    if (isValid(date)) {
        res.send({
            'unix': date.getTime(),
            'utc': date.toUTCString()
        });
    } else {
        // If the date string is invalid the api returns a JSON having the structure 
        // {"error" : "Invalid Date" }
        res.send({ 'error': 'Invalid Date' });
    }
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };
