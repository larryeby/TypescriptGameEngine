import { IGameObject } from './gameobject.interface';

export interface IRenderer {
    render: (ctx: CanvasRenderingContext2D, object: IGameObject) => void;
}