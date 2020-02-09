const WIDTH = 800;
const HEIGHT = 800;

let player = 1;
let played = false;

let p = new Pentago(0, 0, 800, 800);

let zero_cwb, zero_awb, one_cwb, one_awb, two_cwb, two_awb, three_cwb, three_awb;

function swapPlayer() {
    if (player == 1) {
        player = 2;
    } else if (player == 2) {
        player = 1;
    }
    played = false;
}

function setup() {
    zero_cwb = createButton(">");
    zero_cwb.style('font-size', "25px");
    zero_cwb.position(50, 10);
    zero_cwb.mousePressed(function() {
        if (played == true) {
            p.rotateQuadrant(0, true);
            swapPlayer();
        }
    });
    zero_awb = createButton("v");
    zero_awb.style('font-size', "25px");
    zero_awb.position(10, 50);
    zero_awb.mousePressed(function() {
        if (played == true) {
            p.rotateQuadrant(0, false);
            swapPlayer();
        }
    });
    one_awb = createButton("<");
    one_awb.style('font-size', "25px");
    one_awb.position(50 + 800 - 50 + 20, 10);
    one_awb.mousePressed(function() {
        if (played == true) {
            p.rotateQuadrant(1, false);
            swapPlayer();
        }
    });
    one_cwb = createButton("v");
    one_cwb.style('font-size', "25px");
    one_cwb.position(800 + 50 + 10, 50);
    one_cwb.mousePressed(function() {
        if (played == true) {
            p.rotateQuadrant(1, true);
            swapPlayer();
        }
    });
    two_awb = createButton(">");
    two_awb.style('font-size', "25px");
    two_awb.position(10 + 50, 50 + 800 + 10);
    two_awb.mousePressed(function() {
        if (played == true) {
            p.rotateQuadrant(2, false);
            swapPlayer();
        }
    });
    two_cwb = createButton("^");
    two_cwb.style('font-size', "25px");
    two_cwb.position(10, 50 + 800 - 50 + 10);
    two_cwb.mousePressed(function() {
        if (played == true) {
            p.rotateQuadrant(2, true);
            swapPlayer();
        }
    });
    three_cwb = createButton("<");
    three_cwb.style('font-size', "25px");
    three_cwb.position(50 + 800 - 50 + 20, 50 + 800 + 10);
    three_cwb.mousePressed(function() {
        if (played == true) {
            p.rotateQuadrant(3, true);
            swapPlayer();
        }
    });
    three_awb = createButton("^");
    three_awb.style('font-size', "25px");
    three_awb.position(800 + 50 + 10, 50 + 800 - 50 + 10);
    three_awb.mousePressed(function() {
        if (played == true) {
            p.rotateQuadrant(3, false);
            swapPlayer();
        }
    });













    let canv = createCanvas(WIDTH, HEIGHT);
    canv.position(50, 50);
    // function() {
    //     p.rotateQuadrant(quadrantSelected, true)
    //     played = false;
    //     quadrantSelected = -1;
    //     if (player == 1) { player = 2; } else if (player == 2) {
    //         player = 1;
    //     }
    // }



}

function draw() {
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
    if (a instanceof Array) {
        return Object.keys(a[0]).map(function(c) {
            return a.map(function(r) { return r[c]; });
        });
    }
}