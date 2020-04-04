import { IGameObject } from './interfaces/gameobject.interface';
import { IRenderer } from '../renderers/interfaces/renderer.interface';
import { ICollider } from '../colliders/interfaces/collider.interface';
import { GameContext } from '../game-context';
import { IGameEvent } from '../events/interfaces/game-event.interface';

export class BaseGameObject implements IGameObject {
    constructor() { 
        this.id = this.generateRandomId();
        this.initialize();
    }

    protected gameContext: GameContext;
    public id: string;
    public x: number;
    public y: number;

    public height: number;
    public width: number;

    public renderer: IRenderer | null;
    public collider: ICollider | null;
    public labels: string[] = [];

    public initialize() { 
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    };

    public registerContext(context: GameContext) {
        this.gameContext = context;
    };
    
    public dispatchEvent(event: IGameEvent) {
        this.gameContext.dispatchEvent(event);
    };

    public render (ctx: CanvasRenderingContext2D): void {
        if (this.renderer) {
            let scope = this;
            this.renderer.render(ctx, scope);
        }
    };

    public checkCollisions(input: IGameObject[]) {
        if (this.collider) {
            for (var i = 0; i < input.length; i++) {
                this.collider.checkCollisions(this, input[i]);
            }
        }

        return [];
    };

    public update() { };
    public collision(input: IGameObject) { };

    private generateRandomId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }
}