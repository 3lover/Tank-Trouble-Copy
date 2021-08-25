const c = document.getElementById("canvas"),
	ctx = c.getContext("2d"),
	console = document.getElementById("console"),
	WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;
var entities = [],
	gameInfo = {gamespeed: 1, powerupsAllowed: [1,1,1,1,1,1,1,1,1,1], LDM: true};

function init() {
	//sizes the canvas appropriately and resets the console before refreshing everything
	ctx.canvas.width = WIDTH;
	ctx.canvas.height = HEIGHT;
	console.innerHTML = "";
	startScreen();
	refresh();
}

function startScreen() {
	entities = [];
	moveIn(WIDTH + 10, [-WIDTH, 0 + (HEIGHT / 45), WIDTH - 20, HEIGHT * 0.2 - (HEIGHT / 15), "mainMenuTitle"],
		["Tank Trouble", WIDTH / 2 - 10, 0, "center", WIDTH / 30], 1);
	moveIn(WIDTH + 10, [-WIDTH, HEIGHT - (HEIGHT / 4) - (HEIGHT / 30), WIDTH - 20, HEIGHT / 4, "startingOptionsSelector"],
		["Start Game#bCustom Maps#bSettings", HEIGHT / 45, 0, "start", WIDTH / 47], 3);
	moveIn(WIDTH + 10, [-WIDTH / 2 - HEIGHT * 0.25, HEIGHT - (HEIGHT * 0.8) - (HEIGHT / 30), HEIGHT * 0.5, HEIGHT * 0.5, "mainIconImg"],
		["https://cdn.glitch.com/0db611cc-f0cd-40d9-bdc8-efe23eb38aeb%2F8ebb5463-7976-4df9-937e-1c79ddb80527.image.png?v=1629825210671",
			HEIGHT / 45, 0, "start", WIDTH / 47
		], 5);
}
function options() {
    entities = [];
    let weaponOptions = {
      0:'Frag', 1:'Gatling', 2:'Guided#bMissile', 3:'Land#bMine', 4:'Laser', 5:'Controlled#bMissile',
      6:'Shotgun', 7:'Death Ray', 8:'Ram', 9:'Shield'
    },
    length = Object.keys(weaponOptions).length;
    moveIn(WIDTH + 10, [-WIDTH, 0 + (HEIGHT / 45), WIDTH - 20 - (WIDTH / 5), HEIGHT * 0.2 - (HEIGHT / 15), "optionsTitle"],
        ["Settings:", HEIGHT / 45, 0, "start", WIDTH / 30], 1);
    moveIn(-WIDTH + WIDTH - (WIDTH / 5), [WIDTH, 0 + (HEIGHT / 45), WIDTH / 5 - 10, HEIGHT * 0.2 - (HEIGHT / 15), "optionsBack"],
        ["< Back", HEIGHT / 45, 0, "start", WIDTH / 47], 2);
    moveIn(-WIDTH + 10, [WIDTH, HEIGHT * 0.2 - (HEIGHT / 30), WIDTH - 20, HEIGHT * 0.1, "gamespeedBtn"],
        ["Game Speed:", HEIGHT / 45, 0, "start", WIDTH / 47], 2);
    moveIn(WIDTH + 10, [-WIDTH, HEIGHT * 0.3 - (HEIGHT / 30), WIDTH - 20, HEIGHT * 0.1, "gamespeedDisplay"],
        ["gameInfo.gamespeed", HEIGHT / 45, 0, "start", WIDTH / 47], 4);
    moveIn(WIDTH + 10, [-WIDTH, HEIGHT * 0.4 - (HEIGHT / 30), WIDTH/2 - 20, HEIGHT * 0.1, "LDMBtn"],
        ["LDM:", HEIGHT / 45, 0, "start", WIDTH / 38], 2);
    moveIn(WIDTH + 10, [-WIDTH/2, HEIGHT * 0.4 - (HEIGHT / 30), WIDTH/2 - 20, HEIGHT * 0.1, "LDMDisplay"],
        ["gameInfo.LDM", HEIGHT / 45, 0, "start", WIDTH / 47], 4);
    moveIn(-WIDTH + 10, [WIDTH, HEIGHT * 0.6 - (HEIGHT / 30), WIDTH - 20, HEIGHT * 0.1, "weaponsTitle"],
        ["Weapons Enabled:", HEIGHT / 45, 0, "start", WIDTH / 38], 1);
  for(let i = 0; i < length; i++) {
    moveIn(-WIDTH + 10, [WIDTH + (i*(WIDTH-20)/length), HEIGHT * 0.7 - (HEIGHT / 30), (WIDTH-20) / length, HEIGHT * 0.1, "enableW"],
        [weaponOptions[i], HEIGHT / 45, 0, "start", WIDTH / 60], 2);
    entities[entities.length-1].state = i
    moveIn(WIDTH + 10, [-WIDTH + (i*(WIDTH-20)/length), HEIGHT * 0.8 - (HEIGHT / 30), (WIDTH-20) / length, HEIGHT * 0.1, "displayW" + i],
        ["gameInfo.powerupsAllowed[" + i + "]", HEIGHT / 45, 0, "start", WIDTH / 47], 4);
  }
  refresh();
}
function tanktest() {
  entities = []
  let e = new Entity(1,"https://cdn.glitch.com/0db611cc-f0cd-40d9-bdc8-efe23eb38aeb%2F8ebb5463-7976-4df9-937e-1c79ddb80527.image.png?v=1629825210671",{x:100,y:100})
    entities.push(e);
  refres
}

