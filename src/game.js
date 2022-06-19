// //game.js
import Background from "./background"
import Player from "./player";

export default class Game
{
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.state = "new-game";

 
        // this.levelup();
        this.start();//initially new game every time... loading functionality later
 
    }


    start()
    {
        // this.level = new 
        this.background = new Background(this.canvas.width, this.canvas.height, 1, this.context);
        this.state = "fighting";
        this.background.animate();
        // for now the game just instantly plays the "level" which is currently misnamed as background
        // this.animate();

        
    }

    animate(){
    }
}
