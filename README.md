# Szachy

Cel: chcemy stworzyć stronę szachową pozwalającą na wspólną rozgrywkę dwóch osób.

Narzędzia:
- skorzystamy z `chessboard.js`, `chess.js` i `jQuery` do zaprogramowania podstawowej funkcjonalności strony.
- Klient może zostać umieszczony na github pages
- Do stworzenia strony skorzystamy z visual code
- Będziemy potrzebowali Node.js jako źródło paczek npm
- Pakiet `live-server` będzie nam potrzebny do symulowania aktywności strony 



## Wygląd gotowej strony

Idealny przypadek strony pozwalałby na rozegranie partii szachów pomiędzy dwiema osobami przez internet.

Wymagałoby to przynajmniej namiastki backendu - możliwości pobrania z serwera informacji o stanie rozgrywki i wysłania na serwer swojego ruchu.

## Rozdzielenie projektu na dwie części

### Pierwsza część

1. Zaprojektujemy wygląd strony w css i html.
2. Stworzymy kilka podstron.
3. Włączymy w stronę chessboard.js.
4. Dodamy guziki pozwalające na sterowanie działaniem strony.

### Druga część

1. Znajdziemy API do którego można się bezproblemowo podłączyć i komunikować z innym użytkownikiem.


# Frontend - tutorial

0. Rozruch - ściągnąć [node.js](https://nodejs.org/en/download/). Ściągnąć visual code. Następnie, stworzyć nowy folder na projekt i zainstalować `live-server` komendą:
```
npm i live-server --global
```
1. Stworzyć najprostszy plik `index.html` z tekstem "hello world" i wywołać w konsoli polecenie:
```
live-server
```
2. Plik html powinien zaczynać się deklaracją:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <p>Hello world</p>
</body>
</html>
```

Struktura html składa się z zagnieżdżających się tagów `<element></element>`. Na samym początku pliku piszemy `<!DOCTYPE html>` jako informacja jakiego typu dokument otworzyła właśnie przeglądarka. Nastepnie, tworzymy element `html`.

Html składa się z głowy i ciała - elementu `head` oraz `body`. Wewnątrz `head` wpisujemy wszystkie dodatkowe informacje o stronie - jej tytuł i kodowanie, ale również wszystkie pliki jakie musi dodatkowo ściągnąć przeglądarka aby strona działała poprawnie.

Element `body` zawiera faktyczną zawartość strony - cały tekst i strukturę jaka znajduje się na stronie.

Wewnątrz body używamy kilku podstawowych typów elementów:
- `<div>...</div>` - sekcja strony (najbardziej popularne)
- `<p>tekst</p>` - paragraf
- `<h1>tytuł</h1>` - (od h1 do h6) nagłówek (header)
- `<a href="...">link</a>` - link do podstrony lub innego serwisu

3. Utworzona strona będzie wyglądała paskudnie - z tego powodu że korzysta z podstawowego stylu strony. Aby go rozwinąć, należy stworzyć arkusze stylów CSS - na razie umieścimy je wewnątrz głównego pliku.

```html
<head>
    ...
    <style>
        div{
            color: red;
            font-family: Helvetica;
        }
    </style>
</head>
```

Przy zarządzaniu CSS należy poznać dodatkowe własności elementów html - głównie **klasy** i **identyfikatory**.

Motywacja: powiedzmy że chcemy ustalić styl konkretnego typu elementów - np. tworzymy jednocześnie elementy `div` odpowiadające za panel boczny jak i elementy `div` za główny artykuł. Chcemy by główny artykuł miał białe tło, natomiast panel boczny był barwy zielonej. Do tego tworzymy osobne klasy elementów:

```html
<div class="article">
</div>
```

Wewnątrz arkuszy stylów odwołujemy się do klasy w następujący sposób:

```html
<style>
    .article{
        color: red;
        background:black;
    }
</style>
```

Obok klas mamy również identyfikatory - zapisywane w postaci `<div id="main-element"></div>` i wywoływany w css jako:

```html
<style>
    #main-element{
        color:blue;
    }
</style>
```

Identyfikator można rozumieć jako unikalną klasę która pojawia się tylko raz w dokumencie. Klasa pojawia się wiele razy i może występować w grupie kilku klas przy danym elemencie.

Najpopularniejsze elementy css:

- `font-family` - typ używanych czcionek
- `font-size` - rozmiar czcionek
- `text-align` - położenie tekstu
- `color` - barwa tekstu w elemencie
- `background` - tło elementu
- `margin` - marginesy elementu
- `padding` - wypełnienie elementu (wewnętrzne marginesy)
- `width` - szerokość elementu
- `height` - wysokość elementu
- `border` - obramowanie elementu
- `shadow` - cień elementu

4. Skrypty - trzecim elementem ze "świętej trójcy web developmentu" obok html i css jest javascript - język programowania używany domyślnie w przeglądarkach do opisywania wykonywanych działań. Na przykład, skrypt:

```html
<script>
    alert('hello world')
</script>
```

Wywoła na ekranie tekst "hello world".

Jeśli stworzymy następujący kod:
```html
    <script>
        function fun(e){
            if(e.target.textContent==='abc'){
            e.target.textContent = "xyz";
        }
            else{
                e.target.textContent = "abc";
            }
        }
    </script>
    
    <button onclick="fun(event)">abc</button>
```

przyciśnięcie guzika wywoła akcję zmiany jego tekstu.

5. Implementacja `chessboard.js`. Do elementu `<head>` dodamy następujące fragmenty:

```html
<link rel="stylesheet"
href="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css"
integrity="sha384-q94+BZtLrkL1/ohfjR8c6L+A6qzNH9R2hBLwyoAfu3i/WCvQjzL2RQJ3uNHDISdU"
crossorigin="anonymous">
<script
src="https://code.jquery.com/jquery-3.5.1.js"
integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
crossorigin="anonymous"></script>
<script src="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js"
integrity="sha384-8Vi8VHwn3vjQ9eUHUxex3JSN/NFqUg3QbPyX8kWyb93+8AC/pPWTzj+nHtbC5bxD"
crossorigin="anonymous"></script>
```

Dodatkowo musimy ściągnąć archiwum [chess.zip](./chess.zip) by pionki poprawnie się wyświetlały.

Ostatnim fragmentem będzie wstawienie następującego fragmentu kodu:

```html
<body>
    ...
    <div id="board2" style="width: 400px"></div>
    <button id="startBtn">Start Position</button>
    <button id="clearBtn">Clear Board</button>

    <script>
        var board2 = Chessboard('board2', {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true
        })

        $('#startBtn').on('click', board2.start)
        $('#clearBtn').on('click', board2.clear)
    </script>
```

Dodatkowe przykłady (np. dodanie blokady na nielegalne ruchy lub gra z komputerem) są do znalezienia na stronie: [chessboardjs.com](https://chessboardjs.com/examples).