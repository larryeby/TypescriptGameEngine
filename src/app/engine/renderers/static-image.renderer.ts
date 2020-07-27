import { IRenderer } from './interfaces/renderer.interface';
import { IGameObject } from '../game-objects/interfaces/gameobject.interface';

export class StaticImageRenderer implements IRenderer {
    public backgroundColor = 'rgba(0, 0, 0, 0.4)'
    public imagePath: string;
    public displayEdges: boolean;
    protected imageLoaded: boolean = false;
    protected staged: boolean = false;
    protected imageData: HTMLImageElement;

    constructor(imagePath: string, displayEdges: boolean = false) {
        this.imagePath = imagePath;
        this.imageData = new Image();
        this.imageData.src = this.imagePath;
        this.staged = true;
        this.displayEdges = displayEdges;
        this.imageData.addEventListener("load", () => {
            this.imageLoaded = true;
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
            ctx.drawImage(this.imageData, object.x + object.xOffset, object.y + object.yOffset, object.width, object.height);
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