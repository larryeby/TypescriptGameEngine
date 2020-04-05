import { BaseGameObject } from '../engine/game-objects/base.gameobject';
import { IGameObject } from '../engine/game-objects/interfaces/gameobject.interface';

export class ExampleChild extends BaseGameObject {
    facingRight: boolean = true;
    movingUp: boolean = false;

    constructor() {
        super();
    }

    initialize(): void {
        this.height = 40;
        this.width = 40;
    }

    onCollision(input: IGameObject): void {
        if (input.labels.includes("parent")) {
            this.renderer.backgroundColor = "red";
        } else if (input.labels.includes("child")) {
            this.renderer.backgroundColor = "gray";
        } else {
            this.renderer.backgroundColor = "black";
        }
    }
}