// //game.js
import Background from "./background"
import StarField from "./starfield"

export default class Game
{
    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.state = "new-game";
        this.level = 1;
        this.loading_screen();

        // this.start();//initially new game every time... loading functionality later
    }

    loading_screen()
    {
        const loadingscreen = document.queryselector('#loading');
        this.starField = new StarField(this.canvas);
    }

    start()
    {
        // this.level = new 
        this.background = new Background(this.canvas.width, this.canvas.height, this.level, this.context);
        this.state = "fighting";
        this.background.animate();
        // for now the game just instantly plays the "level" which is currently misnamed as background
        // this.animate();

        
    }
}
