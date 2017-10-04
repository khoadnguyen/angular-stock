import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E*Trudite';

  constructor(@Inject('API_URL') private url: string) {
    // console.log(this.url);
  }
}
