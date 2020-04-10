export class InputListener {
    private keyEvents: { [key: string]: boolean };
    private mouseCoordinates: { x: number, y: number };
    constructor() {
        this.keyEvents = {};

        window.addEventListener("keydown", this.onKeyDown.bind(this), false);
        window.addEventListener("keyup", this.onKeyUp.bind(this), false);

        window.addEventListener("mousedown", this.onMouseDown.bind(this), false);
        window.addEventListener("mouseup", this.onMouseUp.bind(this), false);
        window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    }

    public getInput(action: InputAction) {
        switch (action) {
            case InputAction.Up:
                return this.keyEvents["w"] || this.keyEvents["ArrowUp"];
            case InputAction.Down:
                return this.keyEvents["s"] || this.keyEvents["ArrowDown"];
            case InputAction.Left:
                return this.keyEvents["a"] || this.keyEvents["ArrowLeft"];
            case InputAction.Right:
                return this.keyEvents["d"] || this.keyEvents["ArrowRight"];
            case InputAction.Space:
                return this.keyEvents[" "];
            case InputAction.Shift:
                return this.keyEvents["Shift"]
            case InputAction.Control:
                return this.keyEvents["Control"]
            case InputAction.Enter:
                return this.keyEvents["Enter"]
            case InputAction.MouseDown:
                return this.keyEvents["mouseClicked"]
            case InputAction.MouseUp:
                return !this.keyEvents["mouseClicked"];
        }
    }

    public getKeyPress(key: string) {
        return this.keyEvents[key];
    }

    public getMousePosition(): { x: number, y: number } {
        return this.mouseCoordinates;
    }

    private onKeyDown(event: KeyboardEvent) {
        this.keyEvents[event.key] = true;
    }

    private onKeyUp(event: KeyboardEvent) {
        this.keyEvents[event.key] = false;
    }

    private onMouseDown(event: MouseEvent) {
        this.keyEvents["mouseClicked"] = true;
    }

    private onMouseUp(event: MouseEvent) {
        this.keyEvents["mouseClicked"] = false;
    }

    private onMouseMove(event: MouseEvent) {
        this.mouseCoordinates = { x: event.clientX, y: event.clientY };
    }
}

export enum InputAction {
    Up,
    Down,
    Left,
    Right,
    Space,
    Control,
    Shift,
    Enter,
    MouseDown,
    MouseUp
}
