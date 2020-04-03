import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Player } from '../models/player.model';
import { GameEngineService } from '../engine/game-engine';

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.less']
})
export class PlayfieldComponent implements OnInit {
  @ViewChild('playfield', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  constructor (private gameEngineService: GameEngineService) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.gameEngineService.registerContext(this.ctx);
    this.loadGame();
  }

  private loadGame(): void {
    // for (var i = 0; i < 100; i++) {
    //   let player = new Player();
    //   player.id = "player" + i;
    //   player.x = Math.floor(Math.random() * i * i);
    //   player.y = Math.floor(Math.random() * i * i);
    //   this.gameEngineService.registerObject(player);
    // }
    let player = new Player();
    player.id = "player1";
    player.x = 100;
    player.y = 399;
    this.gameEngineService.registerObject(player);

    let player2 = new Player();
    player2.id = "player21";
    player2.x = window.innerWidth;
    player2.y = 300;
    player2.labels = [ "test label" ]
    this.gameEngineService.registerObject(player2);

    this.gameEngineService.animate();
  }
}
