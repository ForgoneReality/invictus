let SAFEFRAMES = 5;

import CircleDamageProjectile from "./circleDamageProjectile";
import LaserDamageProjectile from "./laserDamageProjectile";


const TYPES2 = [
    { 
        //Basic Player Ship
        basehealth: 500,
        basedamage: 25,
        baseshield: 250,
        img: 'images/playership1.png',
        scale: .022, 
        defaultprojType: 0
    },
    {
            //Level 2 Ship
            basehealth: 1000,
            basedamage: 35,
            baseshield: 400,
            img: 'images/playership2.png',
            scale: .022, 
            defaultprojType: 1
    }
]
export default class Player {
    constructor(position) //more later, type?
    {
        this.posX = position[0];
        this.posY = position[1];
        this.velX = 0;
        this.velY = 0;

        this.canvasX = this.posX * 2;
        this.canvasY = this.posY + 50;
        this.ship_level = 0;

        const image = new Image();
        image.src  = TYPES2[this.ship_level].img;
        image.onload = () => {
            this.image = image;
            const SCALE = 0.02;
            this.width = image.width * SCALE;
            this.height = image.height * SCALE;
        }
        this.basehealth = TYPES2[this.ship_level].basehealth;
        this.health = this.basehealth; 
        this.baseshield = TYPES2[this.ship_level].baseshield;
        this.shield = this.baseshield;
        this.basedamage = TYPES2[this.ship_level].basedamage;
        this.regen = 0.05;

        this.movedX = 0;
        this.movedY = 0;
        this.degrees = 0;
        // this.initialThrottleY = 0;

        // this.color = "red";
        this.normalVector = [0,-1];
        this.projectileType = 0;
        this.shotsLeft = 0;
        this.shootTimer = 0;

        this.collided = 0;
        this.interval = 1; //multi-purpose for variying shots
    }

    draw(context, mouse_x, mouse_y)
    {
        if (this.image)
        {
        this.updateAngleAndNormalizedVector(mouse_x, mouse_y);
        // console.log(this.degrees);
        // console.log(this.normalVector);

        context.save();
        context.shadowColor = "red";
        if(this.shield >0 )
        {
            context.shadowBlur = 15;
        }
        else
        {
            context.shadowBlur = 0;
        }
        context.translate(this.posX+this.width/2, this.posY+this.height/2);
        context.rotate(this.degrees*Math.PI/180.0);
        context.translate(-this.posX-this.width/2, -this.posY-this.height/2);
        context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        context.restore();
        context.shadowBlur = 0;
        }


    }

    animate(context, mouse_x, mouse_y)
    {
        //BINDING KEYS DOES NOT WORK
        //It creates a lag between whether it determines a key is being tapped or held (~1 second)
        //which makes movement very, very slow and clunky
        //so have to do it this way instead. Neither keymaster.js's bind nor built-in events work
        // console.log(this.posX, this.posY);
        if(this.health < this.basehealth)
        {
            this.health += this.regen;
        }

        if(this.collided <= 0)
        {
            if(key.isPressed("up") || key.isPressed("w"))
            {

                this.power("up");
            }
            if(key.isPressed("right") || key.isPressed("d"))
            {
                this.power("right");
            }
            if(key.isPressed("down")|| key.isPressed("s"))
            {
                this.power("down");
            }
            if(key.isPressed("left")|| key.isPressed("a"))
            {
                this.power("left");
            }
        }
        else
        {
            this.collided -= 1;
        }
        
        this.move();
        this.applyGravity();
        if(mouse_x === -1 && this.mouse_y === -1)
            this.draw(context, this.posX, 0);
        else 
            this.draw(context, mouse_x, mouse_y);
    }

    move()
    {
        this.posX += this.velX;
        if(this.posX<50)
        {
            this.posX = 50;
        }
        if(this.posX>this.canvasX - 50)
        {
            this.posX = this.canvasX - 50;
        }
        this.posY += this.velY;
        if(this.posY<50)
        {
            this.posY = 50;
        }
        if(this.posY>this.canvasY - 50)
        {
            this.posY = this.canvasY - 50;
        }
    }

    levelup(level)
    {
        if (this.ship_level >= level)
        {
            return;
        }
        this.ship_level = level;
        this.projectileType = TYPES2[level].defaultprojType;
        
        if (level === 1)
        {
            const image = new Image();
            image.src  = TYPES2[level].img;
            image.onload = () => {
                this.image = image;
                const SCALE = 0.02;
                this.width = image.width * SCALE;
                this.height = image.height * SCALE;
            }
        } 
        this.basehealth = TYPES2[level].basehealth;
        this.health = this.basehealth;
        this.basedamage = TYPES2[level].basedamage;
        this.baseshield =  TYPES2[level].baseshield;
        this.shield = this.baseshield;
    }

