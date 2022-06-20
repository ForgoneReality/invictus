
import Projectile from "./projectile"

const TYPES3 = [
    {
            //healing
            img: '../images/heart.png',
            color: "red",
            blur: 5,
            scale: .06, 
            rarity: "common"
    },
    {
            //double fire
            img: '../images/drop1.png',
            color: "white",
            blur: 0,
            scale: .04, 
            rarity: "common"
    },
    {
        img: '../images/gold.png',
        color: "gold",
        blur: 0,
        scale: .1, 
        rarity: "common"
    },
    { 
        //gamma rays
        img: '../images/gamma.png',
        color: "green",
        blur: 0,
        scale: .1, 
        rarity: "uncommon"
    }
];

export default class Drop extends Projectile {
    constructor(position, type)//color optional
    {
        //position, velocity, size, collidable, owner, type)

        super(position, [0, 1.75], 0.25, true, 3, type);
        const image = new Image();
        image.src = TYPES3[type].img;
        image.onload = () => {
            this.image = image;
            this.width = image.width * TYPES3[type].scale;
            this.height = image.height * TYPES3[type].scale;
        }
    }

    draw(context)
    {
        if(this.image)
        {
        // context.shadowColor = this.color;
        // context.shadowBlur = this.blur;
            context.save();
            context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
            context.restore();
            
        }
    }   

    leftX() //scuffed
    {
        return this.posX;
    }

    rightX() //scuffed
    {
        return this.posX + (this.size + this.width) / 2;
    }

    upY() //scuffed
    {
        return this.posY;
    }

    downY() //scuffed
    {
        return this.posY + (this.size + this.width) / 2;
    }

    outofBounds(width, height)
    {
        return (this.posX >= width || this.posY >= height)
    }

}
