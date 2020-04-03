import { IGameObject, ColliderType } from './interfaces/gameobject.interface';
import { PlayerId } from '../constants/identifier.constants';
import { BaseGameObject } from './base.model';

export class Player extends BaseGameObject {
    facingRight: boolean = true;
    movingUp: boolean = false;

    constructor() {
        super();
        this.id = PlayerId;
        this.initialize();
    }

    initialize() {
        this.height = 100;
        this.width = 100;
        this.isCollidable = true;
        this.colliderType = ColliderType.Circle;
    }

    // PLACEHOLDER CODE TO TEST ENGINE
    update() {
        this.movementAndRenderCheck();
    };

    collision(input: IGameObject) {
        this.physicsCheck(input);
    }

    render (ctx: CanvasRenderingContext2D) {
        this.renderCircle(ctx);
    };

    private physicsCheck(input: IGameObject) {
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

    private movementAndRenderCheck() {
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

    private renderCircle(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2, false)
        ctx.fill();
    }
}