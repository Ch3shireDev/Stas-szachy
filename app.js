var express = require("express");
const bodyParser = require('body-parser');

var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser);

app.listen(4200, () => {
    console.log("Server running on port 4200");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

let fen = null;
let color = null;

app.post("/api", (req, res) => {
    fen = req.body.fen;
    color = req.body.color;
    res.sendStatus(200);
});

app.get("/api", (req, res) => {
    res.send({ fen: fen, color: color });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/img/chesspieces/wikipedia', express.static('img/chesspieces/wikipedia'))
    // app.get('/img/chesspieces/wikipedia')