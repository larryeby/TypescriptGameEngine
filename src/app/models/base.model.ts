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
            this.circleOnBoxCollision(input[i]);
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

    private circleOnBoxCollision(object: IGameObject): void {
        if (this.id == object.id) {
            return;
        }

        if ((this.colliderType == ColliderType.Box && object.colliderType == ColliderType.Circle)
            || (this.colliderType == ColliderType.Circle && object.colliderType == ColliderType.Box)) {
                let circle = this.colliderType == ColliderType.Circle ? this : object;
                let box = this.colliderType == ColliderType.Box ? this : object;
                let circleRadius = circle.width / 2 * 3.14;

                var distX = Math.abs(circle.x - box.x - box.width/2);
                var distY = Math.abs(circle.y - box.y - box.height/2);

                if (distX > (box.width/2 + circleRadius)) { return; }
                if (distY > (box.height/2 + circleRadius)) { return; }

                if (distX <= (box.width/2)) { 
                    this.collisionObjects.push(object);
                 } 
                if (distY <= (box.height/2)) { 
                    this.collisionObjects.push(object);
                 }

                var dx=distX-box.width/2;
                var dy=distY-box.height/2;
                
                if (dx * dx + dy * dy <= (circleRadius * circleRadius)) {
                    this.collisionObjects.push(object);
                }
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