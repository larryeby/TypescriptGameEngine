import { ICollider, ColliderType } from './interfaces/collider.interface';
import { IGameObject } from '../game-objects/interfaces/gameobject.interface';

export class CircleCollider implements ICollider {
    colliderType: ColliderType = ColliderType.Circle;
    checkCollisions(parent: IGameObject, input: IGameObject): void {
        if (parent.id == input.id) {
            return;
        }

        switch (input.collider.colliderType) {
            case ColliderType.Circle:
                this.detectCircleCollisions(parent, input);
                break;
            case ColliderType.Box:
                this.detectSquareCollisions(parent, input);
                break;
        }
    };

    private detectCircleCollisions(parent: IGameObject, input: IGameObject): void {
        let parentAbsX = parent.x + parent.xOffset;
        let inputAbsX = input.x + input.xOffset;

        let parentAbsY = parent.y + parent.yOffset;
        let inputAbsY = input.y + input.yOffset;
        
        var dx = parentAbsX - inputAbsX;
        var dy = parentAbsY - inputAbsY;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (parent.width / 2) + (input.width / 2)) {
            parent.onCollision(input);
        }
    }

    private detectSquareCollisions(parent: IGameObject, input: IGameObject): void {
        let parentAbsX = parent.x + parent.xOffset;
        let inputAbsX = input.x + input.xOffset;

        let parentAbsY = parent.y + parent.yOffset;
        let inputAbsY = input.y + input.yOffset;

        let circle = parent;
        let box = input;
        let circleRadius = circle.width / 2;

        var distX = Math.abs(parentAbsX - inputAbsX - box.width / 2);
        var distY = Math.abs(parentAbsY - inputAbsY - box.height / 2);

        if (distX > (box.width / 2 + circleRadius)) { return; }
        if (distY > (box.height / 2 + circleRadius)) { return; }

        if (distX <= (box.width / 2)) {
            parent.onCollision(input);
        }
        if (distY <= (box.height / 2)) {
            parent.onCollision(input);
        }

        var dx = distX - box.width / 2;
        var dy = distY - box.height / 2;

        if (dx * dx + dy * dy <= (circleRadius * circleRadius)) {
            parent.onCollision(input);
        }
    }
}