// Sample for phaser.js by T. Fujita on 2019/9/20 (Set the tile data with movable blocks)

var scale = 1;
var P_size = 48 * scale;
var player;
var f_rate = 4;
var f_loop = -1;			// -1: Endless
var speed = 500;
var wall_0;
var wall_1;
var again;
var goal;
var block;
var goal_sound;
var BL_counter = 0;
var BL_flag = 0;
var counter = 0;
var cursors;
var flag = "stay";
var Goal_flag = 0;
var End_flag = " ";
var px = 0;
var py = 0;
var nextX = 0;
var nextY = 0;
var nextBX = 0;
var nextBY = 0;
var pos = [];
var temp = [];
var BLOCK = [];
var ROOM = room[0];

//Scene Game Start
class Scene_GameStart extends Phaser.Scene {
  constructor (){
          super({ key: 'Game_Start' });
   }
    preload ()
    {
        this.load.image('bg', './images/bg.jpg');
        this.load.spritesheet('Player', './images/hukei_01.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('Again', './images/A_48.png');
        this.load.image('Block', './images/Box_06.png');
        this.load.image('Goal', './images/Goal_00.png');
        this.load.image('Wall_0', './images/Block_04.png');
        this.load.image('Wall_1', './images/Block_05.png');

	this.load.audio('GOAL', ['./sound/info-girl1-goal1.mp3']);
    }

    create ()
    {
        this.add.image(800, 600, 'bg');
	wall_0  = this.physics.add.staticGroup();
	wall_1  = this.physics.add.staticGroup();
	goal_sound = this.sound.add('GOAL');
	End_flag = " ";
	BL_flag = 0;
// if(counter != 0) {player.destroy();}
	if(counter >= room.length) {
	    counter = 0;
	}
	ROOM = room[ counter ];
	if (Goal_flag != 0) {
		Goal_flag = 0;
	}

	for (var i=0; i<ROOM.length; i++) {
	    temp[i] = [];
	    for (var j=0; j<ROOM[i].length; j++) {
		temp[i][j] = ROOM[i].substr(j,1);
		if(ROOM[i].substr(j,1) == "P") { 
		    player = this.physics.add.sprite(j * P_size, i * P_size, 'Player').setOrigin(0, 0).setScale(scale);
		}
		else if(ROOM[i].substr(j,1) == "A") { 
		    again = this.add.sprite(j * P_size, i * P_size, 'Again').setOrigin(0, 0).setScale(scale);
		}
		else if(ROOM[i].substr(j,1) == "G") { 
		    goal = this.physics.add.sprite(j * P_size, i * P_size, 'Goal').setOrigin(0, 0).setScale(scale);
		}
		else if(ROOM[i].substr(j,1) == "B") { 
		    BLOCK[BL_counter] = this.physics.add.sprite(j * P_size, i * P_size, 'Block').setOrigin(0, 0).setScale(scale);
		    BL_counter = BL_counter + 1;
		    BL_flag = 1;
		}
		else if(ROOM[i].substr(j,1) == "w") { 
		    wall_0 = this.physics.add.sprite(j * P_size, i * P_size, 'Wall_0').setOrigin(0, 0).setScale(scale);
		}
		else if(ROOM[i].substr(j,1) == "W") { 
		    wall_1 = this.physics.add.sprite(j * P_size, i * P_size, 'Wall_1').setOrigin(0, 0).setScale(scale);
		}
	    }
	}
	for (i=0; i<temp[0].length; i++) {
	    pos[i] = [];
	    for (j=0; j<temp.length; j++) {
		pos[i][j] = temp[j][i];
	    }
	}
	if(counter == 0) {
          this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('Player', { start: 3, end: 5 }),
            frameRate: f_rate,
            repeat: f_loop
          });
          this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('Player', { start: 6, end: 8 }),
            frameRate: f_rate,
            repeat: f_loop
          });
          this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('Player', { start: 9, end: 11 }),
            frameRate: f_rate,
            repeat: f_loop
          });
          this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('Player', { start: 0, end: 2 }),
            frameRate: f_rate,
            repeat: f_loop
          });
          this.physics.add.collider(player);
	}
	BL_counter = 0;
        cursors = this.input.keyboard.createCursorKeys();
	this.input.mouse.capture = true;

	again.setInteractive();
	again.on('pointerdown', function (pointer) {
	    End_flag = "Again !";
	    game.scene.start('Next_Game');
	});
     }

    update ()
    {
	px = Math.floor(player.x / P_size);
	py = Math.floor(player.y / P_size);

        if (Phaser.Input.Keyboard.JustDown(cursors.left))		// キーが押下された瞬間一度leftを返す
        {
	    flag = "left";
        } else if (Phaser.Input.Keyboard.JustDown(cursors.right))	// キーが押下された瞬間一度rightを返す
        {
	    flag = "right";
        } else if (Phaser.Input.Keyboard.JustDown(cursors.up))		// キーが押下された瞬間一度upを返す
        {
	    flag = "up";
        } else if (Phaser.Input.Keyboard.JustDown(cursors.down))	// キーが押下された瞬間一度downを返す
        {
	    flag = "down";
        } else if (game.input.mousePointer.isDown)
	{
	    if (px < Math.floor(game.input.mousePointer.x / P_size))
	    {
		flag = "right";
	    } else if (px > Math.floor(game.input.mousePointer.x / P_size))
	    {
		flag = "left";
	    } else if (py < Math.floor(game.input.mousePointer.y / P_size))
	    {
		flag = "down";
	    } else if (py > Math.floor(game.input.mousePointer.y / P_size))
	    {
		flag = "up";
	    } else
	    {
		flag = "stay";
	    }
	} else
        {
		flag = "stay";
	}

	if(px < 0) {px = 0;}
	if(py < 0) {py = 0;}
	if(px >= ROOM[0].length - 1) {px = ROOM[0].length - 1;}
	if(py >= ROOM.length - 1) {py = ROOM.length - 1;}
	Check_Goal();

	    if( flag == "left") {
	        player.anims.play('left', true);
		if((pos[px - 1][py] =="w") ||(pos[px - 1][py] =="W")) {
		    player.x = px * P_size;
		    player.y = py * P_size;
		} else if((pos[px - 1][py] =="B") && (pos[px - 2][py] =="F")) {
		    pos[px][py] = "F";
		    pos[px - 1][py] = "P";
		    pos[px - 2][py] = "B";
		    for(var i=0; i<BLOCK.length; i++) {
			if((Math.floor(BLOCK[i].x / P_size)  == (px - 1)) && (Math.floor(BLOCK[i].y / P_size) == py)) {
			    BL_counter = i;
			}
		    }
		    nextBX = px * P_size - P_size * 2;
		    nextBY = py * P_size;
		    this.tweens.add({
			targets: BLOCK[BL_counter],
			x: nextBX,
			y: nextBY,
			duration: speed,
		    }, this);
		    nextX = px * P_size - P_size;
		    nextY = py * P_size;
		    this.tweens.add({
			targets: player,
			x: nextX,
			y: nextY,
			duration: speed,
		    }, this);
		} else if ((pos[px - 1][py] =="B") && (pos[px - 2][py] !="F")) {
		    player.x = px * P_size;
		    player.y = py * P_size;
		} else {
		    if(pos[px - 1][py] != "G") {
			pos[px][py] = "F";
			pos[px - 1][py] = "P";
		    }
		    nextX = px * P_size - P_size;
		    nextY = py * P_size;
		    this.tweens.add({
			targets: player,
			x: nextX,
			y: nextY,
			duration: speed,
		    }, this);
		}
	    } else if( flag == "right") {
	        player.anims.play('right', true);
		if((pos[px + 1][py] =="w") ||(pos[px + 1][py] =="W")) {
		    player.x = px * P_size;
		    player.y = py * P_size;
		} else if((pos[px + 1][py] =="B") && (pos[px + 2][py] =="F")) {
		    pos[px][py] = "F";
		    pos[px + 1][py] = "P";
		    pos[px + 2][py] = "B";
		    for(var i=0; i<BLOCK.length; i++) {
			if((Math.floor(BLOCK[i].x / P_size) == (px + 1)) && (Math.floor(BLOCK[i].y / P_size) ==  py)) {
			    BL_counter = i;
			}
		    }
		    nextBX = px * P_size + P_size * 2;
		    nextBY = py * P_size;
		    this.tweens.add({
			targets: BLOCK[BL_counter],
			x: nextBX,
			y: nextBY,
			duration: speed,
		    }, this);
		    nextX = px * P_size + P_size;
		    nextY = py * P_size;
		    this.tweens.add({
			targets: player,
			x: nextX,
			y: nextY,
			duration: speed,
		    }, this);
		} else if ((pos[px + 1][py] =="B") && (pos[px + 2][py] !="F")) {
		    player.x = px * P_size;
		    player.y = py * P_size;
		} else {
		    if(pos[px + 1][py] != "G") {
			pos[px][py] = "F";
			pos[px + 1][py] = "P";
		    }
		    nextX = px * P_size + P_size;
		    nextY = py * P_size;
		    this.tweens.add({
			targets: player,
			x: nextX,
			y: nextY,
			duration: speed,
		    }, this);
		}
	    } else if( flag == "up") {
	        player.anims.play('up', true);
		if((pos[px][py - 1] =="w") ||(pos[px][py - 1] =="W")) {
		    player.x = px * P_size;
		    player.y = py * P_size;
		} else if((pos[px][py - 1] =="B") && (pos[px][py - 2] =="F")) {
		    pos[px][py] = "F";
		    pos[px][py - 1] = "P";
		    pos[px][py - 2] = "B";
		    for(var i=0; i<BLOCK.length; i++) {
			if((Math.floor(BLOCK[i].x / P_size) == px) && (Math.floor(BLOCK[i].y / P_size) == (py - 1))) {
			    BL_counter = i;
			}
		    }
		    nextBX = px * P_size;
		    nextBY = py * P_size - P_size * 2;
		    this.tweens.add({
			targets: BLOCK[BL_counter],
			x: nextBX,
			y: nextBY,
			duration: speed,
		    }, this);
		    nextX = px * P_size;
		    nextY = py * P_size - P_size;
		    this.tweens.add({
			targets: player,
			x: nextX,
			y: nextY,
			duration: speed,
		    }, this);
		} else if((pos[px][py - 1] =="B") && (pos[px][py - 2] !="F")) {
		    player.x = px * P_size;
		    player.y = py * P_size;
		} else {
		    if(pos[px][py - 1] != "G") {
			pos[px][py] = "F";
			pos[px][py - 1] = "P";
		    }
		    nextX = px * P_size;
		    nextY = py * P_size - P_size;
		    this.tweens.add({
			targets: player,
			x: nextX,
			y: nextY,
			duration: speed,
		    }, this);
		}
	    } else if( flag == "down") {
	        player.anims.play('down', true);
		if((pos[px][py + 1] =="w") ||(pos[px][py+ 1] =="W")) {
		    player.x = px * P_size;
		    player.y = py * P_size;
		} else if((pos[px][py + 1] =="B") && (pos[px][py + 2] =="F")) {
		    pos[px][py] = "F";
		    pos[px][py + 1] = "P";
		    pos[px][py + 2] = "B";
		    for(var i=0; i<BLOCK.length; i++) {
			if((Math.floor(BLOCK[i].x / P_size) == px) && (Math.floor(BLOCK[i].y / P_size) == (py + 1))) {
			    BL_counter = i;
			}
		    }
		    nextBX = px * P_size;
		    nextBY = py * P_size + P_size * 2;
		    this.tweens.add({
			targets: BLOCK[BL_counter],
			x: nextBX,
			y: nextBY,
			duration: speed,
		    }, this);
		    nextX = px * P_size;
		    nextY = py * P_size + P_size;
		    this.tweens.add({
			targets: player,
			x: nextX,
			y: nextY,
			duration: speed,
		    }, this);
		} else if((pos[px][py + 1] =="B") && (pos[px][py + 2] !="F")) {
		    player.x = px * P_size;
		    player.y = py * P_size;
		} else {
		    if(pos[px][py + 1] != "G") {
			pos[px][py] = "F";
			pos[px][py + 1] = "P";
		    }
		    nextX = px * P_size;
		    nextY = py * P_size + P_size;
		    this.tweens.add({
			targets: player,
			x: nextX,
			y: nextY,
			duration: speed,
		    }, this);
		}
	    }
	flag = "stay";
    }
};


