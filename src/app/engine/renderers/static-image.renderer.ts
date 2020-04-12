import { IRenderer } from './interfaces/renderer.interface';
import { IGameObject } from '../game-objects/interfaces/gameobject.interface';

export class StaticImageRenderer implements IRenderer {
    public backgroundColor = 'rgba(0, 0, 0, 0.4)'
    protected imagePath: string;
    protected imageLoaded: boolean = false;
    protected staged: boolean = false;
    protected imageData: HTMLImageElement;

    constructor(imagePath: string) {
        this.imagePath = imagePath;
        this.imageData = new Image();
        this.imageData.src = this.imagePath;
        this.staged = true;
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
            ctx.drawImage(this.imageData, object.x, object.y, object.width, object.height);
            ctx.closePath();
        }
    };
}