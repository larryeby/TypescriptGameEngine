import { IRenderer } from './interfaces/renderer.interface';
import { IGameObject } from '../game-objects/interfaces/gameobject.interface';

export class Square2DRenderer implements IRenderer {
    public backgroundColor = 'rgba(0, 0, 0, 0.4)'
    render(ctx: CanvasRenderingContext2D, object: IGameObject): void  {
        if(object.width < 0) {
            object.width = 0;
        }

        if (object.height < 0) {
            object.height = 0;
        }

        ctx.beginPath();
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(object.x + object.xOffset, object.y + object.yOffset, object.width, object.height);
        ctx.closePath();
    };
}