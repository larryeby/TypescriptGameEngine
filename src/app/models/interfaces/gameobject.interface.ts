export interface IGameObject {
    id: string;
    isCollidable: boolean;
    collisionObjects: IGameObject[];
    x: number;
    y: number;
    colliderType: ColliderType | null;
    height: number;
    width: number;
    initialize: () => void;
    checkCollisions: (input: IGameObject[]) => void;
    update: () => void;
    render: (ctx: CanvasRenderingContext2D) => void;
}

export enum ColliderType {
    Box,
    Circle
}