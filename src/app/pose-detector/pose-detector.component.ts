import { Component, OnInit, AfterViewInit } from '@angular/core';

declare const Pose: any;
declare const drawConnectors: any;
declare const drawLandmarks: any;
declare const POSE_CONNECTIONS: any;

@Component({
  selector: 'app-pose-detector',
  templateUrl: './pose-detector.component.html',
  styleUrls: ['./pose-detector.component.scss'],
})
export class PoseDetectorComponent  implements AfterViewInit {

  private pose: any;
  private canvasCtx: CanvasRenderingContext2D | null = null;

  ngAfterViewInit() {
    const imageStreamElement = document.getElementById('streamImage') as HTMLImageElement;
    const canvasElement = document.getElementsByClassName('output_canvas')[0] as HTMLCanvasElement;
    this.canvasCtx = canvasElement.getContext('2d');

    this.pose = new Pose({ locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}` });
    this.pose.setOptions({
      static_image_mode: false,
      modelComplexity: 2,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    this.pose.onResults(this.onResults.bind(this));

    imageStreamElement.onload = async () => {
      if (this.canvasCtx) {
        await this.pose.send({ image: imageStreamElement });
        requestAnimationFrame(() => this.updateImageStream(imageStreamElement));
      }
    };

    this.updateImageStream(imageStreamElement);
  }

  private onResults(results: any) {
    if (!this.canvasCtx) return;

    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, 1080, 1920);
    this.canvasCtx.drawImage(document.getElementById('streamImage') as HTMLImageElement, 0, 0, 3080, 1520);

    if (results.poseLandmarks) {
      drawConnectors(this.canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
      drawLandmarks(this.canvasCtx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 });
    }

    this.canvasCtx.restore();
  }

  private updateImageStream(imageStreamElement: HTMLImageElement) {
    imageStreamElement.src = 'http://192.168.1.105:8080/video';
    // imageStreamElement.src = 'rtsp://192.168.1.105:8080/h264_ulaw.sdp';

  }
}