import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from '../../service/prediction.service';
import { AudioRecordingService } from '../../service/audio-recording.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./upload.component.html",
  styles: [`
    /* Your styles here */
  `]
})
export class UploadComponent {
  selectedFile: File | null = null;
  isRecording: boolean = false;
  audioUrl: string | null = null;
  recordedBlob: Blob | null = null;
  isAnalyzing: boolean = false;
  progress: number = 0;

  constructor(
    private router: Router,
    private predictionService: PredictionService,
    private audioRecordingService: AudioRecordingService
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.audioUrl = URL.createObjectURL(this.selectedFile);
      this.recordedBlob = null;
    }
  }

  async startRecording() {
    this.isRecording = true;
    await this.audioRecordingService.startRecording();
  }

  async stopRecording() {
    this.isRecording = false;
    this.recordedBlob = await this.audioRecordingService.stopRecording();
    this.audioUrl = URL.createObjectURL(this.recordedBlob);
    this.selectedFile = null;
  }

  predict() {
    const audioData = this.selectedFile || this.recordedBlob;
    if (audioData) {
      this.isAnalyzing = true;
      this.progress = 0;

      this.predictionService.sendData(audioData).subscribe({
        next: (result) => {
          // Handle result
          this.predictionService.storeResult(result);
        },
        error: (error) => {
          console.error('Error during prediction:', error);
        },
        complete: () => {
          this.isAnalyzing = false;
          this.progress = 100;

          // Delay navigation to the result page
          setTimeout(() => {
            this.router.navigate(['/result'], { state: { result: this.predictionService.getResult() } });
          }, 1000); // Delay of 1 second to show the completed progress bar
        }
      });

      // Simulate progress (optional)
      const interval = setInterval(() => {
        if (this.progress < 90) {
          this.progress += 5;
        } else {
          clearInterval(interval);
        }
      }, 500);
    }


  }

  get canPredict(): boolean {
    return !!(this.selectedFile || this.recordedBlob) && !this.isRecording;
  }
}
