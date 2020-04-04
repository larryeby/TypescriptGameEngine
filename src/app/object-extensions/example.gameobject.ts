import { IGameObject } from '../engine/game-objects/interfaces/gameobject.interface';
import { BaseGameObject } from '../engine/game-objects/base.gameobject';
import { ColliderType } from '../engine/colliders/interfaces/collider.interface';

export class Example extends BaseGameObject {
    facingRight: boolean = true;
    movingUp: boolean = false;

    constructor() {
        super();
    }

    initialize(): void {
        this.height = 100;
        this.width = 100;
    }

    update(): void {
        this.movementAndRenderCheck();
    };

    collision(input: IGameObject): void {
        this.collisionCheck(input);
    }

    private collisionCheck(input: IGameObject): void {
        if (this.x > input.x) {
            this.facingRight = true;
            this.x++
        } else {
            this.facingRight = false;
            this.x--;
        }

        if (this.y > input.y) {
            this.movingUp = false;
            this.y++
        } else {
            this.movingUp = true;
            this.y--;
        }
    }

    private movementAndRenderCheck(): void {
        this.x = this.facingRight ? this.x + 5 : this.x - 5;
        this.y = this.movingUp ? this.y - 5 : this.y + 5;

        let xOffset = this.collider.colliderType == ColliderType.Circle ? this.width / 2 : this.width;
        let yOffset = this.collider.colliderType == ColliderType.Circle ? this.height / 2 : this.height;
        
        if (this.x + xOffset > window.innerWidth) {
            this.facingRight = false;
        } 

        if (this.x - xOffset < 0) {
            this.facingRight = true;
        }

        if (this.y + yOffset > window.innerHeight) {
            this.movingUp = true;
        }

        if (this.y - yOffset < 0) {
            this.movingUp = false;
        }
    }
}