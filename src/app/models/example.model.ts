import { IGameObject, ColliderType, DrawType } from './interfaces/gameobject.interface';
import { PlayerId } from '../constants/identifier.constants';
import { BaseGameObject } from './base.model';

export class Example extends BaseGameObject {
    facingRight: boolean = true;
    movingUp: boolean = false;

    constructor() {
        super();
        this.id = PlayerId;
        this.initialize();
    }

    initialize(): void {
        this.height = 100;
        this.width = 100;
        this.isCollidable = true;
        this.colliderType = ColliderType.Box;
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

        let offset = this.width / 2;
        if (this.x + offset > window.innerWidth) {
            this.facingRight = false;
        }

        if (this.x - offset < 0) {
            this.facingRight = true;
        }

        if (this.y + offset > window.innerHeight) {
            this.movingUp = true;
        }

        if (this.y - offset < 0) {
            this.movingUp = false;
        }
    }
}