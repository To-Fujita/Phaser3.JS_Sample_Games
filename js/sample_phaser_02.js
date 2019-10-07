// Sample for phaser.js by T. Fujita on 2019/9/11 (Move the static character by keyboard & mouse)

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

        cursors = this.input.keyboard.createCursorKeys();
	this.input.mouse.capture = true;
}

function update ()
{
        if (cursors.left.isDown)
        {
            player.setVelocityX(-1 * speed);

        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(speed);

        }
        else if (cursors.up.isDown)
        {
            player.setVelocityY(-1 * speed);

        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(speed);

        }
	else if (game.input.mousePointer.isDown)
	{
	    if (Math.floor(player.x / P_size) < Math.floor(game.input.mousePointer.x / P_size))
	    {
		player.setVelocityX(speed);
	    }
	    else if (Math.floor(player.x / P_size) > Math.floor(game.input.mousePointer.x / P_size))
	    {
		player.setVelocityX(-1 * speed);
	    }
	    if (Math.floor(player.y / P_size) < Math.floor(game.input.mousePointer.y / P_size))
	    {
		player.setVelocityY(speed);
	    }
	    else if (Math.floor(player.y / P_size) > Math.floor(game.input.mousePointer.y / P_size))
	    {
		player.setVelocityY(-1 * speed);
	    }
	}
        else
        {
            player.setVelocityX(0);
            player.setVelocityY(0);
       }
}

