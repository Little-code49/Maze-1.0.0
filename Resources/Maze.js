import * as ultis from "./ultis"
export var hue = 0
var wall
import dsd from "./dsd";

var canvas = document.querySelector("canvas")

// Get the modal
var modal = document.getElementById("myModal")

var RESTART = document.getElementById("restart")

// When the user clicks the button, open the modal
function modelfunwin() {
    console.log("func called")
    modal.style.display = "block";
    var x = document.querySelector(".gamehead");
    x.textContent = "Congrats! You Win"

}

//rac = rows and columns

// c w / rac = S !!!!!

export function maze(X, Y, restart) {
    this.N = X / 2;
    this.M = Y / 2;
    // S = 10, S + "px" = w and h!!!
    this.S = canvas.height / (X + 1)
    console.log(this.S)
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
        this.canvas = document.getElementById(id);
        var scale = this.S;
        var temp = []
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.Board[1][0] = '$'
            for (var i = 0; i < 2 * this.N + 1; i++) {
                for (var j = 0; j < 2 * this.M + 1; j++) {
                    if (this.Board[i][j] != ' ') {
                        this.ctx.fillStyle = wall;
                        this.ctx.fillRect(scale * i, scale * j, scale, scale);
                    }
                    else if (i < 5 && j < 5)
                        temp.push([i, j])
                }
            }
            var x = ultis.randomChoice(temp)
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
    }

    this.moveup = function (id) {
        hue = hue + 1
        var cord = this.checkPos(id);
        var scale = this.S;
        var i = cord[0]
        var j = cord[1]
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
        var cord = this.checkPos(id);
        var scale = this.S;
        var i = cord[0]
        var j = cord[1]
        j += 1
        console.log(i, j);
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
        var cord = this.checkPos(id);
        var scale = this.S;
        var i = cord[0]
        var j = cord[1]
        i -= 1
        console.log(i, j);
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
        var cord = this.checkPos(id);
        var scale = this.S;
        var i = cord[0]
        var j = cord[1]
        i += 1
        console.log(i, j);
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
        var cord = this.checkPos(id);
        var i = cord[0]
        var j = cord[1]
        if ((i == this.N * 2 - 1 && j == this.N * 2) || (i == 1 && j == 0)) {
            if (restart) {
                RESTART.style.visibility = "visible";
                RESTART.setAttribute("onclick", "location.reload()")
            }
            modelfunwin();
            return 1
        }
        return 0
    }

    this.getMoves = function () {
        return this.moves;
    }

};