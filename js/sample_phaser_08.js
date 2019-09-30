// Sample for phaser.js by T. Fujita on 2019/9/29 (Added some enemies)

const scale = 1;
const f_rate = 4;
const f_loop = -1;			// -1: Endless
const speed = 500;
const P_size = 48 * scale;
let player;
let wall_0;
let wall_1;
var again;
let goal;
let block;
let goal_sound;
let gameover_sound;
let BL_counter = 0;
let EN_counter = 0;
let counter = 0;
let cursors;
let flag = "stay";
let BL_flag = 0;
let EY_flag = 0;
let Goal_flag = 0;
let END_flag = " ";
let START_flag = 0;
let px = 0;
let py = 0;
let nextX = 0;
let nextY = 0;
let nextBX = 0;
let nextBY = 0;
let nextEX = 0;
let nextEY = 0;
let pos = [];
let temp = [];
let BLOCK = [];
let ENEMY = [];
let EN_flag = [];
let EN_x = [];
let EN_y = [];
let ROOM = room[0];


//Scene Game Start
class Scene_GameStart extends Phaser.Scene {
  constructor (){
          super({ key: 'Game_Start' });
   }
    preload ()
    {
        this.load.image('bg', './images/bg.jpg');
        this.load.image('Again', './images/A_48.png');
        this.load.image('Block', './images/Box_06.png');
        this.load.image('Goal', './images/Goal_00.png');
        this.load.image('Wall_0', './images/Block_04.png');
        this.load.image('Wall_1', './images/Block_05.png');
        this.load.spritesheet('Player', './images/hukei_01.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('Enemy', './images/Gost_01.png', { frameWidth: 48, frameHeight: 48 });

	this.load.audio('GOAL', ['./sound/info-girl1-goal1.mp3']);
	this.load.audio('GAMEOVER', ['./sound/info-girl1-zannen1.mp3']);
    }

    create ()
    {
        this.add.image(800, 600, 'bg');
	wall_0  = this.physics.add.staticGroup();
	wall_1  = this.physics.add.staticGroup();
	goal  = this.physics.add.staticGroup();
	goal_sound = this.sound.add('GOAL');
	gameover_sound = this.sound.add('GAMEOVER');

	BL_flag = 0;
	END_flag = " ";
	BL_counter = 0;
	EN_counter = 0;
	BLOCK = [];
	ENEMY = [];
	EN_x = [];
	EN_y = [];
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
		    again = this.add.image(j * P_size, i * P_size, 'Again').setOrigin(0, 0).setScale(scale);
		}
		else if(ROOM[i].substr(j,1) == "G") { 
		    goal = this.physics.add.sprite(j * P_size, i * P_size, 'Goal').setOrigin(0, 0).setScale(scale);
		}
		else if(ROOM[i].substr(j,1) == "B") { 
		    BLOCK[BL_counter] = this.physics.add.sprite(j * P_size, i * P_size, 'Block').setOrigin(0, 0).setScale(scale);
		    BL_counter = BL_counter + 1;
		    BL_flag = 1;
		}
		else if(ROOM[i].substr(j,1) == "E") { 
		    ENEMY[EN_counter] = this.physics.add.sprite(j * P_size, i * P_size, 'Enemy').setOrigin(0, 0).setScale(scale);
		    EN_counter = EN_counter + 1;
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
	if(START_flag == 0) {
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

          this.anims.create({
              key: 'EN_left',
              frames: this.anims.generateFrameNumbers('Enemy', { start: 3, end: 5 }),
              frameRate: f_rate,
              repeat: f_loop
          });
          this.anims.create({
              key: 'EN_right',
              frames: this.anims.generateFrameNumbers('Enemy', { start: 6, end: 8 }),
              frameRate: f_rate,
              repeat: f_loop
          });
          this.anims.create({
              key: 'EN_up',
              frames: this.anims.generateFrameNumbers('Enemy', { start: 9, end: 11 }),
              frameRate: f_rate,
              repeat: f_loop
          });
          this.anims.create({
              key: 'EN_down',
              frames: this.anims.generateFrameNumbers('Enemy', { start: 0, end: 2 }),
              frameRate: f_rate,
              repeat: f_loop
          });
	  START_flag = 1;
	}
	for(var i = 0; i < EN_counter; i++) {
	    this.physics.add.collider(ENEMY[ i ]);
	}
	BL_counter = 0;
	again.setInteractive();
	again.on('pointerdown', function (pointer) {
	    END_flag = "Again !";
	    game.scene.start('Next_Game');
	});

        cursors = this.input.keyboard.createCursorKeys();
	this.input.mouse.capture = true;
//	this.physics.add.overlap(player, ENEMY, Game_Over, null, this);
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

	if(EN_counter > 0) {
          for(var k = 0; k < EN_counter; k++) {
	    EN_x[ k ] = Math.floor(ENEMY[ k ].x / P_size);
	    EN_y[ k ] = Math.floor(ENEMY[ k ].y / P_size);
	    var Temp = Math.random() * 5;
	    if(Temp < 1 && EN_flag[ k ] == "stay") {
		EN_flag[ k ] = "left";
	    }
	    else if(Temp < 2 && EN_flag[ k ] == "stay") {
		EN_flag[ k ] = "right";
	    }
	    else if(Temp < 3 && EN_flag[ k ] == "stay") {
		EN_flag[ k ] = "up";
	    }
	    else if(Temp < 4 && EN_flag[ k ] == "stay") {
		EN_flag[ k ] = "down";
	    }
	    else {
		EN_flag[ k ] = "stay";
	    }
	    if(EN_flag[ k ] == "left" && EY_flag == 0) {
	        ENEMY[ k ].anims.play('EN_left', true);
		if(pos[EN_x[ k ] - 1][EN_y[ k ]] == "F" || pos[EN_x[ k ] - 1][EN_y[ k ]] == "P") {
		    EY_flag = 1;
		    nextEX = EN_x[ k ] * P_size - P_size;
		    nextEY = EN_y[ k ] * P_size;
		    this.tweens.add({
			targets: (ENEMY[ k ]),
			x: nextEX,
			y: nextEY,
			alpha: 0.6,
			duration: speed,
			onComplete: function() {EY_flag = 0;},
		    }, this);
		} else {
		    EN_flag[ k ] = "stay";
		    EY_flag = 0;
		}
	    }
	    if(EN_flag[ k ] == "right" && EY_flag == 0) {
	        ENEMY[ k ].anims.play('EN_right', true);
		if(pos[EN_x[ k ] + 1][EN_y[ k ]] == "F" || pos[EN_x[ k ] + 1][EN_y[ k ]] == "P") {
		    EY_flag = 1;
		    nextEX = EN_x[ k ] * P_size + P_size;
		    nextEY = EN_y[ k ] * P_size;
		    this.tweens.add({
			targets: (ENEMY[ k ]),
			x: nextEX,
			y: nextEY,
			alpha: 0.6,
			duration: speed,
			onComplete: function() {EY_flag = 0;},
		    }, this);
		} else {
		    EN_flag[ k ] = "stay";
		    EY_flag = 0;
		}
	    }
	    if(EN_flag[ k ] == "up" && EY_flag == 0) {
	        ENEMY[ k ].anims.play('EN_up', true);
		if(pos[EN_x[ k ]][EN_y[ k ] - 1] == "F" || pos[EN_x[ k ]][EN_y[ k ] - 1] == "P") {
		    EY_flag = 1;
		    nextEX = EN_x[ k ] * P_size;
		    nextEY = EN_y[ k ] * P_size - P_size;
		    this.tweens.add({
			targets: (ENEMY[ k ]),
			x: nextEX,
			y: nextEY,
			alpha: 0.5,
			duration: speed,
			onComplete: function() {EY_flag = 0;},
		    }, this);
		} else {
		    EN_flag[ k ] = "stay";
		    EY_flag = 0;
		}
	    }
	    if(EN_flag[ k ] == "down" && EY_flag == 0) {
	        ENEMY[ k ].anims.play('EN_down', true);
		if(pos[EN_x[ k ]][EN_y[ k ] + 1] == "F" || pos[EN_x[ k ]][EN_y[ k ] + 1] == "P") {
		    EY_flag = 1;
		    nextEX = EN_x[ k ] * P_size;
		    nextEY = EN_y[ k ] * P_size + P_size;
		    this.tweens.add({
			targets: (ENEMY[ k ]),
			x: nextEX,
			y: nextEY,
			alpha: 0.6,
			duration: speed,
			onComplete: function() {EY_flag = 0;},
		    }, this);
		} else {
		    EN_flag[ k ] = "stay";
		    EY_flag = 0;
		}
	    }
	    if(EN_flag[ k ] == "stay") {

	    }
	    if(px == EN_x[k] && py == EN_y[k]) {
		if(END_flag != "Game Over !") {
		    END_flag = "Game Over !";
		    game.scene.start('Next_Game');
		}
	    }
	  }
	}

    }
};


//Scene_NextGame
class Scene_NextGame extends Phaser.Scene {
    constructor (){
          super({ key: 'Next_Game', active: false });
    }

