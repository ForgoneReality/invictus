// let SAFEFRAMES = 5;

import CircleDamageProjectile from "./circleDamageProjectile";
import LaserDamageProjectile from "./laserDamageProjectile";

const TYPES = [
    { 
        //Basic Enemy Ship
        velocity: [0, 1.55],
        health: 125,
        damage: 50,
        img: '../images/enemyship1.png',
        color: "red",
        blur: 0,
        rotatable: false,
        scale: .022, 
        shootTimerInit: 50, 
        gold: 1000,
        value: 1
    },
    { 
        //Purple Corner Shooting Enemy Ship
        velocity: [0, 1.55],
        health: 175,
        damage: 50,
        img: '../images/enemyship2.png',
        color: "pink",
        blur: 0,
        rotatable: false,
        scale: .022, 
        shootTimerInit: 50, 
        gold: 2000,
        value: 2
    }
];

export default class Ship {
    constructor(position, type, background) //more later, type?
    {
        this.posX = position[0];
        this.posY = position[1];

        this.canvasX = this.posX;
        this.canvasY = this.posY;

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

        this.degrees = 180;

        this.color = TYPES[type].color;
        this.blur = TYPES[type].blur;
        this.normalVector = [0,1];
        this.rotatable = TYPES[type].rotatable;

        this.shootTimer = TYPES[type].shootTimerInit;
        this.gold = TYPES[type].gold;
    }

    draw(context, target_x = this.posX, target_y = this.canvasbottom)
    {
        if (this.image)
        {
            if (this.rotatable) this.updateAngleAndNormalizedVector(target_x, target_y);
            context.save();
            context.shadowColor = this.color;
            context.shadowBlur = this.blur;
            // context.translate(this.posX+this.width/2, this.posY+this.height/2);
            // context.rotate(this.degrees*Math.PI/180.0);
            // context.translate(-this.posX-this.width/2, -this.posY-this.height/2);
            context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
            context.restore();
        }
        else
        {
            // console.error("Enemy Ship not loaded");
        }
    }

    animate(context)
    {
        // console.log("posX", this.posX);
        // console.log("posY", this.posY);
        if(this.posY+this.height / 2 + 1 >= 0)
        {
            this.move();
            this.fire();
            this.draw(context);
        }
        else
        {
            this.posY += 1;
        }
    }

    move()
    {
        //to be implemented
        this.posX += this.velX;
        this.posY += this.velY;
    }

    fire()
    {
        switch(this.type)
        {
            case 0:
                this.shootProjectile();
                break;
            case 1:
                this.shootProjectile();
                break;
        }
    }


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
                }
                else
                {
                    this.shootTimer -= 1;
                    return undefined;
                }
                break;

            case 1:
                speed = 3.5;
                cooldown = 150;
                if(this.shootTimer <= 0)
                {
                    this.shootTimer = cooldown;
                    let proj = new CircleDamageProjectile([this.realX()+40, this.realY()+30], [speed * Math.sqrt(2) / 2, speed * Math.sqrt(2) / 2], 4.5, 2, 1, this.damage, 20, -1 * Math.PI / 4, 3 * Math.PI / 4);
                    this.background.enemyprojectiles.push(proj);

                    let proj2 = new CircleDamageProjectile([this.realX()-40, this.realY()+30], [speed * -1 * Math.sqrt(2) / 2,  speed * Math.sqrt(2) / 2], 4.5, 2, 1, this.damage, 20, Math.PI / 4, 5 * Math.PI / 4);
                    this.background.enemyprojectiles.push(proj2);

                    let proj3 = new CircleDamageProjectile([this.realX()+40, this.realY()-30], [speed * Math.sqrt(2) / 2, -1 * speed * Math.sqrt(2) / 2], 4.5, 2, 1, this.damage, 20, 5 * Math.PI / 4, 9 * Math.PI / 4);
                    this.background.enemyprojectiles.push(proj3);

                    let proj4 = new CircleDamageProjectile([this.realX()-40, this.realY()-30], [speed * -1 * Math.sqrt(2) / 2,  -1 * speed * Math.sqrt(2) / 2], 4.5, 2, 1, this.damage, 20, 3 * Math.PI / 4, 7 * Math.PI / 4);
                    this.background.enemyprojectiles.push(proj4);

                }
                else
                {
                    this.shootTimer -= 1;
                    return undefined;
                }
                break;
            // case 1: //primitive lasers center
            //     let speed1 = 12;
            //     let cooldown1 = 12;
            //     if(this.shootTimer === 0)
            //     {
            //         this.shootTimer = cooldown1;
            //         let proj = new LaserDamageProjectile([this.realX(), this.realY()], [speed1 * this.normalVector[0], speed1*this.normalVector[1]], 20, 1, "red", 25, 4);
            //         return [proj];
            //     }
            //     else
            //     {
            //         this.shootTimer -= 1;
            //         return undefined;
            //     }
            //     break;
            // case 2: //basic lasers double
               
            //     let speed2 = 12;
            //     let cooldown2 = 12;
            //     if(this.shootTimer === 0)
            //     {
            //         let projs = [];
            //         this.shootTimer = cooldown2;
            //         let offset_x = 17;
            //         let offset_y = -30;// defaults for level === 1
            //         if (this.ship_level === 2)
            //         {
            //             offset_x = 17;
            //             offset_y = -40;
            //         }
                
            //         let rotate_scaler = this.offset(offset_x, offset_y);
            //         let rotate_scaler2 = this.offset(offset_x * -1, offset_y);

            //         projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler[0], this.realY() + rotate_scaler[1]], [speed2 * this.normalVector[0], speed2*this.normalVector[1]], this.degrees, 20, 1, "red", 25, 4));
            //         projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler2[0], this.realY() + rotate_scaler2[1]], [speed2 * this.normalVector[0], speed2*this.normalVector[1]], this.degrees, 20, 1, "red", 25, 4));
            //         return projs;
            //     }
            //     else
            //     {
            //         this.shootTimer -= 1;
            //         return undefined;
            //     }
            //     //remember to return an array!
            //     break;
            default:
                console.error("unknown projectile type");
        }
    }


    //NOT SURE IF THIS WORKS
    updateAngleAndNormalizedVector(target_x, target_y)
    {
        let distX = target_x - this.realX();
        let distY = target_y - this.realY();
        if(distX === 0)
        {
            if(this.realY() > target_y)
            {
                this.degrees = 180;
            }
            else
                this.degrees = 0;
        }
        else if (distY === 0)
        {
            if(distX > 0)
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
            if(distX > 0)
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
        return this.posY + this.height / 2;
    }

    //#offset returns the new (x,y) relative to center after rotating to this.degrees
    offset(x, y) //x,y relative to center, which should be realX() and real(Y), prior to rotation
    {
        if(this.degrees === undefined && this.rotatable) //shouldn't need this but jic
        {
            this.updateAngleAndNormalizedVector(target_x, target_y);
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
