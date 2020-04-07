export class InputListener {
    private keyEvents: { [key: number]: boolean };
    constructor() {
        this.keyEvents = { };
        window.addEventListener("keydown", this.onKeyDown.bind(this), false);
        window.addEventListener("keyup", this.onKeyUp.bind(this), false);
    }

    public getInput(action: InputAction) {
        switch (action) {
            case InputAction.Up:
                return this.keyEvents[38] || this.keyEvents[87];
            case InputAction.Down:
                return this.keyEvents[40] || this.keyEvents[83];
            case InputAction.Left:
                return this.keyEvents[37] || this.keyEvents[65];
            case InputAction.Right:
                return this.keyEvents[39] || this.keyEvents[68];
        }
    }

    private onKeyDown(event: KeyboardEvent) {
        this.keyEvents[event.keyCode] = true;
    }

    private onKeyUp(event: KeyboardEvent) {
        this.keyEvents[event.keyCode] = false;
    }
}

export enum InputAction {
    Up,
    Down,
    Left,
    Right
}
