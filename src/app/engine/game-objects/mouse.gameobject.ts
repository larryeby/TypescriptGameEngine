import { IGameObject } from './interfaces/gameobject.interface';
import { CircleCollider } from '../colliders/circle.collider';
import { ICollider } from '../colliders/interfaces/collider.interface';
import { IRenderer } from '../renderers/interfaces/renderer.interface';
import { IAudioObject } from '../audio/interfaces/audio.interface';
import { GameContext } from '../game-context';
import { IGameEvent } from '../events/interfaces/game-event.interface';
import { InputAction } from '../input/input.listeners';

export class MouseGameObject implements IGameObject {
    public collisionDetected: boolean = false;
    private collideCheckId: string;
    constructor(collideCheckId: string, coords: { x: number, y: number }) {
        this.collideCheckId = collideCheckId;
        this.collider = new CircleCollider();
        this.x = coords.x;
        this.y = coords.y;
        this.height = 10;
        this.width = 10;
        this.xOffset = 0;
        this.yOffset = 0;
    }

    id: string;
    parentId: string;
    x: number;
    y: number;
    xOffset: number;
    yOffset: number;
    height: number;
    width: number;
    collider: ICollider;
    renderer: IRenderer;
    audioPlayer: IAudioObject;
    labels: string[];
    children: IGameObject[];

    initialize(): void { }
    update(): void { }
    render(ctx: CanvasRenderingContext2D): void { }
    attach(child: IGameObject): void { }
    getState(key: string) { }
    setState(key: string, object: any): void { }
    registerContext(context: GameContext): void { }
    dispatchEvent(event: IGameEvent): void { }
    checkCollisions(input: IGameObject[]): void {
        if (this.collider) {
            for (var i = 0; i < input.length; i++) {
                this.collider.checkCollisions(this, input[i]);
            }
        }
    }
    onDestroy(): void { }
    getInput(input: InputAction): boolean { return false; }

    onCollision(gameObject: IGameObject) {
        if (gameObject.id === this.collideCheckId) {
            this.collisionDetected = true;
        }
    }
}