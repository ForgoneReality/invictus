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
        this.bgsong = null;
        this.ship_level = 1;
        this.gold = 0;
    
        this.loading_screen();

        // this.start();//initially new game every time... loading functionality later
    }

    playSound(song) {
        //check if sound is null, if not stop previous sound and unload it
        if (this.bgsong != null) {
            this.bgsong.stop();
            this.bgsong.unload();
            this.bgsong = null;
        }
        this.bgsong = song;
        this.bgsong.play();
    }

    loading_screen()
    {
        const loadingscreen = document.querySelectorAll('.mainmenu');
        const new_game = document.querySelector('#new-game-butt');
        const load_game = document.querySelector('#load-game-butt');
        const howtoplay = document.querySelector('#instructions');
        

        // const canvaser = document.querySelector('#game-canvas');

     
        setTimeout( ()=> { //cannot get dumb chrome to stop not playing my music zzz
            document.addEventListener("click", (e) => {
                if (e.target != new_game)
                    this.playSound(audio.mountainpeak);
            }, {once: true});
        }, 5);
        
        new_game.addEventListener("click", () =>
        {
            audio.beep1.play();   
            loadingscreen.forEach( (thing) =>{
                thing.style.display = "none";
            });

            if (this.bgsong != null) {
                this.bgsong.fade(1, 0, 6000);
            }

            let bgsong2 = audio.dawnutopia;

            setTimeout( () => {
                bgsong2.play();
                bgsong2.fade(0,1, 8000); 
                if(this.bgsong!= null)
                {
                    this.bgsong.stop();
                }
                this.bgsong = bgsong2;
            }, 8000);
            
            
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
            audio.beep1.play();
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
                audio.beep1.play();
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

        const my_shop = document.querySelector("#shop");
        const ships = document.querySelector("#ships");
        const shipselect1 = document.querySelector("#shipselect1");
        const shipselect2 = document.querySelector("#shipselect2");
        const nextship1 = document.querySelector("#nextship");
        const nextship2 = document.querySelector("#nextship2");
        const bought = document.querySelector("#bought");

        const shipselect3 = document.querySelector("#shipselect3");
        const next_level = document.querySelector("#nextlevel");
        const buy = document.querySelector("#buy");


        my_shop.style.display = "none";
        shipselect1.style.display = "none";
        shipselect2.style.display = "none";
 
        bought.style.display = "none";
        shipselect3.style.display = "none";
        next_level.style.display = "none";
        buy.style.display = "none";
        

        this.context = this.canvas.getContext('2d');
        this.background = new Background(this.width, this.height, this.level, this.context, this.bgsong, this.gold, this.ship_level, this);
        this.state = "fighting";
        this.background.animate();
        
        // for now the game just instantly plays the "level" which is currently misnamed as background
        // this.animate();
    }

    hellomoto()
    {
        const bought = document.querySelector("#bought");
        const buy = document.querySelector("#buy");
        if(this.gold >= 100000)
        {
            audio.buyship.play();
            buy.style.display = "none";
            bought.style.display = "flex";
            this.ship_level++;// or one
            this.gold -= 100000;
        }
    }

    endLevel()
    {
        const my_shop = document.querySelector("#shop");
        const ships = document.querySelector("#ships");
        const shipselect1 = document.querySelector("#shipselect1");
        const shipselect2 = document.querySelector("#shipselect2");
        const nextship1 = document.querySelector("#nextship");
        const nextship2 = document.querySelector("#nextship2");
        const bought = document.querySelector("#bought");

        const shipselect3 = document.querySelector("#shipselect3");
        const next_level = document.querySelector("#nextlevel");

        const buy = document.querySelector("#buy");

        this.background.bgsong.stop();
        this.gold = this.background.gold;
        this.ship_level = this.background.ship_level;
        this.level++;

        // this.background = null;
        //will need an object with all owned stats and purchased things when we get there to extract from background

        this.bgsong = audio.shopmusic;
        this.bgsong.play();

        my_shop.style.display = "flex";

        //the following code is super duper garbage and needs to be refactored (made for presentation's purpose last-minute cram)
        function enterShips()
        {
            my_shop.style.display = "none";
            audio.beep1.play();
            shipselect1.style.display = "flex"; 
            bought.style.display = "flex";
            next_level.style.display = "flex";
            next_level.addEventListener("click", this.start.bind(this), {once: true});

            function enterShips2()
            {
                shipselect1.style.display = "none";
                bought.style.display = "none";
                audio.beep1.play();
                buy.style.display = "flex";

                buy.addEventListener("click", () => {
                    this.hellomoto();
                }, {once: true});

                shipselect2.style.display = "flex"; 
                nextship2.style.zIndex = "7";              
                
                function enterShips3()
                {
                    shipselect2.style.display = "none";
                    buy.style.display = "none";
                    bought.style.display = "none";
                    audio.beep1.play();
                    shipselect3.style.display = "flex";            
                    
                    // nextship2.addEventListener("click", enterShips3.bind(this), {once: true});
                }
                nextship2.addEventListener("click", enterShips3.bind(this), {once: true});
            }
            nextship1.addEventListener("click", enterShips2.bind(this), {once: true});
        }
        //super duper garbage code end
        
        setTimeout(()=> 
        {
            ships.addEventListener("click", enterShips.bind(this), {once: true});
        }, 100);
        
        // //need a hashmap for level's bgsong
        // this.background= new Background(this.width, this.height, this.level, this.context, this.bgsong, this.gold, this.ship_level, this);
    }
   
}
