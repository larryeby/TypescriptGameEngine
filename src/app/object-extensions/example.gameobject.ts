import { IGameObject } from '../engine/game-objects/interfaces/gameobject.interface';
import { BaseGameObject } from '../engine/game-objects/base.gameobject';
import { ColliderType } from '../engine/colliders/interfaces/collider.interface';
import { DestroyObjectEvent, CreateObjectEvent } from '../engine/events/object-actions.event';
import { BoxCollider } from '../engine/colliders/box.collider';
import { StaticImageRenderer } from '../engine/renderers/static-image.renderer';
import { Circle2DRenderer } from '../engine/renderers/circle.renderer';
import { CircleCollider } from '../engine/colliders/circle.collider';
import { Square2DRenderer } from '../engine/renderers/square.renderer';

export class Example extends BaseGameObject {
    facingRight: boolean = true;
    movingUp: boolean = false;

    constructor() {
        super();
    }

    initialize(): void {
        this.height = 40;
        this.width = 40;
    }

    update(): void {
        this.movementAndRenderCheck();
    };

    collision(input: IGameObject): void {
        this.collisionCheck(input);
        this.eventingCheck(input);
    }

    private eventingCheck(input: IGameObject) {
        var random = Math.floor(Math.random() * 100);
        var modulo = random % 2;

        if (random > 97 && !input.labels.includes("image")) {
            if (Math.floor(modulo) === 0) {
                let example = new Example();
                example.x = Math.floor(Math.random() * window.innerWidth * 1.5);
                example.y = Math.floor(Math.random() * window.innerHeight * 1.5);
                example.labels = [ `${1}` ]
                example.collider = example.x % 2 === 0 ? new CircleCollider() : new BoxCollider();
                example.renderer = example.x % 2 === 0 ? new Circle2DRenderer() : new Square2DRenderer();
                this.dispatchEvent(new CreateObjectEvent(example));
            } else {
                this.dispatchEvent(new DestroyObjectEvent(input));
            }
        }
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

        if (this.x + xOffset > window.innerWidth * 1.5) {
            this.facingRight = false;
        }

        if (this.x - xOffset < 0 -window.innerWidth / 2) {
            this.facingRight = true;
        }

        if (this.y + yOffset > window.innerHeight * 1.5) {
            this.movingUp = true;
        }

        if (this.y - yOffset < 0 - window.innerHeight / 2) {
            this.movingUp = false;
        }
    }
}