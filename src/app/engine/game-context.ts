import { IGameObject } from './game-objects/interfaces/gameobject.interface';
import { IGameEvent } from './events/interfaces/game-event.interface';

export class GameContext {
    private gameObjects: { [key: string]: IGameObject };
    constructor() {
        this.gameObjects = {};
    }

    public dispatchEvent(event: IGameEvent) {
        event.activateEvent(this);
    }

    public getGameObjects(): { [key: string]: IGameObject } {
        return this.gameObjects;
    };

    public registerObject(object: IGameObject): void {
        object.registerContext(this);
        this.gameObjects[object.id] = object;
    }

    public destroyObject(id: string): void {
        delete this.gameObjects[id];
    }
}