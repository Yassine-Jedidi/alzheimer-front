import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,FooterComponent],
  templateUrl:"./app.component.html",
  styles: [`
    :host {
      display: block;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #333;
      text-align: center;
    }
  `]
})
export class AppComponent {
  title = 'alzheimer';
}