    power(direction)
    {
        const MAXSPEED = 10;
        const MINSPEED = MAXSPEED * -1; //can also use Math.abs()
        switch(direction)
        {
            case "up":
                if(this.velY>-4)
                {
                    this.velY = -4;
                }
                else
                {
                this.velY -= 0.45;
                }
                if(this.velY < MINSPEED)
                {
                    this.velY = MINSPEED;
                }
                this.movedY = SAFEFRAMES;
                break;
            case "down":
                if(this.velY<4)
                {
                    this.velY = 4;
                }
                else
                {
                    this.velY += 0.45;
                }
                if(this.velY > MAXSPEED)
                {
                    this.velY = MAXSPEED;
                }
                this.movedY = SAFEFRAMES;
                break;
            case "right":
                if(this.velX<4)
                {
                    this.velX = 4;
                }
                else
                {
                this.velX += 0.45;
                }
                if(this.velX > MAXSPEED)
                {
                    this.velX = MAXSPEED;
                }
                this.movedX = SAFEFRAMES;
                break;
            case "left":
                if(this.velX>-4)
                {
                    this.velX = -4;
                }
                else
                {
                this.velX -= 0.45;
                }
                if(this.velX < MINSPEED)
                {
                    this.velX = MINSPEED;
                }
                this.movedX = SAFEFRAMES;
                break;
        }
    }
    
    applyGravity()
    {
        if(this.movedX <= 0)
        {
            let x = Math.abs(this.velX);
            if (x < 0.7)
            {
                this.velX = 0;
            }
            else if (x < 1.3)
            {
                this.velX = this.velX * 0.4;
            }
            else if (x < 2.5)
            {
                this.velX = this.velX * 0.6;
            }
            else if (x < 5)
            {
                this.velX = this.velX * 0.7;
            }
            else
            {
                this.velX = this.velX * 0.8;
            }

        }
        else
        {
            this.movedX -= 1;
        }
        if(this.movedY <= 0)
        {
            let y = Math.abs(this.velY);
            if (y < 0.7)
            {
                this.velY = 0;
            }
            else if (y < 1.3)
            {
                this.velY = this.velY * 0.4;
            }
            else if (y < 2.5)
            {
                this.velY = this.velY * 0.6;
            }
            else if (y < 5)
            {
                this.velY = this.velY * 0.7;
            }
            else
            {
                this.velY = this.velY * 0.8;
            }
        }
        else
        {
            this.movedY -= 1;
        }
    }

