import Projectile from './projectile'

export default class LaserDamageProjectile extends Projectile{
    constructor(position, velocity, angle, length, owner, type, damage, blur=0, width=2, img)
    {
        super(position, velocity, length, true, owner, type);
        this.blur = blur;
        this.damage = damage;
        this.width = width;
        this.degrees = angle;
 
        
        this.isImage = false; //not good code... might need to refactor into separate class if troublesome
        if(img != undefined)
        {
            this.isImage = true;
            let scale;
            if (type === 3)
            {
                scale = 0.1;
            }
            else if(type === 4)
            {
                scale = 0.19;
            }

            const image = new Image();
            image.src  = img;
            image.onload = () => {
                this.image = image;
                this.width = image.width * scale;
                this.size = image.height * scale;
                
            }
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

        let color;
        if(this.type === 0)
        {
            color = "red";
        }
        else if(this.type === 2)
        {
            color = "#DDB300";
        }
        else if (this.type === 3)
        {
            color = "#39FF14";
        }
        else if (this.type === 4)
        {
            color = "Green";
        }
        else if (this.type === 5)
        {
            color = "blue";
        }
    
        context.save();
        context.shadowColor = color;
        setShadow(context, color, 0, 0, this.blur);
        context.fillStyle = color;

        if(!this.isImage)
        {
            context.translate(this.posX+this.width/2, this.posY+this.size/2);
            context.rotate(this.degrees*Math.PI/180.0);
            context.translate(-this.posX-this.width/2, -this.posY-this.size/2);
            context.fillRect(this.posX, this.posY, this.width, this.size);
        }
        else
        {
            if (this.image)
            {
                context.translate(this.posX, this.posY);
                context.rotate(this.degrees*Math.PI/180.0);
                context.drawImage(this.image, - this.width / 2, - this.size / 2, this.width, this.size);
            }
        }
        context.restore();

        context.shadowBlur = 0;
    }

    leftX()
    {
        if(this.type === 3)
        {
            return this.posX + this.width * .25
        } 
        return this.posX
    }

    rightX()
    {
        if(this.type === 3)
        {
            return this.posX + this.width * .75
        } 
        return this.posX + this.width
    }

    upY()
    {
        if(this.type === 3)
        {
            return this.posY + this.size * .2
        } 
        return this.posY
    }

    downY()
    {
        if(this.type === 3)
        {
            return this.posY + this.size * .8
        } 
        return this.posY + this.size;
    }
    
}