import { IRenderer } from './interfaces/renderer.interface';
import { IGameObject } from '../game-objects/interfaces/gameobject.interface';

export class StaticImageRenderer implements IRenderer {
    public backgroundColor = 'rgba(0, 0, 0, 0.4)'
    public imagePath: string;
    public imageLoaded: boolean = false;
    public imageData: HTMLImageElement;

    constructor(imagePath: string) {
        this.imagePath = imagePath;    
    }

    render(ctx: CanvasRenderingContext2D, object: IGameObject)  {
        if (!this.imageLoaded) {
            this.imageData = new Image();
            this.imageData.src = this.imagePath;
            
            this.imageData.onload = () => {
                this.imageLoaded = true;
            }
        }
        
        if (this.imageLoaded) {
            ctx.beginPath()
            ctx.drawImage(this.imageData, object.x, object.y, object.width, object.height);
            ctx.closePath();
        }
    };

}