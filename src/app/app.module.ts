import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayfieldComponent } from './playfield/playfield.component';
import { GameEngine } from './engine/game-engine';

@NgModule({
  declarations: [
    AppComponent,
    PlayfieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameEngine],
  bootstrap: [AppComponent]
})
export class AppModule { }
