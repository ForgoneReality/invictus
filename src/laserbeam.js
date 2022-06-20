//projectile.js
//just pass context around into draw and animate specifically


export default class LaserBeam {
    constructor(position, velocity, length, width, damage, type, angle)//null optional
    {
        this.posX = position[0];
        this.posY = position[1];
        this.velX = velocity[0];
        this.velY = velocity[1];
        this.length = length;
        this.width = width;
        this.type = type;
        this.damage = damage;
        this.angle = angle;
    }

    draw(context)
    {
        function setShadow(ctx, color, ox, oy, blur) {
            ctx.shadowColor = color;
            ctx.shadowOffsetX = ox;
            ctx.shadowOffsetY = oy;
            ctx.shadowBlur = blur;
        }

        let color;
        if(this.type === 0)
        {
            color = "red";
        }
    
        context.save();
        // setShadow(context, color, 0, 0, 25);
        context.fillStyle = "white";
        // context.translate(this.posX+this.width/2, this.posY+this.size/2);
        // context.rotate(this.degrees*Math.PI/180.0);
        // context.translate(-this.posX-this.width/2, -this.posY-this.size/2);

        context.fillRect(this.posX - this.width / 4, this.posY + 1.5, this.width/2, this.length);

        let grd = context.createLinearGradient(this.posX - this.width / 4, this.posY, this.posX - this.width / 2, this.posY);
        context.fillStyle = grd;
        context.fillRect(this.posX - this.width / 2, this.posY, this.width/4, this.length);



        context.fillRect(this.posX + this.width / 4, this.posY, this.width/4, this.length);
        
        context.restore();

        context.shadowBlur = 0;
    }

    animate(context)
    {
        this.move();
        this.draw(context);
    }

    move() //default move, no acceleration. projectiles, stars, some enemy ships, drops, etc.
    {
        this.posX += this.velX;
        this.posY += this.velY;
    }
    
    // outofBounds(width, height)
    // {
    //     return (this.posX < 0 || this.posY < 0 || this.posX >= width || this.posY >= height)
    // }

     outofBounds(width, height)
    {
        return false;
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
        return 0;
    }

    downY()
    {
        return this.length;
    }

}
