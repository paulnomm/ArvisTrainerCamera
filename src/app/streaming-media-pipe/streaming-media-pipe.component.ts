import { Component, OnInit } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-streaming-media-pipe',
  templateUrl: './streaming-media-pipe.component.html',
  styleUrls: ['./streaming-media-pipe.component.scss'],
})
export class StreamingMediaPipeComponent  implements OnInit{

  constructor(
    private streamingMedia: StreamingMedia
  ) { }

  ngOnInit(): void {
      this.playVideo();
  }

  playVideo() {
    const options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played successfully'); },
      errorCallback: (e:string) => { console.log('Error streaming'); },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: true
    };

    this.streamingMedia.playVideo('rtsp://192.168.1.105:8080/h264.sdp', options);
  }

}