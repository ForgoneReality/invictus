//projectile.js
//just pass context around into draw and animate specifically

export default class LensFlare {
    constructor(position, duration, img_src, scale, color, blur)
    {
        this.posX = position[0];
        this.posY = position[1];
        this.duration = duration;
        this.scale = scale;
        this.color = color;
        this.blur = blur;

        const image = new Image();
        image.src = img_src;
        image.onload = () => {
            this.image = image;
            this.width = image.width * this.scale;
            this.height = image.height * this.scale;
        }
    }

    draw(context)
    {
        context.shadowColor = this.color;
        context.shadowBlur = this.blur;
        if (this.image)
            context.drawImage(this.image, this.posX - this.width / 2, this.posY - this.width / 2, this.width, this.height);
        
        context.fillRect(this.posX, this.posY, this.width/2, this.length);
        context.shadowBlur = 0;
    }

    animate(context)
    {
        this.duration -= 1;
        this.draw(context);
    }

    outofBounds(width, height)
    {
        return false;
    }
}
