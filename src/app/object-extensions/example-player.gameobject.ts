import { BaseGameObject } from '../engine/game-objects/base.gameobject';
import { Square2DRenderer } from '../engine/renderers/square.renderer';
import { BoxCollider } from '../engine/colliders/box.collider';
import { StaticImageRenderer } from '../engine/renderers/static-image.renderer';
import { InputAction } from '../engine/input/input.listeners';

let characterSize = 20;

export class PlayerGameObject extends BaseGameObject {
    private baseWidth: number;
    constructor() {
        super();
    }

    initialize(): void {
        this.height = characterSize * 2;
        this.width = characterSize;
        this.baseWidth = characterSize;
        this.x = window.innerWidth / 2 - (this.height / 2);
        this.y = window.innerHeight / 2 + (this.width / 2);
        this.renderer = new StaticImageRenderer('/assets/character.png');
        this.collider = new BoxCollider();
        this.labels = [ "player" ]
    }

    update() {
        if (this.getInput(InputAction.Left)) {
            (this.renderer as StaticImageRenderer).setImage('/assets/character-left.png');
        }

        if (this.getInput(InputAction.Right)) {
            (this.renderer as StaticImageRenderer).setImage('/assets/character.png')
        }
    }
}