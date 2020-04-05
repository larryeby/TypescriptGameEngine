import { IGameObject } from './interfaces/gameobject.interface';
import { IRenderer } from '../renderers/interfaces/renderer.interface';
import { ICollider } from '../colliders/interfaces/collider.interface';
import { GameContext } from '../game-context';
import { IGameEvent } from '../events/interfaces/game-event.interface';
import { generateRandomId } from './helpers/id-gen.helper';

export class BaseGameObject implements IGameObject {
    public id: string;
    public parentId: string;
    public x: number;
    public y: number;
    public xOffset: number;
    public yOffset: number;
    public height: number;
    public width: number;
    public labels: string[] = [];

    public initialize() { };
    constructor() {
        this.id = generateRandomId();
        this.x = 0;
        this.y = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        this.width = 0;
        this.height = 0;
        this.initialize();
    }

    private state: { [key: string]: any; } = {};
    getState(key: string): any {
        return this.state[key];
    };

    setState(key: string, object: any): void {
        this.state[key] = object;
    };

    public children: IGameObject[] = [];
    public attach(child: IGameObject) {
        child.parentId = this.id;
        this.children.push(child);
    }


    protected gameContext: GameContext;
    public registerContext(context: GameContext) {
        this.gameContext = context;
    };

    public dispatchEvent(event: IGameEvent) {
        this.gameContext.dispatchEvent(event);
    };

    public renderer: IRenderer | null;
    public render(ctx: CanvasRenderingContext2D): void {
        if (this.renderer) {
            let scope = this;
            this.renderer.render(ctx, scope);
        }
    };

    public collider: ICollider | null;
    public onCollision(incoming: IGameObject) { };
    public checkCollisions(input: IGameObject[]) {
        if (this.collider) {
            for (var i = 0; i < input.length; i++) {
                this.collider.checkCollisions(this, input[i]);
            }
        }

        return [];
    };

    public update() { };
}