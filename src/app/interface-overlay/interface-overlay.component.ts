import { Component, OnInit } from '@angular/core';
import { GameEngine } from '../engine/game-engine';

@Component({
  selector: 'app-interface-overlay',
  templateUrl: './interface-overlay.component.html',
  styleUrls: ['./interface-overlay.component.less']
})
export class InterfaceOverlayComponent implements OnInit {
  constructor(private gameEngine: GameEngine) { }

  ngOnInit(): void {
  }

  public pause(): void {
    this.gameEngine.togglePause();
  }
}
