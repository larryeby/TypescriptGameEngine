import { BaseGameObject } from '../engine/game-objects/base.gameobject';
import { Square2DRenderer } from '../engine/renderers/square.renderer';
import { Circle2DRenderer } from '../engine/renderers/circle.renderer';
import { CircleCollider } from '../engine/colliders/circle.collider';
import { InputAction } from '../engine/input/input.listeners';
import { BoxCollider } from '../engine/colliders/box.collider';

let characterSize = 15;

export class PlayerGameObject extends BaseGameObject {
    constructor() {
        super();
    }

    initialize(): void {
        this.height = characterSize;
        this.width = characterSize;
        this.x = window.innerWidth / 2 - (characterSize / 2);
        this.y = window.innerHeight / 2 + (characterSize / 2);
        this.renderer = new Square2DRenderer();
        this.collider = new BoxCollider();
        this.labels = [ "player" ]
    }

    update() {
    }
}