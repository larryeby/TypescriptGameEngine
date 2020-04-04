import { IRenderer } from './interfaces/renderer.interface';
import { DrawType, IGameObject } from './interfaces/gameobject.interface';

export class BaseRenderer implements IRenderer {
    public render (ctx: CanvasRenderingContext2D, object: IGameObject): void {
        switch(object.drawType) {
            case DrawType.Box: 
                this.renderSquare(ctx, object);
                break;
            case DrawType.Circle:
                this.renderCircle(ctx, object);
                break;
            case DrawType.Image:
                this.renderImage(ctx, object);
        }
    };

    private renderCircle(ctx: CanvasRenderingContext2D, object: IGameObject): void {
        ctx.beginPath();
        ctx.fillStyle = object.backgroundColor;
        ctx.arc(object.x, object.y, object.width / 2, 0, Math.PI * 2, false)
        ctx.fill();
    }

    private renderSquare(ctx: CanvasRenderingContext2D, object: IGameObject): void {
        ctx.beginPath();
        ctx.fillStyle = object.backgroundColor;
        ctx.fillRect(object.x, object.y, object.width, object.height);
    }

    private renderImage(ctx: CanvasRenderingContext2D, object: IGameObject): void {
        if (!object.imageLoaded) {
            object.imageData = new Image();
            object.imageData.src = object.imagePath;
            
            object.imageData.onload = () => {
                object.imageLoaded = true;
            }
        }
        
        if (object.imageLoaded) {
            ctx.drawImage(object.imageData, object.x, object.y, object.width, object.height);
        }
    }

}