import { Injectable } from '@angular/core';
import { IGameObject } from './game-objects/interfaces/gameobject.interface';
import { GameContext } from './game-context';
import { CreateObjectEvent } from './events/object-actions.event';

@Injectable({
  providedIn: 'root'
})
export class GameEngine {
  private gameContext: GameContext;
  private ctx: CanvasRenderingContext2D;
  private paused: boolean = false;

  // This variable controls when objects should begin drawing to the canvas.
  private renderVariance: number = 5;

  constructor() { 
    this.gameContext = new GameContext();
  }

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

  public loadObjects(objects: IGameObject[]): void {
    objects.forEach((object) => {
      this.gameContext.dispatchEvent(new CreateObjectEvent(object));
    });
  }

  public animate(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    var gameObjects = Object.values(this.gameContext.getGameObjects());
    this.handleObjectLoop(gameObjects, gameObjects);
    this.gameContext.triggerEvents();
    this.cycleAnimation();
  }

  private handleObjectLoop(updatingGameObjects: IGameObject[], collisionObjects: IGameObject[]) {
    updatingGameObjects.forEach(object => {
      object.update();
      
      // Check whether the item is in the frame before rendering.
      collisionObjects = collisionObjects.concat(object.children).filter(x => x.collider);
      if (object.x - object.width + this.renderVariance <= window.innerWidth && 
          object.x + object.width >= 0 - this.renderVariance &&
          object.y - object.height - this.renderVariance <= window.innerHeight &&
          object.y + object.height >= 0 + this.renderVariance) {
            object.checkCollisions(collisionObjects);
            object.render(this.ctx);
      }

      if (object.children.length > 0) {
        this.handleObjectLoop(object.children.map((child) => {
          child.x = object.x;
          child.y = object.y;
          return child;
        }), collisionObjects);
      }
    });
  }

  private cycleAnimation(): void {
    if (!this.paused) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}
