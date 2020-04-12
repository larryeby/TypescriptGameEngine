import { BaseGameObject } from '../engine/game-objects/base.gameobject';
import { SpriteRenderer } from '../engine/renderers/sprite.renderer';

export class ExampleSpriteObject extends BaseGameObject {
    facingRight: boolean = true;
    movingUp: boolean = false;

    constructor(renderer: SpriteRenderer) {
        super();
        this.renderer = renderer;
    }

    initialize(): void {
        this.height = 40;
        this.width = 40;
    }
}