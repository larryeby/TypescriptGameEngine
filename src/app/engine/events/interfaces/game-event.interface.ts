import { GameContext } from '../../game-context';

export interface IGameEvent {
    activateEvent: (context: GameContext) => void;
}