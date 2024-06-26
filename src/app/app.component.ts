import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'DailyTune';
  authorizedUser: boolean = false;
  showFiller = false;

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.authorizedUser = true;
    }
  }

}
