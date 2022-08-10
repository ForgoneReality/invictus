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

        this.ships_owned = []; 
        this.all_ships = [
            {
                minimum_level: 0,
                price: -1,
                ship_id: 0, //or level?
                stars: 1,
                skills: 0,
                model_name: "RS Fighter",
                health_amt: 1,
                dmg_amt: 1,
                ship_img: 'images/playership1.png',
                ship_scale: 0.022
            },
            {
                minimum_level: 1,
                price: -1, //until tutorial is made
                ship_id: 1,
                stars: 2,
                skills: 1,
                model_name: "RS Essence",
                health_amt: 2,
                dmg_amt: 1,
                ship_img: 'images/playership2.png',
                ship_scale: 0.022
                //additional?
            },
            {
                minimum_level: 2,
                price: 250000,
                ship_id: 2,
                stars: 3,
                skills: 3,
                model_name: "RS Vision",
                health_amt: 3,
                dmg_amt: 2,
                ship_img: 'images/playership3.png',
                ship_scale: 0.022
            },
            {
                minimum_level: 4,
                price: 1000000,
                ship_id: 3,
                stars: 4,
                skills: 5,
                model_name: "RS Conquest",
                health_amt: 4,
                dmg_amt: 3,
                ship_img: 'images/playership4.png',
                ship_scale: 0.022
            }

        ];

        this.displayed_atm_container = [];
        this.displayed_atm_id = -1;
        this.intro_screen();

        // this.loading_screen();

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

    intro_screen()
    {   
        setTimeout( () => {
            const loading = document.querySelector("#loading");
            const intro = document.querySelector("#intro-text");
            const recommended = document.querySelector("#recommended");

            loading.style.display = "none";
            recommended.style.display = "none";
            intro.style.display = "flex";
        
            document.body.addEventListener('click', () => {
                intro.style.display = "none";
                this.playSound(audio.mountainpeak);
                this.loading_screen();
            }, {once: true});
        }, 6000);   
    }

    loading_screen()
    {
        const loadingscreen = document.querySelectorAll('.mainmenu');
        const new_game = document.querySelector('#new-game-butt');
        const load_game = document.querySelector('#load-game-butt');
        const howtoplay = document.querySelector('#instructions');
        
        loadingscreen.forEach( (thing) =>{
            thing.style.display = "block";
        });
        // const canvaser = document.querySelector('#game-canvas');
        
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

        const nextship1 = document.querySelector("#nextship");
        const nextship2 = document.querySelector("#nextship2");
        const bought = document.querySelector("#bought");

        const next_level = document.querySelector("#nextlevel");
        const buy = document.querySelector("#buy");
        my_shop.style.display = "none";
        next_level.style.display = "none";

        if(this.level === 2)
        {
            this.playSound(audio.orbit);
        }

        this.context = this.canvas.getContext('2d');
        this.background = new Background(this.width, this.height, this.level, this.context, this.bgsong, this.gold, this.ship_level, this);
        this.state = "fighting";
        this.background.animate();
        
        // for now the game just instantly plays the "level" which is currently misnamed as background
        // this.animate();
    }

    displayCurrentShip()
        {
            let info = this.all_ships[this.displayed_atm_id];
            console.log("info:", info);

            const leftside = document.getElementById("ships-leftside-text");
            leftside.style.display = "flex";
            this.displayed_atm_container.push(leftside);

            let health_img;
            switch(info.health_amt)
            {
                case 1:
                    health_img = document.querySelector("#hp1");
                    break;
                case 2:
                    health_img = document.querySelector("#hp2");
                    break;
                case 3:
                    health_img = document.querySelector("#hp3");
                    break;
                case 4:
                    health_img = document.querySelector("#hp4");
                    break;
                case 5:
                    health_img = document.querySelector("#hp5");
                    break;
                //higher cases... secret ships?
                default:
                    break;
            }
            health_img.style.display = "flex";
            this.displayed_atm_container.push(health_img);

            //ship name

            const model_name = document.getElementById("model-name-text");
            model_name.innerHTML = info.model_name;

            const model_name_container = document.querySelector("#model-name");
            model_name_container.style.display = "flex";
            this.displayed_atm_container.push(model_name_container);


            let stars_img;
            switch(info.stars)
            {
                case 1:
                    stars_img = document.querySelector("#one-star");
                    break;
                case 2:
                    stars_img = document.querySelector("#two-stars");
                    break;
                case 3:
                    stars_img = document.querySelector("#three-stars");
                    break;
                case 4:
                    stars_img = document.querySelector("#four-stars");
                    break;
                //higher cases when needed
                default:
                    break;
            }
            stars_img.style.display = "flex";
            this.displayed_atm_container.push(stars_img);

            
            const skills_number = document.getElementById("skills-number-text");
            skills_number.innerHTML = info.skills;

            const skills_number_container = document.querySelector("#skills-number");
            skills_number_container.style.display = "flex";
            this.displayed_atm_container.push(skills_number_container);


            let damage_img;
            switch(info.dmg_amt)
            {
                case 1:
                    damage_img = document.querySelector("#dmg1");
                    break;
                case 2:
                    damage_img = document.querySelector("#dmg2");
                    break;
                case 3:
                    damage_img = document.querySelector("#dmg3");
                    break;
                case 4:
                    damage_img = document.querySelector("#dmg4");
                    break;
                case 5:
                    damage_img = document.querySelector("#dmg5");
                    break;
                //higher cases... secret ships?
                default:
                    break;
            }
            damage_img.style.display = "flex";
            this.displayed_atm_container.push(damage_img);


            let ship_img;
            switch(info.ship_id)
            {
                case 0: 
                    ship_img = document.querySelector("#shippie1");
                    break;
                case 1:
                    ship_img = document.querySelector("#shippie2");
                    break;
                case 2:
                    ship_img = document.querySelector("#shippie3");
                    break;
                case 3:
                    ship_img = document.querySelector("#shippie4");
                    break;
                //higher cases... secret ships?
                default:
                    break;
            }
            ship_img.style.display = "flex";
            this.displayed_atm_container.push(ship_img);

            let the_big_button;
            if(info.minimum_level > this.level)
            {
                the_big_button = document.querySelector("#locked");
            }
            else if(info.price === -1 && this.displayed_atm_id === this.ship_level)
            {
                the_big_button = document.querySelector("#chosen-ship");
            }
            else if(info.price === -1)
            {
                the_big_button = document.querySelector("#select-ship");
                the_big_button.addEventListener("click", ()=>{
                    this.ship_level = this.displayed_atm_id;
                    const chosen = document.querySelector("#chosen-ship");
                    chosen.style.display = "flex";
                    this.displayed_atm_container.push(chosen);
                    the_big_button.style.display = "none";
                    audio.buyship.play();
                    //can techncially remove big button but w/e
                }, {once: true})
            }
            else
            {
                the_big_button = document.querySelector("#priced-ship");
                the_big_button.addEventListener("click", ()=>{
                    if(this.gold >= info.price)
                    {
                        this.gold -= info.price;
                        audio.buyship.play();
                        this.all_ships[this.displayed_atm_id].price = -1;
                        this.ship_level = this.displayed_atm_id;
                        const chosen = document.querySelector("#chosen-ship");
                        chosen.style.display = "flex";
                        this.displayed_atm_container.push(chosen);
                        the_big_button.style.display = "none";
                    }
                    //can techncially remove big button but w/e
                }, {once: true})
            }

            the_big_button.style.display = "flex";
            this.displayed_atm_container.push(the_big_button);
    }

    nextShip()
    {
        if(this.displayed_atm_id < this.all_ships.length - 1)
        {
            audio.beep1.play();
            console.log(this.displayed_atm_container, "hello?");
            this.displayed_atm_container.forEach((ele) => {
                ele.style.display = "none";
            });
            this.displayed_atm_container = [];
            this.displayed_atm_id++;
            this.displayCurrentShip();
        }
        else
        {
            audio.beep2.play();
        }
    }

    prevShip()
    {
        if(this.displayed_atm_id >= 1)
        {
            audio.beep1.play();
            this.displayed_atm_container.forEach((ele) => {
                ele.style.display = "none";
            });
            this.displayed_atm_container = [];
            this.displayed_atm_id--;
            this.displayCurrentShip();
        }
        else
        {
            audio.beep2.play();
        }
    }

    endLevel()
    {
        const my_shop = document.querySelector("#shop");
        const ships = document.querySelector("#ships");
        const shipselect = document.querySelector("#shipselect");
        const nextship = document.querySelector("#nextship");
        const bought = document.querySelector("#bought");

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

        function enterShips()
        {
            my_shop.style.display = "none";
            audio.beep1.play();
            // shipselect1.style.display = "flex"; 
            shipselect.style.display = "flex";  
            // bought.style.display = "flex";
            next_level.style.display = "flex"; //this is in the wrong place for sure!!!!!!!!!!!!!!!!
            next_level.addEventListener("click", () => {
                this.displayed_atm_container.forEach((ele) => {
                    ele.style.display = "none";
                });
                shipselect.style.display = "none";  
                next_level.style.display = "none";
                if(this.bgsong!= null)
                {
                    this.bgsong.stop();
                }

                this.displayed_atm_container = [];
                this.start();
            }
            , {once: true});
            this.displayed_atm_id = this.ship_level;
            this.displayCurrentShip();

            nextship.addEventListener("click", this.nextShip.bind(this));
            prevship.addEventListener("click", this.prevShip.bind(this));           
        }
        
        setTimeout(()=> 
        {
            ships.addEventListener("click", enterShips.bind(this), {once: true});
        }, 100);
        
        // //need a hashmap for level's bgsong
        // this.background= new Background(this.width, this.height, this.level, this.context, this.bgsong, this.gold, this.ship_level, this);
    }
   
}
