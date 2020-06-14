# Lekcja 2

Założenia - chcemy przygotować naszą stronę z lamami do uploadowania na stronę internetową. Chcielibyśmy uzyskać jakieś połączenie z drugim komputerem przez jakieś gotowe api.

1. Javascript. Praktycznie nie napisaliśmy żadnego kodu w javascripcie, a chcielibyśmy jednak coś sensownego zrobić.
2. Kolejne rozwinięcie zabaw z CSS.
3. Szersza zabawa z modułem chessboard.js
4. Moduł w node.js.

## Express

Stworzymy najprostszy serwer w express js. Serwer będzie:
1. Hostował strony html
2. Hostował obrazki ze static
3. Obsługiwał żądania API.

## Początek

1. Instalujemy Express oraz Body-Parser:
```
npm install express --save
```

2. Tworzymy zalążek aplikacji:

```js
var express = require("express");

var app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/img/chesspieces/wikipedia', express.static('img/chesspieces/wikipedia'))
```




```
npm install --save body-parser
```