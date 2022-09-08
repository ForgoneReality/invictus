
//projectile.js
//just pass context around into draw and animate specifically

//BE AWARE LASER IS INACCURATE AND ASSUMES FULL MAP ACCESS
//If want limited length laserbeam, minor refactoring is needed

export default class LaserBeam {
    constructor(position, velocity, length, width, damage, type, duration, angle)//null optional
    {
        this.posX = position[0];
        this.posY = position[1];
        this.velX = velocity[0];
        this.velY = velocity[1];
        this.length = length;
        this.width = width;
        this.type = type;
        this.damage = damage;
        this.duration = duration;
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
        
    
        setShadow(context, color, 0, 0, 40);
        let grd = context.createLinearGradient(this.posX, this.posY, this.posX - this.width / 2, this.posY);
        grd.addColorStop(0, '#DE4040');
        grd.addColorStop(0.6, "red")
        grd.addColorStop(1, '#760C0C');


        context.fillStyle = grd;
        context.fillRect(this.posX - this.width / 2, this.posY, this.width/2 + 1, this.length);

        let grd2 = context.createLinearGradient(this.posX, this.posY, this.posX + this.width / 2, this.posY);
        
        grd2.addColorStop(0, '#DE4040');
        grd2.addColorStop(0.6, "red")
        grd2.addColorStop(1, '#760C0C');
        context.fillStyle = grd2;

        context.fillRect(this.posX, this.posY, this.width/2, this.length);
        context.shadowBlur = 0;
        
        context.restore();
    }

    animate(context)
    {
        this.duration -= 1;
        this.move();
        this.draw(context);
    }

    move() //should be manually moved by the ship it belongs to
    {
        // this.posX += this.velX;
        // this.posY += this.velY;
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
