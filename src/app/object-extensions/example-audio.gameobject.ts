import { BaseGameObject } from '../engine/game-objects/base.gameobject';
import { BaseAudioPlayer, AudioSettings } from '../engine/audio/audio.player';

export class AudioGameObject extends BaseGameObject {
    constructor(settings: AudioSettings) {
        super();
        this.audioPlayer = new BaseAudioPlayer(settings);;
        this.playAudio();
    }

    playAudio(): void {
        this.audioPlayer.setVolume(0.2);
        this.audioPlayer.play();
    }

    update() {
        if (this.getKey("Insert")) {
            let current = this.audioPlayer.audioSettings.volume + 0.1;
            if (current < 1) {
                this.audioPlayer.setVolume(current);
            }
        }

        if (this.getKey("Delete")) {
            let current = this.audioPlayer.audioSettings.volume - 0.1;
            if (current > 0) {
                this.audioPlayer.setVolume(current);
            }
        }

        if (this.audioPlayer.finished()) {
            this.audioPlayer.stop();
            this.audioPlayer.play();
        }
    }
}