function insideRect(x, y, i, options = 1) {
	//checks if the x/y position given is within button number i, and return what option for selectors
	//console.innerHTML = (x > i.x && x < i.x + i.width && y > i.y && y < i.y + i.height)
	if (options == 1)
		return x > i.x && x < i.x + i.width && y > i.y && y < i.y + i.height;
	for (let j = 0; j < options; j++) {
		if (
			x > i.x &&
			x < i.x + i.width &&
			y > i.y + (i.height / options) * j &&
			y < i.y + i.height - (i.height - (i.height / options) * (j + 1))
		)
			return j;
	}
}
class Entity {
  constructor(id, image, PROPS = {}) {
    this.id = id;
    this.x = PROPS.x;
		this.y = PROPS.y;
    this.refresh = function() {
      let img = new Image();
					img.src = image;
					ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
  }
}
class UIBox {
	//initialize the entity and fill it with whatever text is needed
	constructor(
		PROPS = [1, 1, 1, 1, entities.length],
		CONTENT = ["", 1, 1, "start", 1],
		type
	) {
		this.x = PROPS[0];
		this.y = PROPS[1];
		this.width = PROPS[2];
		this.height = PROPS[3];
		this.state = 1;
		this.id = PROPS[4];
		this.type = type;
		this.text = CONTENT[0];
		if (type == 3) this.state = 0;
		this.refresh = function() {
			let stringLines = [];
			ctx.beginPath();
			ctx.lineWidth = 2;
			switch (type) {
				case 5:
					let img = new Image();
					img.src = CONTENT[0];
					ctx.drawImage(img, this.x, this.y, this.width, this.height);
					break;
				case 4:
					this.text = eval(CONTENT[0]).toString();
					break;
				case 3:
					this.options = (this.text.match(/#b/g) || []).length + 1;
					for (let i = 0; i < this.options; i++) {
						if (this.state == i) ctx.fillStyle = "grey";
						else ctx.fillStyle = "white";
						ctx.beginPath();
						ctx.rect(
							this.x,
							this.y + i * (this.height / this.options),
							this.width,
							this.height / this.options
						);
						ctx.fill();
					}
					ctx.textAlign = CONTENT[3];
					ctx.font = CONTENT[4] + "px Corsiva";
					stringLines = this.text.split("#b");
					for (let i = 0; i < stringLines.length; i++) {
						ctx.fillStyle = "black";
						ctx.fillText(
							i + 1 + "- " + stringLines[i],
							this.x + CONTENT[1],
							this.y +
							CONTENT[2] +
							CONTENT[4] +
							i * (this.height / this.options)
						);
					}
					break;
          case 2:
						ctx.fillStyle = "#b5b3b3";
						ctx.beginPath();
						ctx.rect(
							this.x,
							this.y,
							this.width,
							this.height
						);
						ctx.fill();
            ctx.fillStyle = "black";
			}
			this.clicked = function(event) {
        if (this.type == 3) numberSubmit(insideRect(event.clientX, event.clientY, this, this.options));
				switch (this.id) {
					case "optionsBack":
            entities = [];
						startScreen();
						break;
          case "gamespeedBtn":
            gameInfo.gamespeed = gameInfo.gamespeed >= 3 ? 0.25 :
                            gameInfo.gamespeed < 1 ? gameInfo.gamespeed + 0.25 :
                                gameInfo.gamespeed + 0.5;
                        refresh();
						break;
          case "enableW":
            gameInfo.powerupsAllowed[this.state] = gameInfo.powerupsAllowed[this.state] == 1 ? 0 : 1
						break;
          case "LDMBtn":
            gameInfo.LDM = gameInfo.LDM == true ? false : true
						break;
				}
        refresh();
			};
			if (type == 2 || type == 1 || type == 4) {
				ctx.textAlign = CONTENT[3];
				ctx.font = CONTENT[4] + "px Corsiva";
				stringLines = this.text.split("#b");
				for (let i = 0; i < stringLines.length; i++) {
					while (stringLines[i].length > (WIDTH - 20) / (WIDTH / 90)) {
						stringLines.splice(
							i,
							0,
							stringLines[i].substring(0, (WIDTH - 20) / (WIDTH / 90))
						);
						stringLines[i + 1] = stringLines[i + 1].substring(
							(WIDTH - 20) / (WIDTH / 90)
						);
						if (stringLines[i + 1][0] == " ")
							stringLines[i + 1] = stringLines[i + 1].substring(1);
					}
					ctx.fillText(
						stringLines[i],
						this.x + CONTENT[1],
						this.y + CONTENT[2] + (i * CONTENT[4]) + this.height/2
					);
					if (i > 2) break;
				}
			}
			ctx.beginPath();
			ctx.fillStyle = "black";
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.stroke();
		};
	}
}

function refresh() {
	//refreshes the page and all its components when called
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	for (let i = 0; i < entities.length; i++) entities[i].refresh();
}

function moveIn() {
	//used to make an entity glide onscreen such as a textbox
	//first argument is the total movement (will be over the course of 1/2 a second), the rest are properties used to spawn an entity
	let t = new UIBox(arguments[1], arguments[2], arguments[3]);
	entities.push(t);
  if (!gameInfo.LDM)
	for (let i = 0; i < 100; i++)
		setTimeout(() => {
			t.x += arguments[0] / 100;
			refresh();
		}, 5 * i / gameInfo.gamespeed);
  else t.x += arguments[0];
}

function getMousePosition(event) {
	//runs on click and checks if you are hovering any buttons on the list
	for (let i = 0; i < entities.length; i++)
		if (insideRect(event.clientX, event.clientY, entities[i]))
			entities[i].clicked(event);
}

function numberSubmit(num) {
	let select;
	for (let i = 0; i < entities.length; i++)
		if (entities[i].type == 3 && entities[i].options > num)
			select = entities[i];
	if (num == -1) num = select.state;
	if (num == -3 && select.state + 1 < select.options) num = select.state + 1;
	else if (num == -2 && select.state - 1 >= 0) num = select.state - 1;
	else if (num == -2 || num == -3) return;
	if (select.state != num) select.state = num;
	else {
		switch (select.id) {
			case "startingOptionsSelector":
        switch(select.state) {
          case 0:
            //startGame();
            break;
          case 1:
            //customMap();
            break;
          case 2:
            options();
            break;
        }
				break;
		}
	}
	refresh();
}

function moveTank(id, dir) {
  for (let i = 0; i < entities.length; i++)
		if (entities[i].id == id) {
      entities[i].x += dir == 3 ? 10 : dir == 1 ? -10 : 0
      entities[i].y += dir == 2 ? 10 : dir == 4 ? -10 : 0
    }
}

function keyPress(event) {
	var keyCode = event.which || event.keyCode;
	switch (keyCode) {
		case 13:
			numberSubmit(-1);
			break;
		case 48:
		case 49:
			// 1 or 0 pressed
			numberSubmit(0);
			break;
		case 50:
			// 2 pressed
			numberSubmit(1);
			break;
		case 51:
			// 3 pressed
			numberSubmit(2);
			break;
		case 52:
			// 4 or 0 pressed
			numberSubmit(3);
			break;
		case 53:
			// 5 pressed
			numberSubmit(4);
			break;
		case 54:
			// 6 pressed
			numberSubmit(5);
			break;
    case 37:
			// left arrow pressed
			moveTank(1,1);
			break;
		case 39:
			//right arrow pressed
			moveTank(1,3);
			break;
		case 38:
			// up arrow pressed
			numberSubmit(-2);
      moveTank(1,2);
			break;
		case 40:
			//down arrow pressed
			numberSubmit(-3);
      moveTank(1,4);
			break;
	}
}

c.addEventListener("mousedown", function(e) {
	getMousePosition(e);
});
document.addEventListener("keydown", function(e) {
	keyPress(e);
});

init();