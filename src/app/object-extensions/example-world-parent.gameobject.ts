import { BaseGameObject } from '../engine/game-objects/base.gameobject';
import { InputAction } from '../engine/input/input.listeners';
import { SampleSpriteGameObject } from './example-static-sprite.gameobject';
import { BoxCollider } from '../engine/colliders/box.collider';
import { StaticImageRenderer } from '../engine/renderers/static-image.renderer';

let characterSpeed = 4;
export class WorldGameObject extends BaseGameObject {
    public canMoveUp: boolean = true;
    public canMoveDown: boolean = true;
    public canMoveLeft: boolean = true;
    public canMoveRight: boolean = true;

    constructor() {
        super();
        this.height = 1;
        this.width = 1;
        this.x = window.innerWidth / 2 - 1;
        this.y = window.innerHeight / 2 + 1;
        this.renderer = new StaticImageRenderer('');
        this.attachChildren();
    }

    private attachChildren(): void {
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/stone-pathway.png'), null, 50, 50, 10, -90));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/stone-pathway.png'), null, 50, 50, 60, -90));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/stone-pathway.png'), null, 50, 50, 110, -90));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/stone-pathway.png'), null, 50, 50, 160, -90));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/stone-pathway.png'), null, 50, 50, 210, -90));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/stone-pathway.png'), null, 50, 50, 260, -90));

        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/stone-pathway.png'), null, 50, 50, 210, -140));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/stone-pathway.png'), null, 50, 50, 210, -190));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/stone-pathway.png'), null, 50, 50, 210, -240));


        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/pink-tree.png'), new BoxCollider(), 100, 100, 10, 10));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/pink-tree.png'), new BoxCollider(), 100, 100, 120, 130));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/pink-tree.png'), new BoxCollider(), 100, 100, -125, -125));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/pink-tree.png'), new BoxCollider(), 100, 130, -1200, -170));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/pink-tree.png'), new BoxCollider(), 100, 100, -390, -204));
        this.attach(new SampleSpriteGameObject(new StaticImageRenderer('/assets/tent.png'), new BoxCollider(), 100, 100, 45, -185));


    }

    update() {
        this.handleMovement();
    }

    lateUpdate(): void {
        this.resetMovement();
    }

    private resetMovement() {
        this.canMoveUp = true;
        this.canMoveDown = true;
        this.canMoveLeft = true;
        this.canMoveRight = true;
    }
    
    private handleMovement() {
        if (this.getInput(InputAction.Up) && this.canMoveUp) {
            this.y += characterSpeed;
            this.canMoveDown = true;
        }

        if (this.getInput(InputAction.Down) && this.canMoveDown) {
            this.y -= characterSpeed;
            this.canMoveUp = true;
        }

        if (this.getInput(InputAction.Left) && this.canMoveLeft) {
            this.x += characterSpeed;
            this.canMoveRight = true;
        }

        if (this.getInput(InputAction.Right) && this.canMoveRight) {
            this.x -= characterSpeed;
            this.canMoveLeft = true;
        }
    }
}