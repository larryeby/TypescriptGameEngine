import { IRenderer } from './interfaces/renderer.interface';
import { IGameObject } from '../game-objects/interfaces/gameobject.interface';

export class Square2DRenderer implements IRenderer {
    backgroundColor = 'rgba(0, 0, 0, 0.4)'
    render(ctx: CanvasRenderingContext2D, object: IGameObject)  {
        ctx.beginPath();
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(object.x, object.y, object.width, object.height);
    };

}