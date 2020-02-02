class Pentago {
    /**
     * 
     * @param {number} x x value of top left of board
     * @param {number} y y value of top left of board
     * @param {number} width width of board
     */
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.width = width;

        let quadrants = 4;
        let rows = 6;
        let cols = 6;

        this.circleRad = 100;
        this.circleGap = this.width / 6;

        //initialise empty board
        this.board = [...Array(rows)].map(e => Array(cols).fill(0));  //3D array, first array is quadrants, which each has rows, which each has columns.
        /**
         * Quadrants v
         *  ___________
         * |  0  |  1  |    
         * |_____|_____|
         * |  2  |  3  |    
         * |_____|_____|
         * 
         */

        //ROW, COL
        this.board[1][0] = 1;
        this.board[0][0] = 1;
        this.board[4][2] = 2;
        console.log(this.board);
    }


    show() {
        fill(0, 0, 0);
        stroke(0, 0, 0);
        strokeWeight(1);

        noFill();
        rect(0, 0, this.width - 1, this.width - 1);//draws outer rectangle , subtracting stroke weight
        line(0, this.width / 2, this.width, this.width / 2);//horizontal line
        line(this.width / 2, 0, this.width / 2, this.width);//vetical line

        //draw circles
        ellipseMode(CENTER);
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                //white is one, black is two
                if (this.board[j][i] == 1) {
                    fill(255, 255, 255);
                }
                else if (this.board[j][i] == 2) {
                    fill(0, 0, 0);
                }
                else {
                    noFill();
                }
                ellipse(i * this.circleGap + this.circleGap / 2, j * this.circleGap + this.circleGap / 2, this.circleRad, this.circleRad);
            }
        }
    }

    /**
     * 
     * @param {number} quad 0,1,2,3 depending on quadrant
     * @param {boolean} clockwise whether the rotation is clockwise or anti-clockwise
     */
    rotateQuadrant(quad, clockwise) {
        //select quadrant in question
        let quadrant = []
        if (quad == 0) {
            let rows = this.board.slice(0, 3);
            rows.forEach(col => {
                quadrant.push(col.slice(0, 3));
            });
        }
        if (quad == 1) {
            let rows = this.board.slice(0, 3);
            rows.forEach(col => {
                quadrant.push(col.slice(3, 6));
            });
        }
        if (quad == 2) {
            let rows = this.board.slice(3, 6);
            rows.forEach(col => {
                quadrant.push(col.slice(0, 3));
            });
        }
        if (quad == 3) {
            let rows = this.board.slice(3, 6);
            rows.forEach(col => {
                quadrant.push(col.slice(3, 6));
            });
        }
        console.log(quadrant);

        //if clockwise, transpose then reverse each row
        //if anti-clockwise, reverse each row then transpose

        if (clockwise) {
            quadrant = transpose(quadrant);
            quadrant.forEach(array => {
                array = array.reverse()
            });
            console.log(quadrant);
            this.setQuadrant(quad, quadrant);
        }
        else if (clockwise !== true) {
            quadrant.forEach(array => {
                array = array.reverse()
            });
            quadrant = transpose(quadrant);
            console.log(quadrant);
            this.setQuadrant(quad, quadrant);
        }
    }

    //sets a given quadrant to a 2d array
    setQuadrant(quad, array) {
        if (quad == 0) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.board[i][j] = array[i][j];
                }
            }
        }
        if (quad == 2) {
            for (let i = 3; i < 6; i++) {
                for (let j = 0; j < 3; j++) {
                    this.board[i][j] = array[i - 3][j];
                }
            }
        }
        if (quad == 1) {
            for (let i = 0; i < 3; i++) {
                for (let j = 3; j < 6; j++) {
                    this.board[i][j] = array[i][j - 3];
                }
            }
        }
        if (quad == 3) {
            for (let i = 3; i < 6; i++) {
                for (let j = 3; j < 6; j++) {
                    this.board[i][j] = array[i - 3][j - 3];
                }
            }
        }
    }
}