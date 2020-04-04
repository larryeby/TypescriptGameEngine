import { ICollider } from '../../colliders/interfaces/collider.interface';

export interface IGameObject {
    id: string;
    x: number;
    y: number;
    height: number;
    width: number;
    collider: ICollider;
    labels: string[];

    initialize: () => void;
    checkCollisions: (input: IGameObject[]) => void;
    update: () => void;
    render: (ctx: CanvasRenderingContext2D) => void;
    collision: (input: IGameObject) => void;
}