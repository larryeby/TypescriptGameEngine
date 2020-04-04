import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GameEngine } from '../engine/game-engine';
import { GameStagingService } from '../services/game-staging.service';

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.less']
})
export class PlayfieldComponent implements OnInit {
  @ViewChild('playfield', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor (
    private gameEngineService: GameEngine,
    private gameStagingService: GameStagingService) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    window.addEventListener('resize', this.sizeWindow.bind(this));
    this.sizeWindow();
    this.gameEngineService.registerContext(this.ctx);
    this.gameStagingService.loadGameData(this.gameEngineService);
    this.gameEngineService.run();
  }

  private sizeWindow(): void {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.canvas.nativeElement.width = window.outerWidth;
    this.canvas.nativeElement.height = window.outerHeight;
  }
}
