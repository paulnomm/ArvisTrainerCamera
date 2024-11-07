import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions } from '@awesome-cordova-plugins/streaming-media/ngx';
import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';

declare var Streaming: any;

@Component({
  selector: 'app-streaming-video',
  templateUrl: './streaming-video.component.html',
  styleUrls: ['./streaming-video.component.scss'],
})
export class StreamingVideoComponent implements OnInit {

  constructor(
    private platform: Platform,
    private streamingMedia: StreamingMedia,
    private videoPlayer: VideoPlayer
    
  ) {  
    this.platform.ready().then(() => {
    this.playStreaming();
  });
 }

  ngOnInit(): void {
    this.playStreamingVideo();
    // this.playVideo();
  }

  playStreamingVideo() {
    const options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video iniciado'); },
      errorCallback: (e: string) => { console.log('Error al reproducir', e); },
      orientation: 'landscape'
    };
    this.streamingMedia.playVideo('http://192.168.1.105:8080/video', options);
  }

  // playVideo() {
  //   this.videoPlayer.play('\src\assets\video.mp4').then(() => {
  //     console.log('Video finalizado');
  //   }).catch(err => {
  //     console.error(err);
  //   });
  // }

  playStreaming() {
    const options = {
      successCallback: () => console.log('Video started'),
      errorCallback: (e: any) => console.log('Error streaming', e),
      orientation: 'landscape'
    };
    this.streamingMedia.playVideo('http://192.168.1.105:8080/video', options);
  }
}
