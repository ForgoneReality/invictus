// //game.js
import Background from "./background"
import StarField from "./starfield"

export default class Game
{
    constructor(canvas){
        this.canvas = canvas;
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.context = this.canvas.getContext('2d');
        this.state = "new-game";
        this.level = 1;
        
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.loading_screen();

        // this.start();//initially new game every time... loading functionality later
    }

    loading_screen()
    {
        const loadingscreen = document.querySelector('#loading');
        const new_game = document.querySelector('#new-game-butt');

        new_game.addEventListener("click", () =>
        {
            loadingscreen.style.display = 'none';
            
            this.starField.initiateEnd = true; //necessary for memory and garbage handler issues
            this.starField = null; //:/ kind of annoying tbh

            setTimeout(()=> 
                {
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.start();
                }, 10000);
        });

        this.starField = new StarField(this.canvas);

    }

    start()
    {
        // let canvas = document.getElementById('game-canvas');
        // let context = canvas.getContext('2d');
        this.background = new Background(this.width, this.height, this.level, this.context);
        this.state = "fighting";
        this.background.animate();
        // for now the game just instantly plays the "level" which is currently misnamed as background
        // this.animate();
    }
}
