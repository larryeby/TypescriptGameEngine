import { IGameObject, ColliderType } from './interfaces/gameobject.interface';

export class BaseGameObject implements IGameObject {
    id: string = "";
    x: number = 0;
    y: number = 0;

    colliderType: ColliderType | null;
    isCollidable: boolean = false;
    collisionObjects: IGameObject[] = [];

    height: number = 0;
    width: number = 0;

    initialize() {};
    update() {};
    render(ctx: CanvasRenderingContext2D) {};
    checkCollisions(input: IGameObject[]) {
        this.collisionObjects = [];
        for (var i = 0; i < input.length; i++) {
            this.boxOnBoxCollision(input[i]);
            this.circleOnboxCollision(input[i]);
            this.circleOnCircleCollision(input[i]);
        }

        return [];
    };

    private circleOnCircleCollision(object: IGameObject): void {
        if (this.id == object.id) {
            return;
        }

        if (this.colliderType == ColliderType.Circle && object.colliderType == ColliderType.Circle) {
            var dx = this.x - object.x;
            var dy = this.y - object.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.width / 2 * 3.14 + object.width / 2 * 3.14) {
                this.collisionObjects.push(object);
            }
        }
    }

    private circleOnboxCollision(object: IGameObject): void {
        if (this.id == object.id) {
            return;
        }

        if ((this.colliderType == ColliderType.Box && object.colliderType == ColliderType.Circle)
            || (this.colliderType == ColliderType.Circle && object.colliderType == ColliderType.Box)) {
            // Check collision
        }
    }

    private boxOnBoxCollision(object: IGameObject): void {
        if (this.id == object.id) {
            return;
        }

        if (this.colliderType == ColliderType.Box && object.colliderType == ColliderType.Box) {
            if (this.x < object.x + object.width &&
                this.x + this.width > object.x &&
                this.y < object.y + object.height &&
                this.y + this.height > object.y) {
                    this.collisionObjects.push(object);
             }
        }
    }
}