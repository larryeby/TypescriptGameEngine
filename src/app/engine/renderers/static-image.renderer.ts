import { IRenderer } from './interfaces/renderer.interface';
import { IGameObject } from '../game-objects/interfaces/gameobject.interface';

export class StaticImageRenderer implements IRenderer {
    public backgroundColor = 'rgba(0, 0, 0, 0.4)'
    public displayEdges: boolean;
    protected imageLoaded: boolean = false;
    protected imageData: { [key: string]: HTMLImageElement } = { }; 
    private selectedImage: string;

    constructor(imagePath: string, displayEdges: boolean = false) {
        this.selectedImage = imagePath;
        var image = new Image();
        image.src = imagePath;
        this.imageData[imagePath] = image;
        this.displayEdges = displayEdges;
        this.imageData[imagePath].addEventListener("load", () => {
            this.imageLoaded = true;
        }, { once: true });
    }

    public setImage(imagePath: string) {
        if (this.imageData[imagePath]) {
            this.selectedImage = imagePath;
            return;
        }

        this.imageLoaded = false;
        let image = new Image();
        image.src = imagePath;
        this.imageData[imagePath] = image;
        image.addEventListener("load", () => {
            this.imageLoaded = true;
            this.selectedImage = imagePath;
        }, { once: true });
    }

    render(ctx: CanvasRenderingContext2D, object: IGameObject) {
        if (object.width < 0) {
            object.width = 0;
        }

        if (object.height < 0) {
            object.height = 0;
        }

        if (this.imageLoaded) {
            ctx.beginPath();
            ctx.drawImage(this.imageData[this.selectedImage], object.x + object.xOffset, object.y + object.yOffset, object.width, object.height);
            ctx.closePath();

            if (this.displayEdges) {
                this.drawEdges(ctx, object);
            }
        }
    };

    private drawEdges(ctx: CanvasRenderingContext2D, object: IGameObject) {
        ctx.beginPath();
        ctx.fillStyle = 'Orange';
        ctx.arc(object.x + object.xOffset, object.y + object.yOffset, 5 / 2, 0, Math.PI * 2, false)
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = 'Orange';
        ctx.arc(object.x + object.xOffset + object.width, object.y + object.yOffset + object.height, 5 / 2, 0, Math.PI * 2, false)
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = 'Orange';
        ctx.arc(object.x + object.xOffset, object.y + object.yOffset + object.height, 5 / 2, 0, Math.PI * 2, false)
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = 'Orange';
        ctx.arc(object.x + object.xOffset + object.width, object.y + object.yOffset, 5 / 2, 0, Math.PI * 2, false)
        ctx.fill();
        ctx.closePath();
    }
}