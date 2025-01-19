import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true, // Add this line
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('0.5s ease-in-out')
      ])
    ]),
    trigger('scaleUp', [
      state('void', style({ transform: 'scale(0.9)', opacity: 0 })),
      transition(':enter', [
        animate('1s ease-in-out')
      ])
    ])
  ]
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
