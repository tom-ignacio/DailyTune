import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Router } from '@angular/router';
import { StatsService } from '../../../core/services/stats/stats.service';
import moment from 'moment';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent extends BaseComponent implements OnInit {
  userInfo: any;
  recentTracks: any;
  weeklyTracks: any;

  constructor(
    public router: Router,
    private statsService: StatsService,
  ) {
    super();
  }

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['auth']);
    }

    const userInfo = localStorage.getItem('user');

    if (userInfo) {      
      this.userInfo = JSON.parse(userInfo);

      var today = new Date();
      var yesterday = new Date(today);
      yesterday.setDate(today.getDate()-1);

      const request = {
        username: this.userInfo.name,
        from: moment(yesterday).unix(),
        to: moment(today).unix()
      }

      this.statsService.getRecentTracksAPI(request, this.ngUnsubscribe);
      this.statsService
        .getRecentTracks$()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response: any) => {
          if (response) {
            this.recentTracks = response;
          }
        });

      this.statsService.getWeeklyTracksAPI(request, this.ngUnsubscribe);
      this.statsService
        .getWeeklyTracks$()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response: any) => {
          if (response) {
            this.weeklyTracks = response;
          }
        });
    }
  }
}
