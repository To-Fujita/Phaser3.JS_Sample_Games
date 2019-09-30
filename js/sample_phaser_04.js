// Sample for phaser.js by T. Fujita on 2019/9/19 (Move an animated character by keyboard & mouse)

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
	default: 'arcade',
	arcade: {
	    debug: false
	}
    },
    scene: {
	preload: preload,
	create: create,
	update: update
    }
};

var scale = 1;
var P_size = 48 * scale;
var player;
var cursors;
var f_rate = 5;
var speed = 100;

var game = new Phaser.Game(config);

function preload ()
{
        this.load.image('bg', './images/bg.jpg');
        this.load.spritesheet('Player', './images/hukei_01.png', { frameWidth: 48, frameHeight: 48 });
}

function create ()
{
        this.add.image(800, 600, 'bg');
        player = this.physics.add.sprite(400, 300, 'Player');

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('Player', { start: 3, end: 5 }),
            frameRate: f_rate,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('Player', { start: 6, end: 8 }),
            frameRate: f_rate,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('Player', { start: 9, end: 11 }),
            frameRate: f_rate,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('Player', { start: 0, end: 2 }),
            frameRate: f_rate,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(player);

}

function update ()
{
        if (cursors.left.isDown)
        {
            player.setVelocityX(-1 * speed);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(speed);
            player.anims.play('right', true);
        }
        else if (cursors.up.isDown)
        {
            player.setVelocityY(-1 * speed);
            player.anims.play('up', true);
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(speed);
            player.anims.play('down', true);
        }
	else if (game.input.mousePointer.isDown)
	{
	    if (Math.floor(player.x / P_size) < Math.floor(game.input.mousePointer.x / P_size))
	    {
		player.setVelocityX(speed);
	        player.anims.play('right', true);
	    }
	    else if (Math.floor(player.x / P_size) > Math.floor(game.input.mousePointer.x / P_size))
	    {
		player.setVelocityX(-1 * speed);
	        player.anims.play('left', true);
	    }
	    if (Math.floor(player.y / P_size) < Math.floor(game.input.mousePointer.y / P_size))
	    {
		player.setVelocityY(speed);
	        player.anims.play('down', true);
	    }
	    else if (Math.floor(player.y / P_size) > Math.floor(game.input.mousePointer.y / P_size))
	    {
		player.setVelocityY(-1 * speed);
	        player.anims.play('up', true);
	    }
	}
        else
        {
            player.setVelocityX(0);
            player.setVelocityY(0);
        }

}

