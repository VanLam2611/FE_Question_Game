let express = require('express');
let app = express();
let port = process.env.PORT || 3000;


app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})
app.listen(port);

console.log('RESTful API server started on: ' + port);