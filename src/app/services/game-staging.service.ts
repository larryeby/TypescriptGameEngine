import { Injectable } from '@angular/core';
import { GameEngine } from '../engine/game-engine';
import { CircleCollider } from '../engine/colliders/circle.collider';
import { Circle2DRenderer } from '../engine/renderers/circle.renderer';
import { Square2DRenderer } from '../engine/renderers/square.renderer';
import { BoxCollider } from '../engine/colliders/box.collider';
import { Example } from '../object-extensions/example.gameobject';
import { StaticImageRenderer } from '../engine/renderers/static-image.renderer';
import { IGameObject } from '../engine/game-objects/interfaces/gameobject.interface';
import { ExampleChild } from '../object-extensions/examplechild.gameobject';
import { AudioSettings, BaseAudioPlayer } from '../engine/audio/audio.player';
import { AudioGameObject } from '../object-extensions/example-audio.gameobject';
import { SpriteRenderer, SpriteOptions } from '../engine/renderers/sprite.renderer';
import { ExampleSpriteObject } from '../object-extensions/example-sprite-animation.gameobject';
import { PlayerGameObject } from '../object-extensions/example-player.gameobject';
import { BaseGameObject } from '../engine/game-objects/base.gameobject';
import { WorldGameObject } from '../object-extensions/example-world-parent.gameobject';

/**
 * Literally all of the code below is for testing purposes.
 */
@Injectable({
  providedIn: 'root'
})
export class GameStagingService {
  constructor() { }

  public loadGameData(gameEngine: GameEngine): void {
    let gameObjects: IGameObject[] = [];
    gameObjects.push(new WorldGameObject());
    gameObjects.push(new PlayerGameObject());
    // this.registerCirclesAndSquaresTest(gameObjects);
    // this.registerStaticImageTest(gameObjects);
    // this.registerChildObjectTest(gameObjects);
    // this.registerAudioObject(gameObjects);
    // this.registerSpriteImageTest(gameObjects);
    gameEngine.loadObjects(gameObjects);
  }

  private registerCirclesAndSquaresTest(gameObjects: IGameObject[]): void {
    for (let i = 0; i < 20; i++) {
      let example = new Example();
      example.x = Math.floor(Math.random() * window.innerWidth * 1.5);
      example.y = Math.floor(Math.random() * window.innerHeight * 1.5);
      example.labels = [`${i}`]
      example.collider = i % 2 === 0 ? new CircleCollider() : new BoxCollider();
      example.renderer = i % 2 === 0 ? new Circle2DRenderer() : new Square2DRenderer();
      gameObjects.push(example);
    }
  }

  private registerAudioObject(gameObjects: IGameObject[]): void {
    let audioSettings = new AudioSettings("/assets/background.wav");
    audioSettings.startTime = 0;
    audioSettings.maxDuration = 6.189333;
    audioSettings.volume = 1;
    let audioGameObject = new AudioGameObject(audioSettings);
    gameObjects.push(audioGameObject);
  }

  private registerChildObjectTest(gameObjects: IGameObject[]): void {
    let example = new Example();
    example.x = Math.floor(Math.random() * window.innerWidth);
    example.y = Math.floor(Math.random() * window.innerHeight);
    example.labels = [`parent`]
    example.collider = example.x % 2 === 0 ? new CircleCollider() : new BoxCollider();
    example.renderer = example.x % 2 === 0 ? new Circle2DRenderer() : new Square2DRenderer();
    example.renderer.backgroundColor = "blue";

    for (let i = 0; i < 5; i++) {
      let child = new ExampleChild();
      child.xOffset = Math.floor(Math.random() * window.innerWidth / 2);
      child.yOffset = Math.floor(Math.random() * window.innerHeight / 2);
      child.labels = [`child`]
      child.collider = i % 2 === 0 ? new CircleCollider() : new BoxCollider();
      child.renderer = i % 2 === 0 ? new Circle2DRenderer() : new Square2DRenderer();
      child.renderer.backgroundColor = "DarkOrange";
      example.attach(child);
    }

    gameObjects.push(example);
  }

  private registerSpriteImageTest(gameObjects: IGameObject[]): void {

    let spriteWidth = 400;
    let spriteHeight = 450;
    let spriteScale = 1;

    let spriteOptions = new SpriteOptions();
    spriteOptions.imagePath = "/assets/spritesheet.png";
    spriteOptions.spriteHeight = spriteHeight;
    spriteOptions.spriteWidth = spriteWidth;
    spriteOptions.xScale = spriteScale;
    spriteOptions.yScale = spriteScale;
    spriteOptions.rowLength = 4;
    spriteOptions.topOffset = 100;
    spriteOptions.columnSelected = 0;
    spriteOptions.columnLength = 4;
    spriteOptions.rowSelected = 0;
    spriteOptions.animationLengthTotalMilliseconds = 500;


    let spriteRenderer = new SpriteRenderer(spriteOptions)
    let example = new ExampleSpriteObject(spriteRenderer);
    example.width = spriteWidth;
    example.height = spriteHeight;
    example.x = (window.innerWidth / 2) - (example.width / 2);
    example.y = (window.innerHeight / 2) - (example.height / 2);
    gameObjects.push(example);
  }

  private registerStaticImageTest(gameObjects: IGameObject[]): void {
    let example = new Example();
    example.x = 0;
    example.y = 0;
    example.height = 227;
    example.width = 300;
    example.labels = [`image`]
    example.collider = new BoxCollider();
    example.renderer = new StaticImageRenderer("/assets/rhino.jpg");
    gameObjects.push(example);
  }
}
