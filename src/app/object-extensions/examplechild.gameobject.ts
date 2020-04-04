import { BaseGameObject } from '../engine/game-objects/base.gameobject';

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
}