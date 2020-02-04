const WIDTH = 800;
const HEIGHT = 800;

let player = 1;
let played = false;
let quadrantSelected = -1;

let p = new Pentago(0, 0, 800, 800);

let clockwise_button, anticlockwise_button, text;

function setup() {
    console.log("nice");
    createCanvas(WIDTH, HEIGHT);

    clockwise_button = createButton("Clockwise");
    clockwise_button.position(WIDTH + 50, 50);
    clockwise_button.mousePressed(function() {
        p.rotateQuadrant(quadrantSelected, true)
        played = false;
        quadrantSelected = -1;
        if (player == 1) { player = 2; } else if (player == 2) {
            player = 1;
        }
    });
    anticlockwise_button = createButton("Anti-clockwise");
    anticlockwise_button.position(clockwise_button.x + clockwise_button.width + 10, 50);
    anticlockwise_button.mousePressed(function() {
        p.rotateQuadrant(quadrantSelected, false)
        played = false;
        quadrantSelected = -1;
        if (player == 1) { player = 2; } else if (player == 2) {
            player = 1;
        }
    });
    text = createElement('h3', (quadrantSelected !== -1) ? `Which direction would you like to rotate quadrant ${quadrantSelected}?` : "You haven't selected a quadrant to rotate");
    text.position(WIDTH + 50, 0);
}

function draw() {
    text.html((quadrantSelected !== -1) ? `Which direction would you like to rotate quadrant ${quadrantSelected}?` : "You haven't selected a quadrant to rotate");
    background(200, 200, 200);
    p.show();

    //check for clicks
}

function mouseClicked() {
    if (played == false) {
        let location = p.getCircle(mouseX, mouseY);
        p.makeMove(location.row, location.col, player);
    }
}

function transpose(a) {
    if (a instanceof Array && a.length > 0) {
        return Object.keys(a[0]).map(function(c) {
            return a.map(function(r) { return r[c]; });
        });
    }
}