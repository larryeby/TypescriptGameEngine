import { IRenderer } from './interfaces/renderer.interface';
import { IGameObject } from '../game-objects/interfaces/gameobject.interface';

export class Circle2DRenderer implements IRenderer {
    public backgroundColor = 'rgba(0, 0, 0, 0.4)'
    public render (ctx: CanvasRenderingContext2D, object: IGameObject): void {
        if(object.width < 0) {
            object.width = 0;
        }

        if (object.height < 0) {
            object.height = 0;
        }
        
        ctx.beginPath();
        ctx.fillStyle = this.backgroundColor;
        ctx.arc(object.x + object.xOffset, object.y + object.yOffset, object.width / 2, 0, Math.PI * 2, false)
        ctx.fill();
        ctx.closePath();
    };
}