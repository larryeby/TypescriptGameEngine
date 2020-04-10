import { IAudioObject } from './interfaces/audio.interface';

export class BaseAudioPlayer implements IAudioObject {
    private audioSettings: AudioSettings;
    private audioContext: AudioContext;
    private gainNode: GainNode;
    private mediaSourceNode: MediaElementAudioSourceNode;
    private loaded: boolean;
    private rampingDown: boolean;

    constructor(audioSettings: AudioSettings) {
        this.audioSettings = audioSettings;
        this.initialize();
    }

    initialize(): void {
        this.audioContext = new AudioContext();
        this.mediaSourceNode = this.audioContext.createMediaElementSource(new Audio(this.audioSettings.audioUrl));
        this.gainNode = this.audioContext.createGain();
        this.mediaSourceNode.connect(this.gainNode).connect(this.audioContext.destination);
        this.mediaSourceNode.mediaElement.volume = this.audioSettings.volume;
        this.mediaSourceNode.mediaElement.currentTime = this.audioSettings.startTime;
    }

    play(): void {
        if (this.rampingDown) {
            setTimeout(this.play.bind(this), 50);
            this.rampingDown = false;
            return;
        }

        this.gainNode.gain.setValueAtTime(0.0001, this.audioContext.currentTime); 
        this.gainNode.gain.exponentialRampToValueAtTime(1, this.audioContext.currentTime + 0.002);
        this.mediaSourceNode.mediaElement.currentTime = this.audioSettings.startTime;
        if (this.loaded) {
            this.mediaSourceNode.mediaElement.play();
        } else {
            window.addEventListener('click', this.handleInitialPlay.bind(this), { once: true });
        }
    }

    handleInitialPlay(): void {
        this.loaded = true;
        this.mediaSourceNode.mediaElement.currentTime = this.audioSettings.startTime;
        this.mediaSourceNode.mediaElement.play();
    }

    pause(): void {
        this.mediaSourceNode.mediaElement.paused ? this.mediaSourceNode.mediaElement.play() : this.mediaSourceNode.mediaElement.pause();
    }

    stop(): void {
        this.rampingDown = true;
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioContext.currentTime); 
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.002);
        this.mediaSourceNode.mediaElement.pause();
        this.mediaSourceNode.mediaElement.currentTime = this.audioSettings.startTime;
    }

    setVolume(level: number): void {
        this.audioSettings.volume = level;
        this.mediaSourceNode.mediaElement.volume = this.audioSettings.volume;
    }

    getVolume(): number {
        return this.audioSettings.volume;
    }

    finished(): boolean {
        if (this.audioSettings.maxDuration) {
            return this.mediaSourceNode.mediaElement.currentTime >= this.audioSettings.maxDuration ;
        }

        return this.mediaSourceNode.mediaElement.currentTime === this.mediaSourceNode.mediaElement.duration;
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