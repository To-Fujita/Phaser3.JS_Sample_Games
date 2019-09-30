# Phaser3JS Sample Games
Phaser.JS is one of Game Engine based on JavaScript. I had tried to create some games on 2D based. These games are puzzle type and maze type.
## Description:
This is one of tutrial for creating some games based on phaser3.js. In this document, to try creating 2D based breakout games with pazzle and maze. 
## Demo:
I will show you same samples to create 2D based games of pazzle type step by step.  
These demonstrations are confirmed by Microsoft Edge (Ver. 11.0.17763.379), Firefox (Ver. 65.0.2/64 bit) and Google Chrome (Ver. 73.0.3683.86/64 bit) under the condition of Windows 10. Then, some of Android are also available to work it.  
[index.html](https://to-fujita.github.io/PhaserJS_Sample_Games/index.html) : Menu for Demo Games  
The files are as follows:  
- index_Phaser_01.html - index_Phaser_08_319.html: Each html file is corresponding to each step below.  
- images: It is a folder for providing the background image, tile images and character's graphics.  
- js: It is a folder for main programs.  
- js/maze_02.js: To create the maze for Step-7.  
- js/phaser.js, phaser.min.js: The main body for phaser.js.  
- js/sample_phaser_01.js - sample_phaser_08.js: Each JavaScript file is corresponding to each HTML file.  
- js/stage_01.js: Each stage without enemy is here. It is available to change by using text editor.  
- js/stage_02.js: Each stage with enemy (after stage #8) is here. It is also available to change.  
- sound: It is a folder for providing the sound files.  

In these games, some graphics are downloaded from  [pikasgame](https://dorapika.wixsite.com/pikasgame) and [pipoya](http://blog.pipoya.net/). Then, files for sound effect are downloaded from [soundeffect-lab](https://soundeffect-lab.info/).  
### Step-1
As a first step, let's try to display a static character's graphic at center of window.  
[index_Phaser_01.html](https://to-fujita.github.io/PhaserJS_Sample_Games/index_Phaser_01.html) : Demo for Step-1
### Step-2
Next is to try moving a static character by arrow keys or mouse click.  
[index_Phaser_02.html](https://to-fujita.github.io/PhaserJS_Sample_Games/index_Phaser_02.html) : Demo for Step-2
### Step-3
At the Step-3, try to display a active character's graphic at center of window.  
[index_Phaser_03.html](https://to-fujita.github.io/PhaserJS_Sample_Games/index_Phaser_03.html) : Demo for Step-3
### Step-4
At the Step-4, try to display a walking animation for 4 directions by arrow keys or mouse click.  
[index_Phaser_04.html](https://to-fujita.github.io/PhaserJS_Sample_Games/index_Phaser_04.html) : Demo for Step-4
### Step-5
At the Step-5, display tiles of walls and boxes. Then, to set the limit of walking at walls.  
[index_Phaser_05.html](https://to-fujita.github.io/PhaserJS_Sample_Games/index_Phaser_05.html) : Demo for Step-5
### Step-6
At the Step-6, to set pushing a box. It is 2 type of 2D based game samples, that is without sound effect and with sound effect. If you try again same stage, please click the "A" tile.  
[index_Phaser_06.html](https://to-fujita.github.io/PhaserJS_Sample_Games/index_Phaser_06.html) : Demo for Step-6 without sound effect  
[index_Phaser_06_with_sound_effect.html](https://to-fujita.github.io/PhaserJS_Sample_Games/index_Phaser_06_with_sound_effect.html) : Demo for Step-6 with sound effect
### Step-7
In this step, try to create game for 2D type of maze with small chang of the sample in Step-6. The algorithm for making maze is based on [Algoful](http://algoful.com/Archive/Algorithm/MazeDig).  
[index_Phaser_07.html](https://to-fujita.github.io/PhaserJS_Sample_Games/index_Phaser_07.html) : Demo for Step-7
### Step-8 (Under Construction)
At the Step-8, added some enemies to the sample in Step-6. However, there are not working well. Then, the animation of sprites are defference at Phaser var. 3.11 and at var. 3.19 in same JS file.   
[index_Phaser_08_311.html](https://to-fujita.github.io/PhaserJS_Sample_Games/index_Phaser_08_311.html) : Demo for Step-8 by using Phaser ver. 3.11.(Not working well.)  
[index_Phaser_08_319.html](https://to-fujita.github.io/PhaserJS_Sample_Games/index_Phaser_08_319.html) : Demo for Step-8 by using Phaser ver. 3.19.(Not working well.)  
### Step-9 (Under Construction)
  

## Reference:
1. [Phaser3 js](https://phaser.io/phaser3) : Home Page of Phaser3.js  
2. [pikasgame](https://dorapika.wixsite.com/pikasgame) : Home Page of PIKA's GAME  
3. [pipoya](http://blog.pipoya.net/) : Home Page of Pipoya  
4. [Algoful](http://algoful.com/Archive/Algorithm/MazeDig) : Algorithm for making a maze  
5. [soundeffect-lab](https://soundeffect-lab.info/) : Download for Sound Effect Data   
## Licence:
[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)
## Author:
[T. Fujita](https://github.com/T-Fujita)

