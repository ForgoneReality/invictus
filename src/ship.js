// let SAFEFRAMES = 5;

import CircleDamageProjectile from "./circleDamageProjectile";
import LaserDamageProjectile from "./laserDamageProjectile";

const TYPES = [
    { 
        //Basic Enemy Ship
        velocity: [0, 1.65 * (0.4 + Math.random() * 0.8)],
        endvelocity: [0, 1.65],
        health: 135,
        damage: 50,
        img: '../images/enemyship1.png',
        color: "red",
        blur: 0,
        rotatable: false,
        scale: .022, 
        shootTimerInit: 50, 
        gold: 1500,
        value: 1,
        shotsLeft: 40
    },
    { 
        //Purple Corner Shooting Enemy Ship
        velocity: [0, 1    * (0.4 + Math.random() * 0.8)],
        endvelocity: [0, 1],
        health: 175,
        damage: 60,
        img: '../images/enemyship2.png',
        color: "pink",
        blur: 0,
        rotatable: false,
        scale: .022, 
        shootTimerInit: 50, 
        gold: 2000,
        value: 1.03,
        shotsLeft: 40
    },
    {
         //yellow dude who zooms in but shoot slows and has pauses
         velocity: [0, 5],
         endvelocity: [0, 1.4],
         health: 175,
         damage: 40,
         img: '../images/enemyship3.png',
         color: "yellow",
         blur: 0,
         rotatable: false,
         scale: .022, 
         shootTimerInit: 50, 
         gold: 2000,
         value: 1.04,
         shotsLeft: 8
    },
    {
        //Blue dude who rapidly zooms in 
        velocity: [0, 10.2],
        endvelocity: [0, 1.8],
        health: 150,
        damage: 33,
        img: '../images/enemyship4.png',
        color: "cyan",
        blur: 0,
        rotatable: true,
        scale: .022, 
        shootTimerInit: 32, 
        gold: 2200,
        value: 1.06,
        shotsLeft: 8
    }


];

export default class Ship {
    constructor(position, type, background) //more later, type?
    {
        this.posX = position[0];
        this.posY = position[1];

        this.canvasX = this.posX;
        this.canvasY = this.posY;

        this.collided = 0;

        this.background = background;
        this.type = type;
        this.canvasBottom = document.getElementById('game-canvas').getAttribute('height');
        this.setup(type);
    }

    setup(type)
    {
        TYPES[type];

        const image = new Image();
        image.src = TYPES[type].img;
        image.onload = () => {
            this.image = image;
            this.width = image.width * TYPES[type].scale;
            this.height = image.height * TYPES[type].scale;
        }

        this.velX = TYPES[type].velocity[0];
        this.velY = TYPES[type].velocity[1];
        this.health = TYPES[type].health; 
        this.damage = TYPES[type].damage;

        this.degrees = 0;

        this.color = TYPES[type].color;
        this.blur = TYPES[type].blur;
        this.normalVector = [0,1];
        this.rotatable = TYPES[type].rotatable;

        this.shootTimer = TYPES[type].shootTimerInit;
        this.gold = TYPES[type].gold;
        this.value = TYPES[type].value;
        this.shotsLeft = TYPES[type].shotsLeft;
    }

    draw(context)
    {
        if (this.image)
        {
            if (this.rotatable) this.updateAngleAndNormalizedVector();
            context.save();
            context.shadowColor = this.color;
            context.shadowBlur = this.blur;
            context.translate(this.posX+this.width/2, this.posY+this.height/2);
            context.rotate(this.degrees*Math.PI/180.0);
            context.translate(-this.posX-this.width/2, -this.posY-this.height/2);
            context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
            context.restore();
        }
    }

    animate(context)
    {
        // console.log("posX", this.posX);
        // console.log("posY", this.posY);
        if(this.posY+this.height / 2 + 1 >= 0)
        {
            this.move();
            this.shootProjectile();
            this.draw(context);
        }
        else
        {
            this.posY += 1;
        }
    }

