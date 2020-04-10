import { IGameObject } from '../engine/game-objects/interfaces/gameobject.interface';
import { BaseGameObject } from '../engine/game-objects/base.gameobject';
import { ColliderType } from '../engine/colliders/interfaces/collider.interface';
import { DestroyObjectEvent, CreateObjectEvent } from '../engine/events/object-actions.event';
import { BoxCollider } from '../engine/colliders/box.collider';
import { Circle2DRenderer } from '../engine/renderers/circle.renderer';
import { CircleCollider } from '../engine/colliders/circle.collider';
import { Square2DRenderer } from '../engine/renderers/square.renderer';
import { InputAction } from '../engine/input/input.listeners';

export class Example extends BaseGameObject {
    facingRight: boolean = true;
    movingUp: boolean = false;
    speed: number = 3;

    constructor() {
        super();
    }

    initialize(): void {
        this.height = 40;
        this.width = 40;
    }

    update(): void {
        this.movementAndRenderCheck();
        this.childMovementCheck();
        this.inputCheck();
    };

    onCollision(incoming: IGameObject): void {
        if (this.children.includes(incoming)) {
            this.renderer.backgroundColor = "yellow";
        } else if (incoming.labels.includes("child")) {
            this.renderer.backgroundColor = "white";
        }

        this.collisionCheck(incoming);
        this.eventingCheck(incoming);
    }

    private inputCheck() {
        if (this.getInput(InputAction.Up)) {
            this.y -= this.speed * 2;
        }

        if (this.getInput(InputAction.Down)) {
            this.y += this.speed * 2;
        }

        if (this.getInput(InputAction.Left)) {
            this.x -= this.speed * 2;
        }

        if (this.getInput(InputAction.Right)) {
            this.x += this.speed * 2;
        }

        if (this.getInput(InputAction.Control)) {
            this.height--;
            this.width--;
        }

        if (this.getInput(InputAction.Shift)) {
            this.height++;
            this.width++;
        }
    }

    private eventingCheck(input: IGameObject) {
        var random = Math.floor(Math.random() * 100);
        var modulo = random % 2;

        if (random > 98 && !input.labels.includes("image") && !input.labels.includes("parent")) {
            if (Math.floor(modulo) === 0) {
                let example = new Example();
                example.x = Math.floor(Math.random() * window.innerWidth);
                example.y = Math.floor(Math.random() * window.innerHeight);
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
        if (this.children.includes(input)) {
            return;
        }

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

        this.x = this.facingRight ? this.x + this.speed : this.x - this.speed;
        this.y = this.movingUp ? this.y - this.speed : this.y + this.speed;
    }

    private childMovementCheck(): void {
        this.children.forEach((child) => {
            if (child.xOffset > this.width * 4) {
                child.setState('facingRight', false);
            } 
            
            if (child.xOffset < -(this.width * 4)){
                child.setState('facingRight', true);
            }

            if (child.yOffset > this.height * 4) {
                child.setState('movingUp', false);
            } 
            
            if (child.yOffset < -(this.height * 4)){
                child.setState('movingUp', true);
            }

            let facingRight: boolean = child.getState("facingRight");
            let movingUp: boolean = child.getState("movingUp");

            if (facingRight) {
                child.xOffset++;
            } else {
                child.xOffset--;
            }

            if (movingUp) {
                child.yOffset++;
            } else {
                child.yOffset--;
            }
        })
    }
}