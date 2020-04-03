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
    };

    collision(input: IGameObject) {
        if (input.labels.includes("test label")) {
            console.log("Parent collision detected from incoming " + input.id + " with label 'test label'");
        }
    }

    render (ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2, false)
        ctx.fill();
    };
}