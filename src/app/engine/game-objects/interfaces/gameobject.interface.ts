import { ICollider } from '../../colliders/interfaces/collider.interface';
import { IRenderer } from '../../renderers/interfaces/renderer.interface';
import { GameContext } from '../../game-context';
import { IGameEvent } from '../../events/interfaces/game-event.interface';

export interface IGameObject {
    id: string;
    x: number;
    y: number;
    xOffset: number;
    yOffset: number;
    height: number;
    width: number;
    collider: ICollider | null;
    renderer: IRenderer | null;
    labels: string[];
    children: IGameObject[];

    dispatchEvent: (event: IGameEvent) => void;
    registerContext: (context: GameContext) => void;
    initialize: () => void;
    checkCollisions: (input: IGameObject[]) => void;
    update: () => void;
    render: (ctx: CanvasRenderingContext2D) => void;
    onCollision: (incoming: IGameObject) => void;
}