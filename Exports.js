// Imports
import * as maze from "./Resources/Maze"
import style from "./Resources/style"

////////////////// Setup \\\\\\\\\\\\\\\\\
var Style = style

// Get the modal
var modal = document.getElementById("myModal")

var wall

var playAgainBtn = document.getElementById("demo")
var score = document.getElementById("c")
var RESTART = document.getElementById("restart")
RESTART.style.visibility = "hidden";


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

score.style.background = "hsl(0, 100%, 50%)";
playAgainBtn.addEventListener("click", myFunction);

function myFunction() {
    document.location.reload();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var m



var playing = true
window.addEventListener('keydown', doKeyDown, true);

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

/**
 * Maze -- the Maze Constructer
 */

class Maze {
    /**
     * Setup and generate the maze
     * @param {Boolean} [restarts] boolean. restart or not. default: true
     * @param {Number} [rowsAndColumns] default: 64. the number of the rows and columns
     */
    setup(restarts, rowsAndColumns) {
        var restart
        if (restarts == Boolean) {
            restart = restarts
        } else {
            restart = true
        }
        if (rowsAndColumns == Number) {
            m = new maze.maze(rowsAndColumns, rowsAndColumns, restart);
        } else {
            m = new maze.maze(64, 64, restart);
        }
        m.init()
        m.add_edges()
        m.gen_maze()
    }

    
    /**
     * Draw the canvas
     * @param {String} [canvasId] the id of the canvas. default: "canvas"
     * @param {String} [walls] the color of the walls. (rgb, rgba, hsl, #......, and name). default: "rgb(30, 30, 30)"
     * @param {String} [background] the background. (rgb, rgba, hsl, #......, and name). default: cadetblue
     */
    draw(canvasId, walls, background) {
        var canvas
        var back
        if (canvasId == String) {
            canvas = canvasId
        } else {
            canvas = "canvas"
        }
        if (walls == String) {
            wall = walls
        } else {
            wall = "rgb(30, 30, 30)"
        }
        if (background == String) {
            back = background
        } else {
            back = "cadetblue"
        }
        m.draw_canvas(canvas)
        document.getElementById(canvas).style.backgroundColor = back
    }

    /**
     * Draw the "moves"
     * @param {String} [id] the id, default: "c"
     * @param {Boolean} [color] color or not, default: true
     */
    drawMoves(id, color) {
        var Id
        var Color
        if (id == String) {
            Id = id
        } else {
            Id = "c"
        }
        if (color == Boolean) {
            Color = color
        } else {
            Color = true
        }
        score = document.getElementById(Id)
        setInterval(() => {
            document.getElementById(Id).innerHTML = "Moves: " + m.getMoves()
            if (Color) {
                document.getElementById(Id).style.backgroundColor = `hsl(${maze.hue}, 100%, 50%)`
            }
        }, 100)

    }
    /**
     * 
     * @returns {Number} the number of the moves
     */
    moves() {
        return m.getMoves()
    }

    /**
     * Add style to it
     */
    addCss() {
        var style = document.createElement("style")
        style.textContent = Style
        document.head.append(style)
    }

    /**
     * This is use for the touchscreens device
     * @param {String} [up] up id, default: "up"
     * @param {String} [down] down id, default: "down"
     * @param {String} [left] left id, default: "left"
     * @param {String} [right] right id, default: "right"
     */
    keyboard(up, down, left, right) {
        var Up
        var Down
        var Left
        var Right
        if (up == String) {
            Up = up
        } else {
            Up = "up"
        }
        if (down == String) {
            Down = down
        } else {
            Down = "down"
        }
        if (left == String) {
            Left = left
        } else {
            Left = "left"
        }
        if (Right == String) {
            Right = right
        } else {
            Right = "right"
        }
        var controls = {
            up: document.getElementById(Up),
            down: document.getElementById(Down),
            left: document.getElementById(Left),
            right: document.getElementById(Right),
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
    }
}

export default Maze;
