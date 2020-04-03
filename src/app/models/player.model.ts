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
        this.x = this.facingRight ? this.x + 5 : this.x - 5;
        this.y = this.movingUp ? this.y - 5 : this.y + 5;

        if (this.x > window.innerWidth - 100) {
            this.facingRight = false;
        }

        if (this.x < 0 + 100) {
            this.facingRight = true;
        }

        if (this.y > window.innerHeight - 100) {
            this.movingUp = true;
        }

        if (this.y < 0 + 100) {
            this.movingUp = false;
        }
    };

    render (ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.arc(this.x - 5, this.y - 5, 100, 0, Math.PI * 2, false)
        ctx.fill();
    };
}