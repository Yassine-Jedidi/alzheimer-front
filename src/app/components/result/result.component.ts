import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from '../../service/prediction.service';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  result: any = '';
  final_result: any = '';

  constructor(private router: Router, private predictionService: PredictionService) {}

  ngOnInit() {
    this.result = this.predictionService.getResult();
    if (this.result["res3"] == "control") {
      this.final_result = "The patient is not showing signs of Alzheimer's Disease.";
      // Trigger confetti for negative result (no Alzheimer's detected)
      this.triggerConfetti();
    } else {
      this.final_result = "The patient may have Alzheimer's Disease.";
    }
    this.result["res4"] = (parseFloat(this.result["res4"]) * 100).toFixed(2);
    console.log(this.result);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  triggerConfetti() {
    confetti.default({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
