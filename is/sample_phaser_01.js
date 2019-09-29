// Sample for phaser.js by T. Fujita on 2019/9/11 (Display a static character)

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
}

function update ()
{

}

