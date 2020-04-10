import { IAudioObject } from './interfaces/audio.interface';

export class BaseAudioPlayer implements IAudioObject {
    audioSettings: AudioSettings;
    audioElement: HTMLAudioElement;
    loaded: boolean;
    eventListenerSet: boolean;

    constructor(audioSettings: AudioSettings) {
        this.audioSettings = audioSettings;
        this.initialize();
    }

    initialize(): void {
        this.audioElement = new Audio(this.audioSettings.audioUrl);
        this.audioElement.volume = this.audioSettings.volume;
        this.audioElement.currentTime = this.audioSettings.startTime;
        
    }

    play(): void {
        this.audioElement.volume = this.audioSettings.volume;
        if (this.loaded) {
            this.audioElement.play();
        } else {
            this.eventListenerSet = true;
            window.addEventListener('click', this.handleInitialPlay.bind(this), { once: true });
        }
    }

    handleInitialPlay(): void {
        this.loaded = true;
        this.audioElement.currentTime = this.audioSettings.startTime;
        this.audioElement.play();
    }

    pause(): void {
        this.audioElement.paused ? this.audioElement.play() : this.audioElement.pause();
    }

    stop(): void {
        this.audioElement.pause();
        this.audioElement.currentTime = this.audioSettings.startTime;
    }

    setVolume(level: number): void {
        this.audioSettings.volume = level;
        this.audioElement.volume = this.audioSettings.volume;
    }

    finished(): boolean {
        if (this.audioSettings.maxDuration) {
            return this.audioElement.currentTime >= this.audioSettings.maxDuration ;
        }

        return this.audioElement.currentTime === this.audioElement.duration;
    }

}

export class AudioSettings {
    audioUrl: string;
    volume: number = 1;
    startTime: number = 0;
    maxDuration: number;

    constructor(audioUrl: string) {
        this.audioUrl = audioUrl;
    }
}