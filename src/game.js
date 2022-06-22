// //game.js
import Background from "./background"
import StarField from "./starfield"

export default class Game
{
    constructor(canvas){
        this.canvas = canvas;

        
        this.width = 1280;
        this.height = 720;
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.context = this.canvas.getContext('2d');
        this.state = "new-game";
        this.level = 1;

    
        this.loading_screen();

        // this.start();//initially new game every time... loading functionality later
    }

    loading_screen()
    {
        const loadingscreen = document.querySelectorAll('.mainmenu');
        const new_game = document.querySelector('#new-game-butt');
        const howtoplay = document.querySelector('#instructions');
    
        new_game.addEventListener("click", () =>
        {
            loadingscreen.forEach( (thing) =>{
                thing.style.display = "none";
            });
            
            this.starField.initiateEnd = true; //necessary for memory and garbage handler issues
            this.starField = null; //:/ kind of annoying tbh

            setTimeout(()=> 
                {
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.canvas.width = this.width;
                    this.canvas.height = this.height;
                    this.start();
                }, 11000);
        });

        this.starField = new StarField(this.canvas, this.canvas.width, this.canvas.height);
        howtoplay.addEventListener("click", () =>
        {
            loadingscreen.forEach( (thing) =>{
                thing.style.display = "none";
            });

            this.starField.instructionsOn = true;
            

            function exitInstructions()
            {
                loadingscreen.forEach( (thing) =>{
                    thing.style.display = "inline-block";
                });
                this.starField.instructionsOn = false;

            }
            
            setTimeout(()=> 
            {
                    document.addEventListener("click", exitInstructions.bind(this), {once: true});
            }, 100);
    
        });
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
