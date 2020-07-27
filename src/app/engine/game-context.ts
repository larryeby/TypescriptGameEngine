import { IGameObject } from './game-objects/interfaces/gameobject.interface';
import { IGameEvent } from './events/interfaces/game-event.interface';
import { InputListener, InputAction } from './input/input.listeners';

export class GameContext {
    private gameObjects: { [key: string]: IGameObject };
    private stagedEvents: Array<IGameEvent> = [];
    private inputListener: InputListener = new InputListener();

    constructor() {
        this.gameObjects = {};
    }

    public getInput(input: InputAction) {
        return this.inputListener.getInput(input);
    }

    public getKey(key: string) {
        return this.inputListener.getKeyPress(key);
    }

    public getMousePosition(): { x: number, y: number } {
        return this.inputListener.getMousePosition();
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
        object.children.forEach(child => this.registerObject(child));
    }

    public destroyObject(object: IGameObject): void {
        delete this.gameObjects[object.id];
    }
}