import { AudioSettings } from '../audio.player';

export interface IAudioObject {
    audioElement: HTMLAudioElement;
    audioSettings: AudioSettings;
    play(): void;
    pause(): void;
    stop(): void;
    finished(): boolean;
    setVolume(level: number): void;
}