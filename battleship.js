alert("Приветствую вас в моей игре морской бой. Правила игры очень просты: вводи в поле английские заглавные буквы(A,B,C,D,E,F,G),следом за буквой должна быть цифра( от 0 до 6), к примеру: A5,D2,F1. При неправильном введении координат корабля программа выдаст ошибку.Удачи!")
var view = {
    displayMessaga: function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipSunk: 0,
    ships: [
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] }
    ],
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessaga("Попал!");
                if (this.isSunk(ship)) {
                    view.displayMessaga("Вы потопили мой корабль");
                    this.shipSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessaga("Промазал!");
        return false;
    },
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    },
    generalShipsModels: function () {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.colision(locations));
            this.ships[i].locations = locations;
        }
    },
    generateShip: function () {
        var direction = Math.floor(Math.random() * 2);
        var row, col;

        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocation = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocation.push(row + "" + (col + i));
            } else {
                newShipLocation.push((row + i) + "" + col);
            }
        } return newShipLocation;
    },
    colision: function (locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        } return false;
    }
};

var controller = {
    guesses: 0,
    processGuess: function (guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipSunk === model.numShips) {
                view.displayMessaga('Вы потопили все корабли за ' + this.quesses + ' попытки');
            }
        };
    }
}

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
        alert("Упс, пожалуйста, введите корректную букву и цифру на доске.");
    } else {
        firsChair = guess.charAt(0);
        var row = alphabet.indexOf(firsChair);
        var column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {
            alert("Упс, этого нет на доске.")
        }
        if (row < 0 || row > model.boardSize || column < 0 || column > model.boardSize) {
            alert("Упс, этого нет на доске.")
        } else {
            return row + column;
        }
    }
    return null;
}
function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    model.generalShipsModels();
}
function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}
function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
};

window.onload = init;
// controller.processGuess('C4');
// controller.processGuess('D4');
// controller.processGuess('E4');

// controller.processGuess('B0');
// controller.processGuess('B1');
// controller.processGuess('B2');

// controller.processGuess('A0');
// controller.processGuess('B0');
// controller.processGuess('C0');