// Process for reaching the goal
function Check_Goal() {
	if((pos[px][py] == "G") && (Goal_flag == 0)) {
		Goal_flag = 1;
		End_flag = "Goal !";
		counter = counter + 1;
		this.goal_sound.play();
		game.scene.start('Next_Game');
	}
}


//Scene_NextGame
class Scene_NextGame extends Phaser.Scene {
    constructor (){
          super({ key: 'Next_Game' });
    }

    create(){
	let sceneName01 = this.add.text(400, 150, End_flag).setFontSize(30).setFontFamily("Arial").setOrigin(0.5).setColor("#FF0000").setInteractive();
	let sceneName02 = this.add.text(400, 250, 'ここで使用しているグラフィクスの一部に「どらぴか」様 \n URL: https://dorapika.wixsite.com/pikasgame 作成の素材を\nまた、サウンドは「soundeffect-lab　https://soundeffect-lab.info/ 」様\n作成の素材を使用しております。').setFontSize(20).setFontFamily("Arial").setOrigin(0.5).setColor("#FF0000").setInteractive();

	let change = this.add.text(400, 350, 'Push Here for Continue !').setFontSize(30).setFontFamily("Arial").setColor("#FF0000").setOrigin(0.5).setInteractive();

	change.on('pointerdown', function (pointer) {
	    sceneName01.destroy();
	    sceneName02.destroy();
	    change.destroy();

	    game.scene.start('Game_Start');
	}, this);
   }
};


let config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: [ Scene_GameStart, Scene_NextGame ],
    physics: {
	default: 'arcade',
	arcade: {
	    debug: false
	}
    },
};


let game = new Phaser.Game(config);

