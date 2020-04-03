export interface IGameObject {
    id: string;
    x: number;
    y: number;
    height: number;
    width: number;

    isCollidable: boolean;
    collisionObjects: IGameObject[];
    colliderType: ColliderType | null;

    initialize: () => void;
    checkCollisions: (input: IGameObject[]) => void;
    update: () => void;
    render: (ctx: CanvasRenderingContext2D) => void;
}

export enum ColliderType {
    Box,
    Circle
}