// Get the modal
var modal = document.getElementById("myModal")
var playAgainBtn = document.getElementById("demo")
var score = document.getElementById("c")
var RESTART = document.getElementById("restart")
var restart = false;
RESTART.style.visibility = "hidden";

var difficulties = {
    rowsAndColumns: 32,
}

var controls = {
    up: document.getElementById("up"),
    down: document.getElementById("down"),
    left: document.getElementById("left"),
    right: document.getElementById("right"),
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
modelfunwin = function () {
    console.log("func called")
    modal.style.display = "block";
    var x = document.querySelector(".gamehead");
    x.textContent = "Congrats! You Win"

}

score.style.background = "hsl(0, 100%, 50%)";
playAgainBtn.addEventListener("click", myFunction);

function myFunction() {
    document.location.reload();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
/**
 * 
 * @param {Event} event event object
 */
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

playing = true
window.addEventListener('keydown', doKeyDown, true);
/**
 * 
 * @param {Event} evt 
 */
function doKeyDown(evt) {
    var handled = false;
    if (playing) {
        switch (evt.keyCode) {
            case 38:  /* Up arrow was pressed */
                m.moveup("canvas");
                handled = true
                break;
            case 87:  /* Up arrow was pressed */
                m.moveup("canvas");
                handled = true
                break;
            case 40:  /* Down arrow was pressed */
                m.movedown("canvas");
                handled = true
                break;
            case 83:  /* Down arrow was pressed */
                m.movedown("canvas");
                handled = true
                break;
            case 37:  /* Left arrow was pressed */
                m.moveleft("canvas");
                handled = true
                break;
            case 65:  /* Left arrow was pressed */
                m.moveleft("canvas");
                handled = true
                break;
            case 39:  /* Right arrow was pressed */
                m.moveright("canvas");
                handled = true
                break;
            case 68:  /* Right arrow was pressed */
                m.moveright("canvas");
                handled = true
                break;
        }
        if (m.checker("canvas"))
            playing = false
    }
    if (handled)
        evt.preventDefault(); // prevent arrow keys from scrolling the page (supported in IE9+ and all other browsers)
}

controls.up.addEventListener("click", () => {
    m.moveup("canvas")
})
controls.down.addEventListener("click", () => {
    m.movedown("canvas")
})
controls.left.addEventListener("click", () => {
    m.moveleft("canvas")
})
controls.right.addEventListener("click", () => {
    m.moveright("canvas")
})
/**
 * Maze the Maz array
 */
class dsd {
    constructor(size) {
        this.N = size;
        this.P = new Array(this.N);
        this.R = new Array(this.N);

        this.init = function () {
            for (var i = 0; i < this.N; i++) {
                this.P[i] = i;
                this.R[i] = 0;
            }
        };

        this.union = function (x, y) {
            var u = this.find(x);
            var v = this.find(y);
            if (this.R[u] > this.R[v]) {
                this.R[u] = this.R[v] + 1;
                this.P[u] = v;
            }
            else {
                this.R[v] = this.R[u] + 1;
                this.P[v] = u;
            }
        };

        this.find = function (x) {
            if (x == this.P[x])
                return x;
            this.P[x] = this.find(this.P[x]);
            return this.P[x];
        };
    }
}



function random(min, max) { return (min + (Math.random() * (max - min))); };
function randomChoice(choices) { return choices[Math.round(random(0, choices.length - 1))]; };
/**
 * 
 * @param {Number} X 
 * @param {Number} Y
 * 
 * @type {maze} 
 */
var maze = function (X, Y) {
    this.N = X;
    this.M = Y;
    this.S = 10;
    this.moves = 0;
    this.Board = new Array(2 * this.N + 1);
    this.EL = new Array();
    this.vis = new Array(2 * this.N + 1);
    this.delay = 2;
    this.x = 1;
    this.init = function () {
        for (var i = 0; i < 2 * this.N + 1; i++) {
            this.Board[i] = new Array(2 * this.M + 1);
            this.vis[i] = new Array(2 * this.M + 1);
        }

        for (var i = 0; i < 2 * this.N + 1; i++) {
            for (var j = 0; j < 2 * this.M + 1; j++) {
                if (!(i % 2) && !(j % 2)) {
                    this.Board[i][j] = '+';
                }
                else if (!(i % 2)) {
                    this.Board[i][j] = '-';
                }
                else if (!(j % 2)) {
                    this.Board[i][j] = '|';
                }
                else {
                    this.Board[i][j] = ' ';
                }
                this.vis[i][j] = 0;
            }
        }
    }


    this.add_edges = function () {
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.M; j++) {
                if (i != this.N - 1) {
                    this.EL.push([[i, j], [i + 1, j], 1]);
                }
                if (j != this.M - 1) {
                    this.EL.push([[i, j], [i, j + 1], 1]);
                }
            }
        }
    }


    //Hash function
    this.h = function (e) {
        return e[1] * this.M + e[0];
    }
    this.randomize = function (EL) {
        for (var i = 0; i < EL.length; i++) {
            var si = Math.floor(Math.random() * 387) % EL.length;
            var tmp = EL[si];
            EL[si] = EL[i];
            EL[i] = tmp;
        }
        return EL;
    }

    this.breakwall = function (e) {
        var x = e[0][0] + e[1][0] + 1;
        var y = e[0][1] + e[1][1] + 1;
        this.Board[x][y] = ' ';
    }

    this.gen_maze = function () {
        this.EL = this.randomize(this.EL);
        var D = new dsd(this.M * this.M);
        D.init();
        var s = this.h([0, 0]);
        var e = this.h([this.N - 1, this.M - 1]);
        this.Board[1][0] = ' ';
        this.Board[2 * this.N - 1][2 * this.M] = ' ';
        //Run Kruskal
        for (var i = 0; i < this.EL.length; i++) {
            var x = this.h(this.EL[i][0]);
            var y = this.h(this.EL[i][1]);
            if (D.find(s) == D.find(e)) {
                if (!(D.find(x) == D.find(s) && D.find(y) == D.find(s))) {
                    if (D.find(x) != D.find(y)) {
                        D.union(x, y);
                        this.breakwall(this.EL[i]);
                        this.EL[i][2] = 0;
                    }

                }
                //break;
            }

            else if (D.find(x) != D.find(y)) {
                D.union(x, y);
                this.breakwall(this.EL[i]);
                this.EL[i][2] = 0;
            }
            else {
                continue;
            }
        }

    };


    this.draw_canvas = function (id) {
        this.canvas = canvas;
        var scale = this.S;
        temp = []
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.Board[1][0] = '$'
            for (var i = 0; i < 2 * this.N + 1; i++) {
                for (var j = 0; j < 2 * this.M + 1; j++) {
                    if (this.Board[i][j] != ' ') {
                        this.ctx.fillStyle = "rgba(30, 30, 30)";
                        this.ctx.fillRect(scale * i, scale * j, scale, scale);
                    }
                    else if (i < 5 && j < 5)
                        temp.push([i, j])
                }
            }
            var x = randomChoice(temp)
            this.Board[x[0]][x[1]] = '&'
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(scale * x[0], scale * x[1], scale, scale);
        }
    };

    this.checkPos = function (id) {
        for (var i = 0; i < 2 * this.N + 1; i++) {
            for (var j = 0; j < 2 * this.M + 1; j++) {
                if (this.Board[i][j] == '&') {
                    return [i, j]
                }
            }
        }
    }
    var hue = 0;
    this.moveclear = function (a, b) {
        var scale = this.S;
        var color = `hsl(${hue}, 50%, 50%)`;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = color;
        this.ctx.fillRect(scale * a, scale * b, scale, scale);
        this.Board[a][b] = ' '
    }

    this.move = function (a, b) {
        var scale = this.S;
        var color = `hsl(${hue}, 100%, 50%)`;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = color;
        this.ctx.fillRect(scale * a, scale * b, scale, scale);
        this.Board[a][b] = '&'
        score.style.background = color;
    }

    this.moveup = function (id) {
        hue = hue + 1
        cord = this.checkPos(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        j -= 1
        console.log(i, j);
        if (j < 0)
            return
        else if (j > 2 * this.M)
            return
        else if (this.Board[i][j] == ' ') {
            this.moveclear(i, j + 1);
            this.move(i, j);
            this.moves += 1;
        }
        else
            return
    }

    this.movedown = function (id) {
        hue = hue + 1
        cord = this.checkPos(id);
        var scale = this.S;
        console.log(i, j);
        i = cord[0]
        j = cord[1]
        j += 1
        if (j < 0)
            return
        else if (j > 2 * this.M)
            return
        else if (this.Board[i][j] == ' ') {
            this.moveclear(i, j - 1);
            this.move(i, j);
            this.moves += 1;
        }
        else
            return
    }

    this.moveleft = function (id) {
        hue = hue + 1
        cord = this.checkPos(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        console.log(i, j);
        i -= 1
        if (i < 0)
            return
        else if (i > 2 * this.N)
            return
        else if (this.Board[i][j] == ' ') {
            this.moveclear(i + 1, j);
            this.move(i, j);
            this.moves += 1;
        }
        else
            return
    }

    this.moveright = function (id) {
        hue = hue + 1
        cord = this.checkPos(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        console.log(i, j);
        i += 1
        if (i < 0)
            return
        else if (i > 2 * this.N)
            return
        else if (this.Board[i][j] == ' ') {
            this.moveclear(i - 1, j);
            this.move(i, j);
            this.moves += 1;
        }
        else
            return
    }
    this.checker = function (id) {
        cord = this.checkPos(id);
        i = cord[0]
        j = cord[1]
        if ((i == 63 && j == 64) || (i == 1 && j == 0)) {
            restart = true
            RESTART.style.visibility = "visible";
            modelfunwin();
            return 1
        }
        return 0
    }

    this.getMoves = function () {
        return this.moves;
    }

};
var m = new maze(difficulties.rowsAndColumns, difficulties.rowsAndColumns);
m.init();
m.add_edges();
m.gen_maze();
m.draw_canvas("canvas");
function drawMoves() {
    score.innerHTML = "Moves: " + m.getMoves()
}
setInterval(drawMoves, 100);


