import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PoseDetectorComponent } from './pose-detector/pose-detector.component';
import { StreamingVideoComponent } from './streaming-video/streaming-video.component';

import { StreamingMedia } from '@awesome-cordova-plugins/streaming-media/ngx';
import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';
import { StreamingMediaPipeComponent } from './streaming-media-pipe/streaming-media-pipe.component';


@NgModule({
  declarations: [AppComponent, PoseDetectorComponent, StreamingVideoComponent, StreamingMediaPipeComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: StreamingMedia, useClass: StreamingMedia },
    { provide: VideoPlayer, useClass: VideoPlayer }
  ],  
  bootstrap: [AppComponent],
})
export class AppModule {}
