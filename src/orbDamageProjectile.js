import Projectile from './projectile'

export default class OrbDamageProjectile extends Projectile{
    constructor(position, velocity, radius, type, damage, blur=0) //owner might be dead code
    {
        super(position, velocity, radius, true, -1, type); //owner dead code
        this.blur = blur;
        this.damage = damage;
        this.type = type;
        this.stage = -1;
        this.timer = 0;
    }

    move() //default move, no acceleration. projectiles, stars, some enemy ships, drops, etc.
    {
        this.posX += this.velX;
        this.posY += this.velY;
        this.timer++;

        if(this.stage === -1)
        {
            if(this.posY < 287)
            {
                this.stage = 0;
            }
            else if (this.posY > 293)
            {
                this.velY = -1 * this.velY;
                this.stage = 0;
            }
            else if (this.posY < 289){
                this.velY = 1;
                this.stage = 1;
            }
            else if (this.posY > 291){
                this.velY = -1;
                this.stage = 1;
            }
            else{
                this.velY = 0;
                this.velX = 0;
                this.stage = 2;
            }
        }

        if(this.stage === 0 && this.posY >= 230 && this.posY < 287)
        {
            this.velX *= .9;
            this.velY *= .95;
            if(this.velY < 0.2)
            {
                this.velY = 0.2;
            }
        }
        else if(this.stage === 0 && this.posY >= 287 && this.posY <= 289)
        {
            this.velY = 1;
            this.stage = 1;
        }
        else if(this.stage === 0 && this.posY >= 291 && this.posY <= 293)
        {
            this.velY = -1;
            this.stage = 1;
        }
        else if (this.stage === 0 && this.posY > 293 && this.posY < 340)
        {
            this.velX *= .9;
            this.velY *= .95;

            if(this.velY > -0.2)
            {
                this.velY = -0.2;
            }
        }
        else if (this.stage === 1 && this.posY >= 289 && this.posY <= 291)
        {
            this.stage = 2;
            this.velY = 0;
        }
        else if (this.stage === 2 && this.timer >= 120)
        {
            this.stage = 3;
            this.velX = 0;
            this.velY = 7;
        }
    }

    draw(context)
    {
        function setShadow(ctx, color, ox, oy, blur) {
            ctx.shadowColor = color;
            ctx.shadowOffsetX = ox;
            ctx.shadowOffsetY = oy;
            ctx.shadowBlur = blur;
        }

        let gradient_a;
        let gradient_b;
        let gradient_c;
        let mid;
        let color;
        if (this.type === 0)
        {
            color = "blue";
            gradient_a = "white";
            gradient_b = "blue";
            gradient_c = "#0e1d9e"
            mid = 0.3
        }

   
        context.save();
        context.beginPath();
        setShadow(context, color, 0, 0, this.blur);
        let grd = context.createRadialGradient(this.posX, this.posY, 0, this.posX, this.posY, this.size / 2);
        if(gradient_c === undefined)
        {
            grd.addColorStop(0, gradient_a);
            grd.addColorStop(1, gradient_b);
        }
        else
        {
            grd.addColorStop(0, gradient_a);
            grd.addColorStop(mid, gradient_b);
            grd.addColorStop(1, gradient_c);
        }
        
        context.fillStyle = grd;

        // if(this.type === 7)
        // {
        //     // context.setTransform(1, 0, 0, 1, 150, 150);
        //     // context.rotate(3 * Math.PI/2);//I hoped this line would rotate it to point downards (so the enemy ship shoots downwards), but it just makes it disappear
        //     // context.scale(-1,1);
        //     context.arc(150, 150, 60, (Math.PI/180)*40, (Math.PI/180)*320);
        //     context.bezierCurveTo(110, 75, 110, 225, 196, 188);
        // }
        // else{
            context.arc(this.posX, this.posY, this.size, 0, Math.PI * 2, false);
        // }
        context.fill();
        context.closePath();
        context.restore();

        context.shadowBlur = 0;

        // context.save();
        // context.shadowColor = this.color;
        // context.shadowBlur = 9;
        // context.fillColor = this.color;
        // // context.translate(this.posX+this.width/2, this.posY+this.size/2);
        // // context.rotate(this.degrees*Math.PI/180.0);
        // // context.translate(-this.posX-this.width/2, -this.posY-this.size/2);
        // context.fillRect(this.posX, this.posY, 4, 32);
        // context.restore();

        // context.shadowBlur = 0;
    }

    leftX()
    {
        return this.posX;
    }

    rightX()
    {
        return this.posX + 2 * this.size;
    }

    upY()
    {
        return this.posY;
    }

    downY()
    {
        return this.posY + 2 * this.size;
    }
    
}