    create(){
	if(END_flag == "Goal !") {
	    goal_sound.play();
	}
	if(END_flag == "Game Over !") {
	    gameover_sound.play();
	}
	let sceneName01 = this.add.text(400, 150, END_flag).setFontSize(30).setFontFamily("Arial").setOrigin(0.5).setColor("#FF0000").setInteractive();
	let sceneName02 = this.add.text(400, 250, 'ここで使用しているグラフィックの一部に\n「どらぴか https://dorapika.wixsite.com/pikasgame」様及び').setFontSize(20).setFontFamily("Arial").setColor("#FF0000").setOrigin(0.5).setInteractive();
	let sceneName03 = this.add.text(400, 310, '「ぴぽや http://blog.pipoya.net/」様作成の素材を\nまた、サウンドは「soundeffect-lab　https://soundeffect-lab.info/ 」様\n作成の素材を使用しております。').setFontSize(20).setFontFamily("Arial").setColor("#FF0000").setOrigin(0.5).setInteractive();
	let change01 = this.add.text(400, 400, 'Push Here for Continue !').setFontSize(30).setFontFamily("Arial").setColor("#FF0000").setOrigin(0.5).setInteractive();
	change01.on('pointerdown', function (pointer) {
	    sceneName01.destroy();
	    sceneName02.destroy();
	    sceneName03.destroy();
	    change01.destroy();
	    game.scene.start('Game_Start');
	}, this);
   }
};


// Process for reaching the goal
function Check_Goal() {
	if((pos[px][py] == "G") && (Goal_flag == 0)) {
		END_flag = "Goal !";
		Goal_flag = 1;
		counter = counter + 1;
		game.scene.start('Next_Game');
	}
}


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

