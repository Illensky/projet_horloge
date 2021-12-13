/**
 *
 * @param size take a string of the size wanted ex : "500"
 * @param wantedContainer take a string of the wanted container,
 * a querrySelector method is used here ... ex : "body" or "#container"
 * @constructor clock (add a clock to the wanted container)
 */
const Clock = function (size, wantedContainer) {
    // create the canvas and get the context
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    document.querySelector(wantedContainer).appendChild(canvas);
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
            ctx.translate(parseInt(size)/2, parseInt(size)/2);
            ctx.rotate(-Math.PI / 2);
        }
        firstDraw = false

// place the clock in the canva center and rotate it to get 12/0 on the top

        ctx.clearRect(0, 0, parseInt(size), parseInt(size));
        ctx.translate(parseInt(size)/2, parseInt(size)/2);
        ctx.rotate(-Math.PI / 2);
        ctx.save();
// draw the clock

        ctx.strokeStyle = "grey";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(0, 0, parseInt(size)/3.85, 0, Math.PI * 2);
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
            ctx.moveTo(parseInt(size)/5, 0);
            ctx.lineTo(parseInt(size)/4.17, 0);
            ctx.stroke();
        }

        ctx.restore();

// draw minutes

        ctx.save();

        ctx.lineWidth = 3;
        for (let i = 0; i < 60; i++) {
            if ((i % 5) !== 0) {
                ctx.beginPath();
                ctx.moveTo(parseInt(size)/5, 0);
                ctx.lineTo(parseInt(size)/4.84, 0);
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
        ctx.lineTo(parseInt(size)/7.13, 0);
        ctx.stroke();

        ctx.restore();

// draw minutes needle

        ctx.save();

        ctx.strokeStyle = "green";
        ctx.lineWidth = 4;
        ctx.rotate((min * (Math.PI / 30)) + (sec * (Math.PI / 1800)));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(parseInt(size)/5.56, 0);
        ctx.stroke();

        ctx.restore();

// draw seconds needle

        ctx.save();

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.rotate(sec * (Math.PI / 30))
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(parseInt(size)/5.10, 0);
        ctx.stroke();
// draw clock center point
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

const tryClock = new Clock("2000", "body")
tryClock.draw()