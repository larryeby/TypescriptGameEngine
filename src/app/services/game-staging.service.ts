import { Injectable } from '@angular/core';
import { GameEngine } from '../engine/game-engine';
import { CircleCollider } from '../engine/colliders/circle.collider';
import { Circle2DRenderer } from '../engine/renderers/circle.renderer';
import { Square2DRenderer } from '../engine/renderers/square.renderer';
import { BoxCollider } from '../engine/colliders/box.collider';
import { Example } from '../object-extensions/example.gameobject';
import { StaticImageRenderer } from '../engine/renderers/static-image.renderer';
import { IGameObject } from '../engine/game-objects/interfaces/gameobject.interface';

@Injectable({
  providedIn: 'root'
})
export class GameStagingService {
  constructor() { }

  public loadGameData(gameEngine: GameEngine) {
    let gameObjects: IGameObject[] = [];
    this.registerCirclesAndSquaresTest(gameObjects);
    this.registerStaticImageTest(gameObjects);
    gameEngine.loadObjects(gameObjects);
  }

  private registerCirclesAndSquaresTest(gameObjects: IGameObject[]) {
    for (var i = 0; i < 300; i++) {
      let example = new Example();
      example.x = Math.floor(Math.random() * window.innerWidth * 1.5);
      example.y = Math.floor(Math.random() * window.innerHeight * 1.5);
      example.labels = [ `${i}` ]
      example.collider = i % 2 === 0 ? new CircleCollider() : new BoxCollider();
      example.renderer = i % 2 === 0 ? new Circle2DRenderer() : new Square2DRenderer();
      gameObjects.push(example);
    }
  }

  private registerStaticImageTest(gameObjects: IGameObject[]) {
    let example = new Example();
    example.x = 0;
    example.y = 0;
    example.height = 227;
    example.width = 300;
    example.labels = [ `image` ]
    example.collider = new BoxCollider();
    example.renderer = new StaticImageRenderer("/assets/rhino.jpg");
    gameObjects.push(example);
  }
}