    move()
    {
        if (this.collided > 1)
        {
            this.posX += this.velX;
            this.posY += this.velY;
            this.velX = this.velX * 0.9;
            this.velY = this.velY * 0.9;
            this.collided -= 1;
            return;
        }
        else if(this.collided === 1)
        {
            this.posX += this.velX;
            this.posY += this.velY;
            this.velX = TYPES[this.type].endvelocity[0];
            this.velY = TYPES[this.type].endvelocity[1];
            this.collided -= 1;
            return;
        }
        //to be implemented
        if (this.type === 0)
        {   
            if(this.posY + 100 < this.background.player.posY)
            {
                if(this.posX > this.background.player.posX)
                {
                    this.velX = -0.4;
                }
                else
                    this.velX = 0.4;

                this.posX += this.velX;

            }
            this.posY += this.velY;
            
        }
        else if (this.type === 1)
        {
            this.posX += this.velX;
            this.posY += this.velY;
        }

        else if (this.type === 2)
        {
            this.posY += this.velY;
            if(this.velY > 1.4)
            {
                this.velY -= 0.4;
            }

            if(this.posY + 100 < this.background.player.posY)
            {
                if(this.posX > this.background.player.posX)
                {
                    this.velX = -0.3;
                }
                else
                    this.velX = 0.3;

                this.posX += this.velX;
            }
        }
        else if (this.type === 3)
        {
            this.posY += this.velY;
            if(this.velY > 1.8)
            {
                this.velY -= 0.4;
            }
 
        }


    }

    // fire()
    // {
    //     this.shootProjectile();
    //     // switch(this.type)
    //     // {
    //     //     case 0:
    //     //         this.shootProjectile();
    //     //         break;
    //     //     case 1:
    //     //         this.shootProjectile();
    //     //         break;
    //     //     case 2:
    //     //         this.shootProjectile();
    //     //         break;
    //     //     case 3:
    //     //         this.shootProjectile();
    //     //         break;
    //     // }
    // }


    // shootProjectile(target_x = this.realX(), target_y = this.canvasBottom)
    shootProjectile(posX, posY, x_velocity, y_velocity)
    {
        let mx = posX;
        let my = posY;

        let speed;
        let cooldown;
        switch(this.type)
        {
            
            case 0: //red ball center
                speed = 3.3;
                cooldown = 100;
                
                if(this.shootTimer <= 0)
                {
                    this.shootTimer = cooldown;
                    let proj = new CircleDamageProjectile([this.realX(), this.realY()+30], [speed * this.normalVector[0], speed*this.normalVector[1]], 4.5, 2, 0, this.damage, 20);
                    this.background.enemyprojectiles.push(proj);
                    this.shotsLeft -= 1;
                }
                else
                {
                    this.shootTimer -= 1;
                    return undefined;
                }
                break;

            case 1:
                speed = 5.5;
                cooldown = 150;
                if(this.shootTimer <= 0)
                {
                    this.shootTimer = cooldown;
                    let proj = new CircleDamageProjectile([this.realX()+40, this.realY()+30], [speed * Math.sqrt(2) / 2, speed * Math.sqrt(2) / 2], 6, 2, 1, this.damage, 20, -1 * Math.PI / 4, 3 * Math.PI / 4);
                    this.background.enemyprojectiles.push(proj);

                    let proj2 = new CircleDamageProjectile([this.realX()-40, this.realY()+30], [speed * -1 * Math.sqrt(2) / 2,  speed * Math.sqrt(2) / 2], 6, 2, 1, this.damage, 20, Math.PI / 4, 5 * Math.PI / 4);
                    this.background.enemyprojectiles.push(proj2);

                    let proj3 = new CircleDamageProjectile([this.realX()+40, this.realY()-30], [speed * Math.sqrt(2) / 2, -1 * speed * Math.sqrt(2) / 2], 6, 2, 1, this.damage, 20, 5 * Math.PI / 4, 9 * Math.PI / 4);
                    this.background.enemyprojectiles.push(proj3);

                    let proj4 = new CircleDamageProjectile([this.realX()-40, this.realY()-30], [speed * -1 * Math.sqrt(2) / 2,  -1 * speed * Math.sqrt(2) / 2], 6, 2, 1, this.damage, 20, 3 * Math.PI / 4, 7 * Math.PI / 4);
                    this.background.enemyprojectiles.push(proj4);
                    this.shotsLeft -= 1;

                }

                else
                {
                    this.shootTimer -= 1;
                    return undefined;
                }
                break;
            case 2: 
                speed = 3.5;
                cooldown = 18;
                if (this.shotsLeft <= 0) 
                {
                    this.shootTimer = 150;
                    this.shotsLeft = 8;
                    return undefined;
                }
                if(this.shootTimer <= 0)
                {
                    this.shootTimer = cooldown;
                    let offset;
                    if(this.shotsLeft % 2 === 0)
                    {
                        offset = 26.5;
                    }
                    else
                    {
                        offset = -26.5;
                    }
                    let proj = new LaserDamageProjectile([this.realX() + offset, this.realY()+30], [0, speed], 0, 15, 2, 2, this.damage, 25);
                    this.background.enemyprojectiles.push(proj);
                    this.shotsLeft -= 1;
                    //position, velocity, angle, length, owner, type, damage, blur=0, width=2)
                }
                else
                {
                    this.shootTimer -= 1;
                }
                    break;
            case 3: 
                speed = 4;
                cooldown = 5.5;
                if (this.shotsLeft <= 0) 
                {
                    this.shootTimer = 250;
                    this.shotsLeft = 8;
                    return undefined;
                }
                if(this.shootTimer <= 0)
                {
                    this.shootTimer = cooldown;
                    let scatter_x = this.normalVector[0] * (Math.random(0.4) + 0.8);
                    let scatter_y = this.normalVector[1] * (Math.random(0.4) + 0.8);
                    let proj = new CircleDamageProjectile([this.realX(), this.realY()+30], [speed * scatter_x, speed*scatter_y], 4.5, 2, 3, this.damage, 20);
                    this.background.enemyprojectiles.push(proj);
                    this.shotsLeft -= 1;
                }
                else
                {
                    this.shootTimer -= 1;
                }

                break;

            default:
                console.error("unknown projectile type");
        }
    }


