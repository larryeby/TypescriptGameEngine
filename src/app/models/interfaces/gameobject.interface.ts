export interface IGameObject {
    id: string;
    x: number;
    y: number;
    height: number;
    width: number;

    drawType: DrawType;
    backgroundColor: string;
    imagePath: string;
    imageLoaded: boolean;
    imageData: HTMLImageElement;

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

export enum DrawType {
    Box,
    Circle,
    Image
}