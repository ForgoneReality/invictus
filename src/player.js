let SAFEFRAMES = 5;

import CircleDamageProjectile from "./circleDamageProjectile";
import LaserDamageProjectile from "./laserDamageProjectile";

export default class Player {
    constructor(position, context) //more later, type?
    {
        this.posX = position[0];
        this.posY = position[1];
        this.velX = 0;
        this.velY = 0;

        this.canvasX = this.posX * 2;
        this.canvasY = this.posY + 50;

        const image = new Image();
        image.src  = '../images/playership1.png';
        image.onload = () => {
            this.image = image;
            // const SCALE = 1;
            this.width = image.width;
            this.height = image.height;
        }

        this.movedX = 0;
        this.movedY = 0;
        this.degrees = 0;
        // this.initialThrottleY = 0;

        // this.color = "red";
        this.normalVector = [0,-1];
        this.shootTimer = 0;
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
            context.shadowBlur = 9;
            context.translate(this.posX+this.width/2, this.posY+this.height/2);
            context.rotate(this.degrees*Math.PI/180.0);
            context.translate(-this.posX-this.width/2, -this.posY-this.height/2);
            context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
            context.restore();
        }
        else
        {
            console.error("Ship not loaded");
        }
    }

    animate(context, mouse_x, mouse_y)
    {
        //BINDING KEYS DOES NOT WORK
        //It creates a lag between whether it determines a key is being tapped or held (~1 second)
        //which makes movement very, very slow and clunky
        //so have to do it this way instead. Neither keymaster.js's bind nor built-in events work
        console.log(this.posX, this.posY);
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

    // bindKeys()
    // {
    //     let player = this;
    //     key('up', function(){ player.power("up")});
    //     key('left', function(){ player.power("left")});
    //     key('down', function(){ player.power("down") });
    //     key('right', function(){ player.power("right")});


    //     // key('space', function(){ ship.fireBullet() });

    // }

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

    shootProjectile(mouse_x, mouse_y, type = 0)
    {
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
        switch(type)
        {
            case 0: //red ball center
                let speed = 10;
                let cooldown = 15;
                if(this.shootTimer === 0)
                {
                    this.shootTimer = cooldown;
                    let proj = new CircleDamageProjectile([this.realX(), this.realY()], [speed * this.normalVector[0], speed*this.normalVector[1]], 2, 1, "red", 25, 4);
                    return [proj];
                }
                else
                {
                    this.shootTimer -= 1;
                    return undefined;
                }
                break;
            case 1: //primitive lasers center
                let speed1 = 12;
                let cooldown1 = 12;
                if(this.shootTimer === 0)
                {
                    this.shootTimer = cooldown1;
                    let proj = new LaserDamageProjectile([this.realX(), this.realY()], [speed1 * this.normalVector[0], speed1*this.normalVector[1]], 20, 1, "red", 25, 4);
                    return [proj];
                }
                else
                {
                    this.shootTimer -= 1;
                    return undefined;
                }
                break;
            case 2: //basic lasers double
                //remember to return an array!
                break;
            default:
                console.error("unknown projectile type");
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

    realX(){ //INCOMPLETE - NEEDS TO FACTOR IN ANGLE!!
        return this.posX + this.width / 2;
    }

    realY(){ //INCOMPLETE - NEEDS TO FACTOR IN ANGLE!!
        return this.posY + this.height / 2;
    }
}