    //NOT SURE IF THIS WORKS
    updateAngleAndNormalizedVector()
    {
        let target_x = this.background.player.realX();
        let target_y = this.background.player.realY()   ;
        let distX = target_x - this.realX();
        let distY = target_y - this.realY();
        if(distX === 0)
        {
            if(target_y > this.realY())
            {
                this.degrees = 180;
            }
            else
                this.degrees = 0;
        }
        else if (distY === 0)
        {
            if(distX < 0)
            {
                this.degrees = 90;
            }
            else
            {
                this.degrees = 270;
            }
        }
        else
        {//beware y is on top not bototm
            if(distX < 0)
            {
                this.degrees = 90 + ((Math.atan(distY / distX)) * 180.0 / Math.PI);
            }
            else
            {
                this.degrees = 270 + ((Math.atan(distY / distX)) * 180.0 / Math.PI);
            }
        }

        length = Math.sqrt(distX * distX + distY * distY);
        // this.normalVector = [Math.abs(distX) / length, Math.abs(distY) / length];
        this.normalVector = [distX / length, distY / length];
    }

    realX(){ //INCOMPLETE - NEEDS TO FACTOR IN ANGLE!! ... or does it? center doesn't change when angle changes
        return this.posX + this.width / 2;
    }

    realY(){ 
        if(this.type === 1)
        {
            return this.posY + this.height *.4;
        }
        else
        return this.posY + this.height / 2;
    }

    //#offset returns the new (x,y) relative to center after rotating to this.degrees
    offset(x, y) //x,y relative to center, which should be realX() and real(Y), prior to rotation
    {
        if(this.degrees === undefined && this.rotatable) //shouldn't need this but jic
        {
            this.updateAngleAndNormalizedVector();
        }
        
        //apply matrix transformation of form 
        //R = |cos θ  - sin θ |
        //    | sin θ   cos θ |
        //to apply rotational transformation by changing basis vectors 

        let degrees = this.degrees; //setup
        //usually -90 but because y is going positive going down, don't have to

        let c = Math.cos(degrees * Math.PI / 180.0);
        let s = Math.sin(degrees * Math.PI / 180.0);

        return [x * c - y * s, x * s + y * c];
    }

    leftX()
    {
        return this.posX;
    }

    rightX()
    {
        return this.posX + this.width;
    }

    upY()
    {
        return this.posY;
    }

    downY()
    {
        return this.posY + this.height;
    }
}
