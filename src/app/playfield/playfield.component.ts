import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Example } from '../object-extensions/example.gameobject';
import { GameEngine } from '../engine/game-engine';
import { Circle2DRenderer } from '../engine/renderers/circle.renderer';
import { Square2DRenderer } from '../engine/renderers/square.renderer';
import { StaticImageRenderer } from '../engine/renderers/static-image.renderer';
import { BoxCollider } from '../engine/colliders/box.collider';
import { CircleCollider } from '../engine/colliders/circle.collider';

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.less']
})
export class PlayfieldComponent implements OnInit {
  @ViewChild('playfield', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  constructor (private gameEngineService: GameEngine) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.gameEngineService.registerContext(this.ctx);
    this.registerGameObjects();
    this.gameEngineService.run();
  }

  private registerGameObjects(): void {
    this.registerCirclesAndSquaresTest();
    this.registerStaticImageTest();
  }

  private registerCirclesAndSquaresTest() {
    for (var i = 0; i < 15; i++) {
      let example = new Example();
      example.id = "example" + i;
      example.x = Math.floor(Math.random() * i * i);
      example.y = Math.floor(Math.random() * i * i);
      example.labels = [ `${i}` ]
      example.collider = i % 2 === 0 ? new CircleCollider() : new BoxCollider();
      example.renderer = i % 2 === 0 ? new Circle2DRenderer() : new Square2DRenderer();
      this.gameEngineService.registerObject(example);
    }
  }

  private registerStaticImageTest() {
    let example = new Example();
    example.id = "example-1";
    example.x = 0;
    example.y = 0;
    example.height = 227;
    example.width = 300;
    example.labels = [ `image` ]
    example.collider = new BoxCollider();
    example.renderer = new StaticImageRenderer("/assets/rhino.jpg");
    this.gameEngineService.registerObject(example);
  }
}
