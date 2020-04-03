export interface IGameObject {
    id: string;
    x: number;
    y: number;
    height: number;
    width: number;

    isCollidable: boolean;
    colliderType: ColliderType | null;
    labels: string[];

    initialize: () => void;
    checkCollisions: (input: IGameObject[]) => void;
    update: () => void;
    render: (ctx: CanvasRenderingContext2D) => void;
    collision: (input: IGameObject) => void;
}

export enum ColliderType {
    Box,
    Circle
}