import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayfieldComponent } from './playfield/playfield.component';
import { InterfaceOverlayComponent } from './interface-overlay/interface-overlay.component';

import { GameEngine } from './engine/game-engine';
import { GameStagingService } from './services/game-staging.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayfieldComponent,
    InterfaceOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameEngine, GameStagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
