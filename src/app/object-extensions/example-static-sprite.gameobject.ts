import { BaseGameObject } from '../engine/game-objects/base.gameobject';
import { SpriteRenderer } from '../engine/renderers/sprite.renderer';
import { ICollider } from '../engine/colliders/interfaces/collider.interface';
import { StaticImageRenderer } from '../engine/renderers/static-image.renderer';
import { IGameObject } from '../engine/game-objects/interfaces/gameobject.interface';
import { WorldGameObject } from './example-world-parent.gameobject';

export class SampleSpriteGameObject extends BaseGameObject {
    constructor(renderer: StaticImageRenderer, collider: ICollider, height: number, width: number, xOffset: number, yOffset: number) {
        super();
        this.renderer = renderer;
        this.collider = collider;
        this.height = height;
        this.width = width;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }

    onCollision(gameObject: IGameObject) {
        if (gameObject.labels.includes("player")) {
            let objPosition = gameObject.getAbsPosition();
            let thisPosition = this.getAbsPosition();
            let parentObject = (this.gameContext.getGameObjects()[this.parentId] as WorldGameObject);

            if (objPosition.y < thisPosition.y + this.height) {
                parentObject.canMoveUp = false;
                parentObject.canMoveDown = true;
            }

            if (objPosition.y - gameObject.height < thisPosition.y) {
                parentObject.canMoveDown = false;
                parentObject.canMoveUp = true;
            }

            if (objPosition.x + gameObject.width > thisPosition.x) {
                parentObject.canMoveRight = false
                parentObject.canMoveLeft = true;
            }

            if (objPosition.x <= thisPosition.x + this.width &&
                objPosition.x > thisPosition.x &&
                objPosition.y + gameObject.height + 1 < this.x + this.height) {

                parentObject.canMoveLeft = false;
                parentObject.canMoveRight = true
            }
        }
    }
}