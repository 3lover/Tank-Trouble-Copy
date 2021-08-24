const c = document.getElementById("canvas"),
    ctx = c.getContext("2d"),
    console = document.getElementById("console"),
    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

function init() {
    //sizes the canvas appropriately and resets the console before refreshing everything
    ctx.canvas.width = WIDTH;
    ctx.canvas.height = HEIGHT;
    console.innerHTML = "";
}

init()