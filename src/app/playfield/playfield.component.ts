import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Example } from '../models/example.model';
import { GameEngine } from '../engine/game-engine';
import { ColliderType, DrawType } from '../models/interfaces/gameobject.interface';

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
    for (var i = 0; i < 15; i++) {
      let example = new Example();
      example.id = "example" + i;
      example.x = Math.floor(Math.random() * i * i);
      example.y = Math.floor(Math.random() * i * i);
      example.labels = [ `${i}` ]
      example.colliderType = i % 2 === 0 ? ColliderType.Box : ColliderType.Circle;
      example.drawType = i % 2 === 0 ? DrawType.Box : DrawType.Circle;
      this.gameEngineService.registerObject(example);
    }

    let example = new Example();
    example.id = "example-1";
    example.x = 0;
    example.y = 0;
    example.height = 227;
    example.width = 300;
    example.labels = [ `image` ]
    example.colliderType = ColliderType.Box;
    example.drawType = DrawType.Image;
    example.imagePath = "/assets/rhino.jpg"
    this.gameEngineService.registerObject(example);

    // let player2 = new Player();
    // player2.id = "player21";
    // player2.x = window.innerWidth;
    // player2.y = 300;
    // player2.labels = [ "test label" ]
    // this.gameEngineService.registerObject(player2);
  }
}
