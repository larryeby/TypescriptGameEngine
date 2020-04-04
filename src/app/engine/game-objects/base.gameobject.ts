import { IGameObject } from './interfaces/gameobject.interface';
import { IRenderer } from '../renderers/interfaces/renderer.interface';
import { Circle2DRenderer } from '../renderers/circle.renderer';
import { ICollider } from '../colliders/interfaces/collider.interface';

export class BaseGameObject implements IGameObject {
    constructor() {
        this.renderer = new Circle2DRenderer();
    }
    public id: string = "";
    public x: number = 0;
    public y: number = 0;

    public height: number = 0;
    public width: number = 0;

    public renderer: IRenderer;
    public collider: ICollider | null;
    public labels: string[] = [];

    public initialize() { };
    public update() { };
    public collision(input: IGameObject) { };

    public render (ctx: CanvasRenderingContext2D): void {
        this.renderer.render(ctx, this);
    };

    public checkCollisions(input: IGameObject[]) {
        if (this.collider) {
            for (var i = 0; i < input.length; i++) {
                this.collider.checkCollisions(this, input[i]);
            }
        }

        return [];
    };
}