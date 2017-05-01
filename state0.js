var demo = {}; 
var speed = 6; 
var mason;
//var woman walking;

//create variable cursors
var cursors;

demo.state0 = function () {};

var text;
var shellsCollected = 0;

demo.state0.prototype = {
	preload: function(){
        game.load.image('orange', 'assets/orange_shell.png');
		game.load.image('clouds', 'assets/grass.jpg');
        game.load.image('blue', 'assets/blue.shell.png');
        game.load.image('purple','assets/purple.shell.png');
        game.load.image('green', 'assets/green.shell.png');
        game.load.image('yellow', 'assets/yellow.shell.png');
        //this is where we load the BG image
		game.load.spritesheet('mason', 'assets/masonwalkingpiskel.png', 32, 32);
        //game.load.spritesheet('woman' , 'assets/woman_walking.png',32, 32)
	},

	create: function(){
        gameStartTime = new Date()
    game.world.setBounds(0,0, 1000,600);
      //add physics to game
        game.physics.startSystem(Phaser.Physics.ARCADE);
		
       var cloud = game.add.sprite(0, 0, 'clouds');//this is where we add the image
	mason = game.add.sprite(450, 450, 'mason');
    //woman walking = game.add.sprite(450, 450, 'women walking')
 	
       game.physics.enable(mason);
        //game.physics.enable(women walking)
        
 //     adding gravity to adam
        //mason.body.gravity.y = 600;

        
        mason.body.collideWorldBounds = true;
        
        mason.scale.setTo(1.5, 1.5);
        
        mason.animations.add('walk', [0,1,2,3,4,5,6]);
        group = game.add.physicsGroup();
        for(i=0;i<20;i++){
           group.create(game.rnd.between(10, 990), game.rnd.between(10, 590), 'orange');
            group.create(game.rnd.between(10, 990), game.rnd.between(10, 590),'blue');
            group.create(game.rnd.between(10, 990), game.rnd.between(10, 590), 'purple');
            group.create(game.rnd.between(10, 990), game.rnd.between(10, 590), 'green');
            group.create(game.rnd.between(10, 990), game.rnd.between(10, 590), 'yellow');
             }
        seaShells = 99
        

        
        // creating cursor keys: lets you press buttons for your avatar to move
        cursors = game.input.keyboard.createCursorKeys();

        text = game.add.text(600, 10, "Shells Collected: "+shellsCollected);
        timeText = game.add.text(600, 35, 'Score: 0')
	},

	update: function(){
        
        if (shellsCollected<seaShells){
           var later = new Date()
           var time=later-gameStartTime 
            seconds= time / 1000
            timeText.setText("Score: " +seconds)
        }
        
        game.physics.arcade.collide(mason, group, collisionHandler)
                
        text.setText("Shells Collected: "+shellsCollected);
        
//   updated these if statements
        if (cursors.right.isDown){
//  changed how he moves to use physics
             mason.body.velocity.x = 150;

        mason.animations.play('walk');
		}
        else if(cursors.left.isDown){
            
            //  Move to the left
        mason.body.velocity.x = -150;

        mason.animations.play('walk');
        }
        else{
            mason.body.velocity.x = 0;
            //  Stand still
            mason.animations.stop();
            // select which frame to use when I am not moving
            mason.frame = 0;
        }
//        if(cursors.down.isDown){
//            if(mason.y >= 100){
//            mason.body.velocity.y = 200;
//            }
//        }
//        
//        //  Lets adam jump at a specific speed
//        if (cursors.up.isDown){
//            mason.body.velocity.y = -200;
//        }
        if (cursors.down.isDown){
//  changed how he moves to use physics
             mason.body.velocity.y = 150;

        mason.animations.play('walk');
		}
        else if(cursors.up.isDown){
            //  Move to the left
        mason.body.velocity.y = -150;

        mason.animations.play('walk');
        }
        else{
            mason.body.velocity.y = 0;
            //  Stand still
            mason.animations.stop();
            // select which frame to use when I am not moving
            mason.frame = 0;
        }
	}

};
collisionHandler = function (guy,shell){
    shellsCollected += 1; 
    shell.destroy();
}