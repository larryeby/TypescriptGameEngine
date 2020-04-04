import { Injectable } from '@angular/core';
import { GameEngine } from '../engine/game-engine';
import { CircleCollider } from '../engine/colliders/circle.collider';
import { Circle2DRenderer } from '../engine/renderers/circle.renderer';
import { Square2DRenderer } from '../engine/renderers/square.renderer';
import { BoxCollider } from '../engine/colliders/box.collider';
import { Example } from '../object-extensions/example.gameobject';
import { StaticImageRenderer } from '../engine/renderers/static-image.renderer';

@Injectable({
  providedIn: 'root'
})
export class GameStagingService {
  constructor() { }

  public loadGameData(gameEngine: GameEngine) {
    this.registerCirclesAndSquaresTest(gameEngine);
    this.registerStaticImageTest(gameEngine);
  }

  private registerCirclesAndSquaresTest(gameEngine: GameEngine) {
    for (var i = 0; i < 15; i++) {
      let example = new Example();
      example.x = Math.floor(Math.random() * i * i);
      example.y = Math.floor(Math.random() * i * i);
      example.labels = [ `${i}` ]
      example.collider = i % 2 === 0 ? new CircleCollider() : new BoxCollider();
      example.renderer = i % 2 === 0 ? new Circle2DRenderer() : new Square2DRenderer();
      gameEngine.registerObject(example);
    }
  }

  private registerStaticImageTest(gameEngine: GameEngine) {
    let example = new Example();
    example.x = 0;
    example.y = 0;
    example.height = 227;
    example.width = 300;
    example.labels = [ `image` ]
    example.collider = new BoxCollider();
    example.renderer = new StaticImageRenderer("/assets/rhino.jpg");
    gameEngine.registerObject(example);
  }
}
