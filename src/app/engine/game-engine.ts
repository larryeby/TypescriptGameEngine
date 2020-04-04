import { Injectable } from '@angular/core';
import { IGameObject } from './game-objects/interfaces/gameobject.interface';

@Injectable({
  providedIn: 'root'
})
export class GameEngine {
  private gameObjects: { [key: string]: IGameObject } = {};
  private ctx: CanvasRenderingContext2D;
  private paused: boolean = false;

  // This variable controls when objects should begin drawing to the canvas.
  private renderVariance: number = 5;

  constructor() { }

  public togglePause(): void {
    this.paused = !this.paused;
    this.cycleAnimation();
  }

  public run(): void {
    this.cycleAnimation();
  }

  public registerContext(ctx: CanvasRenderingContext2D): void {
    this.ctx = ctx;
  }

  public registerObject(object: IGameObject): void {
    this.gameObjects[object.id] = object;
  }

  public destroyObject(object: IGameObject): void {
    delete this.gameObjects[object.id];
  }

  public animate(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    var gameObjects = Object.values(this.gameObjects);
    gameObjects.forEach(object => {
      object.update();
      
      // Check whether the item is in the frame before rendering.
      if (object.x - object.width + this.renderVariance <= window.innerWidth && 
          object.x + object.width >= 0 - this.renderVariance &&
          object.y - object.height - this.renderVariance <= window.innerHeight &&
          object.y + object.height >= 0 + this.renderVariance) {
            object.checkCollisions(gameObjects.filter(x => x.collider));
            object.render(this.ctx);
      }

    });

    this.cycleAnimation();
  }

  private cycleAnimation(): void {
    if (!this.paused) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}
