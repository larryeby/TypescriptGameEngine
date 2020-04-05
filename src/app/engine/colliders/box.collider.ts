import { ICollider, ColliderType } from './interfaces/collider.interface';
import { IGameObject } from '../game-objects/interfaces/gameobject.interface';

export class BoxCollider implements ICollider {
    colliderType: ColliderType = ColliderType.Box;

    checkCollisions(parent: IGameObject, input: IGameObject): void {
        if (parent.id == input.id) {
            return;
        }

        switch (input.collider.colliderType) {
            case ColliderType.Box:
                this.detectSquareCollisions(parent, input)
                break;
            case ColliderType.Circle:
                this.detectCircleCollisions(parent, input);
                break;
        }
    };

    private detectSquareCollisions(parent: IGameObject, input: IGameObject): void {
        let parentAbsX = parent.x + parent.xOffset;
        let inputAbsX = input.x + input.xOffset;

        let parentAbsY = parent.y + parent.yOffset;
        let inputAbsY = input.y + input.yOffset;

        if (parentAbsX < inputAbsX + input.width &&
            parentAbsX + parent.width > inputAbsX &&
            parentAbsY < inputAbsY + input.height &&
            parentAbsY + parent.height > inputAbsY) {
            parent.onCollision(input);
        }
    }

    private detectCircleCollisions(parent: IGameObject, input: IGameObject): void {
        let parentAbsX = parent.x + parent.xOffset;
        let inputAbsX = input.x + input.xOffset;

        let parentAbsY = parent.y + parent.yOffset;
        let inputAbsY = input.y + input.yOffset;

        let circle = input;
        let box = parent;
        let circleRadius = circle.width / 2;

        var distX = Math.abs(inputAbsX - parentAbsX - box.width / 2);
        var distY = Math.abs(inputAbsY - parentAbsY - box.height / 2);

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