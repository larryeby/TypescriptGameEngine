import { IGameObject } from '../../game-objects/interfaces/gameobject.interface';

export interface IRenderer {
    backgroundColor: string;
    render: (ctx: CanvasRenderingContext2D, object: IGameObject) => void;
}