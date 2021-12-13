/**
 * (used to draw a clock of 500x500 px)
 * @constructor clock
 */
const Clock = function () {
    // create the canvas and get the context
    const canvas = document.createElement("canvas");
    canvas.width = "500";
    canvas.height = "500";
    document.querySelector("body").appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let firstDraw = true;

    this.refresh = function () {

        // get the actual date
        let now = new Date();

        let hour = now.getHours();
        let min = now.getMinutes();
        let sec = now.getSeconds();

        hour = hour >= 12 ? hour - 12 : hour;
        if (!firstDraw) {
            ctx.translate(250, 250);
            ctx.rotate(-Math.PI / 2);
        }
        firstDraw = false

// place the clock in the canva center and rotate it to get 12/0 on the top

        ctx.clearRect(0, 0, 500, 500);
        ctx.translate(250, 250);
        ctx.rotate(-Math.PI / 2);
        ctx.save();
// draw the clock

        ctx.strokeStyle = "grey";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(0, 0, 130, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore()
// draw hours

        ctx.save();

        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;

        for (let i = 0; i < 12; i++) {
            ctx.beginPath();
            ctx.rotate(Math.PI / 6);
            ctx.moveTo(100, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
        }

        ctx.restore();

// draw minutes

        ctx.save();

        ctx.lineWidth = 3;
        for (let i = 0; i < 60; i++) {
            if ((i % 5) !== 0) {
                ctx.beginPath();
                ctx.moveTo(100, 0);
                ctx.lineTo(103, 0);
                ctx.stroke();
            }
            ctx.rotate(Math.PI / 30);
        }

        ctx.restore();


// draw hour needle
        ctx.save();

        ctx.strokeStyle = "grey";
        ctx.lineWidth = 6;
        ctx.rotate((hour * (Math.PI / 6)) + (min * (Math.PI / 360)));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(70, 0);
        ctx.stroke();

        ctx.restore();

// draw minutes needle

        ctx.save();

        ctx.strokeStyle = "green";
        ctx.lineWidth = 4;
        ctx.rotate((min * (Math.PI / 30)) + (sec * (Math.PI / 1800)));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(90, 0);
        ctx.stroke();

        ctx.restore();

// draw seconds needle

        ctx.save();

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.rotate(sec * (Math.PI / 30))
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(98, 0);
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    this.draw = function () {
        setInterval(this.refresh, 100)
    }
}

const tryClock = new Clock()
tryClock.draw()