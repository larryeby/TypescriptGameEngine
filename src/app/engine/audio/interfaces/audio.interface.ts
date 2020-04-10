import { AudioSettings } from '../audio.player';

export interface IAudioObject {
    play(): void;
    pause(): void;
    stop(): void;
    finished(): boolean;
    setVolume(level: number): void;
    getVolume(): number;
}