    shootProjectile(mouse_x, mouse_y)
    {
        let type = this.projectileType;
        let mx;
        let my;
        if(mouse_x === -1 && mouse_y === -1)
        {
            mx = this.realX();
            my = 0;
        }
        else
        {
            mx = mouse_x;
            my = mouse_y;
        }
        this.updateAngleAndNormalizedVector(mouse_x, mouse_y);
        let speed;
        let cooldown;
        switch(type)
        {
            case -1:
                this.shootTimer -= 1;
                return undefined;
                break;
            case 0: //red ball center
                speed = 12;
                cooldown = 8;
                if(this.shootTimer <= 0)
                {
                    let projs = [];
                    this.shootTimer = cooldown;
                    let offset_x = 17;
                    let offset_y = -30;// defaults for level === 1
                    if (this.interval === 1)
                    {
                        let rotate_scaler = this.offset(offset_x, offset_y);
                        projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler[0], this.realY() + rotate_scaler[1]], [speed * this.normalVector[0], speed*this.normalVector[1]], this.degrees, 20, 1, 0, this.basedamage, 4));
                        this.interval = 0;
                    }
                    else if (this.interval === 0)
                    {
                        let rotate_scaler2 = this.offset(offset_x * -1, offset_y);
                        projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler2[0], this.realY() + rotate_scaler2[1]], [speed * this.normalVector[0], speed*this.normalVector[1]], this.degrees, 20, 1, 0, this.basedamage, 4));
                        this.interval = 1;
                    }
                    return projs;
                }
                else
                {
                    this.shootTimer -= 1;
                    return undefined;
                }
            case 1: //basic lasers double
               
                speed = 12;
                cooldown = 12;
                if(this.shootTimer <= 0)
                {
                    let projs = [];
                    this.shootTimer = cooldown;
                    let offset_x = 17;
                    let offset_y = -40;// defaults for level === 1

                    let rotate_scaler = this.offset(offset_x, offset_y);
                    let rotate_scaler2 = this.offset(offset_x * -1, offset_y);
                    

                    projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler[0], this.realY() + rotate_scaler[1]], [speed * this.normalVector[0], speed*this.normalVector[1]], this.degrees, 20, 1, 0, this.basedamage, 4));
                    projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler2[0], this.realY() + rotate_scaler2[1]], [speed* this.normalVector[0], speed*this.normalVector[1]], this.degrees, 20, 1, 0, this.basedamage, 4));
                    return projs;
                }
                else
                {
                    this.shootTimer -= 1;
                    return undefined;
                }
                //remember to return an array!
                break;
            case 2: //double shot
                speed = 12;
                cooldown = 12;
                if(this.shootTimer <= 0)
                {
                    this.shotsLeft--;
                    let projs = [];
                    this.shootTimer = cooldown;
                    let offset_x = 17;
                    let offset_y = -40;// defaults for level === 1
                    if (this.ship_level === 0)
                    {
                        offset_y = -30;
                    }

                    let rotate_scaler = this.offset(offset_x, offset_y);
                    let rotate_scaler2 = this.offset(offset_x * -1, offset_y);
                    

                    let x = this.normalVector[0];
                    let y = this.normalVector[1];

                    let d = (this.degrees * Math.PI / 180);
                    let x_modifier2 = x * Math.cos(Math.PI / 6) - y * Math.sin(Math.PI / 6);
                    let y_modifier2 = x * Math.sin(Math.PI / 6) + y * Math.cos(Math.PI / 6);
                    let x_modifier = x * Math.cos(- Math.PI / 6) - y * Math.sin(- Math.PI / 6);
                    let y_modifier = x * Math.sin(- Math.PI / 6) + y * Math.cos(- Math.PI / 6);
                    console.log([x_modifier,y_modifier]);

                    projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler[0], this.realY() + rotate_scaler[1]], [speed * this.normalVector[0], speed*this.normalVector[1]], this.degrees, 20, 1, 0, this.basedamage, 4));
                    projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler2[0], this.realY() + rotate_scaler2[1]], [speed* this.normalVector[0], speed*this.normalVector[1]], this.degrees, 20, 1, 0, this.basedamage, 4));
                    projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler[0], this.realY() + rotate_scaler[1]], [speed * x_modifier2, speed * y_modifier2], this.degrees + 30, 20, 1, 0, this.basedamage, 4));
                    projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler2[0], this.realY() + rotate_scaler2[1]], [speed* x_modifier, speed * y_modifier], this.degrees - 30, 20, 1, 0, this.basedamage, 4));
                   
                    if (this.shotsLeft <= 0)
                    {
                        this.projectileType = TYPES2[this.ship_level].defaultprojType;
                    }
                    return projs;
                    
                }
                else
                {
                    this.shootTimer -= 1;
                    return undefined;
                }
            case 3:
                speed = 17;
                cooldown = 6;
                if(this.shootTimer <= 0)
                {
                    this.shotsLeft--;
                    let projs = [];
                    this.shootTimer = cooldown;
                    let offset_x = 0;
                    let offset_y = -40;// defaults for level === 1

                    let rotate_scaler = this.offset(offset_x, offset_y);

                    projs.push(new LaserDamageProjectile([this.realX() + rotate_scaler[0], this.realY() + rotate_scaler[1]], [speed * this.normalVector[0], speed*this.normalVector[1]], this.degrees, 20, 1, 3, this.basedamage * 2.5, 4, 2, "../images/gamma.png"));
                    if (this.shotsLeft <= 0)
                    {
                        this.projectileType = TYPES2[this.ship_level].defaultprojType;
                    }
                    
                    return projs;
                }
                else
                {
                    this.shootTimer -= 1;
                    return undefined;
                }
                //remember to return an array!
                break;

            default:
                // console.error("unknown projectile type");
        }
    }

    dealDamage(dmg)
    {
        if(this.shield > 0)
        {
            this.shield -= dmg;
            if(this.shield < 0)
            {
                this.shield = 0;
            }
        }
        else
        {
            this.health -= dmg;
            if(this.health <= 0)
            {
                // alert("YOU LOSE!");
                exit;
            }
        }
       
    }

    updateAngleAndNormalizedVector(mouse_x, mouse_y)
    {
        let distX = mouse_x - this.realX();
        let distY = mouse_y - this.realY();
        if(distX === 0)
        {
            if(this.realY() > mouse_y)
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
        return this.posX + this.width / 2 + 1;
    }

    realY(){ 
        return this.posY + this.height * .3;
    }

    //#offset returns the new (x,y) relative to center after rotating to this.degrees
    offset(x, y, deg = 0) //x,y relative to center, which should be realX() and real(Y), prior to rotation
    {
        //apply matrix transformation of form 
        //R = |cos θ  - sin θ |
        //    | sin θ   cos θ |
        //to apply rotational transformation by changing basis vectors 

        let degrees = this.degrees + deg; //setup
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
