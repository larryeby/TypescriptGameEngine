import { IGameObject } from '../game-objects/interfaces/gameobject.interface';
import { StaticImageRenderer } from './static-image.renderer';

export class SpriteRenderer extends StaticImageRenderer {
    private options: SpriteOptions;

    constructor(options: SpriteOptions | null) {
        super(options.imagePath);
        this.options = options;

        if (this.options) {
            this.options.verify();
            this.options.initialize();
        }
    }

    render(ctx: CanvasRenderingContext2D, object: IGameObject) {
        if (object.width < 0) {
            object.width = 0;
        }

        if (object.height < 0) {
            object.height = 0;
        }

        if (this.imageLoaded) {
            ctx.beginPath();
            if (this.options == null) {
                ctx.drawImage(this.imageData[0], object.x, object.y, object.width, object.height);
            } else {
                // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
                ctx.drawImage(this.imageData[0], 
                    
                    // Set Frame
                    this.options.getXFrame(), this.options.getYFrame(), 
                    
                    // Sprite offet for rows/columns
                    this.options.spriteWidth, this.options.spriteHeight, 
                    
                    // X, Y coordinates of sprite
                    object.x, object.y, 
                    // Width of sprite with scale
                    this.options.getScaleWidth(),
                    // Height of spite with scale
                    this.options.getScaleHeight());
            }

            ctx.closePath();
        }
    };
}

export class SpriteOptions {
    animationInterval: any;
    imagePath: string;
    topOffset: number = 0;
    xScale: number = 1;
    yScale: number = 1;
    spriteHeight: number = 0;
    spriteWidth: number = 0;
    rowSelected: number = 0;
    columnSelected: number = 0;

    animationLengthTotalMilliseconds: number;

    /**
     * If the rowRenderOptions are empty, this will be used to divide
     * the frames by the set animationLengthTotalMilliseconds variable.
     */
    rowLength: number;
    columnLength: number;

    /**
     * Options for rendering individual frames. 
     * If left empty, it will default to the animationLengthTotalMilliseconds variable.
     */
    rowRenderingOptions: { [key: number]: RowRenderingOptions };

    verify() {
        if (!this.rowLength && !this.rowRenderingOptions) {
            throw new Error("Sprite options need either a row length, or a row rendering options set.")
        }
    }

    initialize() {
        if (this.animationLengthTotalMilliseconds && !this.rowRenderingOptions) {
            this.animationInterval = setInterval(() => {
                if (this.columnSelected == this.columnLength - 1) {
                    this.columnSelected = 0;
                } else {
                    this.columnSelected++;
                }
            }, this.animationLengthTotalMilliseconds / this.columnLength);
        }
    }

    getXFrame() {
        return this.spriteWidth * this.columnSelected;
    }

    getYFrame() {
        return this.spriteHeight * this.rowSelected + this.topOffset;
    }

    getScaleWidth() {
        return this.xScale * this.spriteWidth;
    }

    getScaleHeight() {
        return this.yScale * this.spriteHeight;
    }
}

export class RowRenderingOptions {
    /**
     * Designates the time for each frame in the selected row.
     */
    frameSwapTimersInMilliseconds: Array<number> = [];
}