import { IGameEvent } from './interfaces/game-event.interface';
import { GameContext } from '../game-context';
import { IGameObject } from '../game-objects/interfaces/gameobject.interface';

/**
 * Create object event will add a new game object to the game context.
 */
export class CreateObjectEvent implements IGameEvent {
    private object: IGameObject;
    constructor(object: IGameObject) {
        this.object = object;
    }

    activateEvent(context: GameContext) {
        context.registerObject(this.object);
    };
}

/**
 * Destroy object event will destroy a game object from the game context.
 */
export class DestroyObjectEvent implements IGameEvent {
    private id: string;
    constructor(id: string) {
        this.id = id;
    }

    activateEvent(context: GameContext) {
        context.destroyObject(this.id);
    };
}