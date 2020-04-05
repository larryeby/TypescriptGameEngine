import { IGameObject } from './game-objects/interfaces/gameobject.interface';
import { IGameEvent } from './events/interfaces/game-event.interface';

export class GameContext {
    private gameObjects: { [key: string]: IGameObject };
    private stagedEvents: Array<IGameEvent> = [];

    constructor() {
        this.gameObjects = {};
    }

    public triggerEvents() {
        for (let i = 0; i < this.stagedEvents.length; i++) {
            this.stagedEvents[i].activateEvent(this);
        }

        this.stagedEvents = [];
    }

    public dispatchEvent(event: IGameEvent) {
        this.stagedEvents.push(event);
    }

    public getGameObjects(): { [key: string]: IGameObject } {
        return this.gameObjects;
    };

    public registerObject(object: IGameObject): void {
        object.registerContext(this);
        this.gameObjects[object.id] = object;
    }

    public destroyObject(object: IGameObject): void {
        delete this.gameObjects[object.id];
    }
}