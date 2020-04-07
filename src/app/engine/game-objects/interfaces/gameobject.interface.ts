import { ICollider } from '../../colliders/interfaces/collider.interface';
import { IRenderer } from '../../renderers/interfaces/renderer.interface';
import { GameContext } from '../../game-context';
import { IGameEvent } from '../../events/interfaces/game-event.interface';
import { InputAction } from '../../input/input.listeners';

export interface IGameObject {
    id: string;
    parentId: string;
    x: number;
    y: number;
    xOffset: number;
    yOffset: number;
    height: number;
    width: number;
    collider: ICollider | null;
    renderer: IRenderer | null;
    labels: string[];
    children: IGameObject[]

    initialize: () => void;
    update: () => void;
    render: (ctx: CanvasRenderingContext2D) => void;
    attach: (child: IGameObject) => void;
    getState: (key: string) => any;
    setState: (key: string, object: any) => void;
    registerContext: (context: GameContext) => void;
    dispatchEvent: (event: IGameEvent) => void;
    getInput: (input: InputAction) => boolean;
    checkCollisions: (input: IGameObject[]) => void;
    onCollision: (incoming: IGameObject) => void;
    onDestroy: () => void;
}