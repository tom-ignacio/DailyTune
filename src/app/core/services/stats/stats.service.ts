import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../../states/base/state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { StatsState } from '../../states/stats/stats.state';
import { RecentTracksState } from '../../states/stats/recenttracks.state';
import { WeeklyTracksState } from '../../states/stats/weeklytracks.state';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private readonly API_KEY = `&api_key=680d8f8b1b6a9e0d8599a0830174afe6&format=json`;
  private readonly ENDPOINT_RECENT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=`
  private readonly ENDPOINT_WEEKLYTRACK = `https://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=`

  constructor(
    private httpClient: HttpClient,
    private statsState: StatsState,
    private recentTracksState: RecentTracksState,
    private weeklyTracksState: WeeklyTracksState,
    public router: Router,
  ) {}

  public getRecentTracksLoading$(): Observable<boolean> {
    return this.recentTracksState.getLoading$();
  }

  public getRecentTracks$(): Observable<any | null> {
    return this.recentTracksState.getState$();
  }

  public getRecentTracksAPI(data: any, unsubscribe: Subject<void>) {
    this.recentTracksState.setState(null);
    this.recentTracksState.setLoading(true);
    this.httpClient
      .get<any>(`${this.ENDPOINT_RECENT}${data.username}&limit=200&from=${data.from}&to=${data.to}/${this.API_KEY}`)
      .pipe(takeUntil(unsubscribe))
      .subscribe({
        next: (response: any) => {
          if (!response.error) {
            this.recentTracksState.setState(response.recenttracks.track);
          }
        },
        error: (err) => {
        },
        complete: () => {
            this.recentTracksState.setLoading(false);
        },
      });
  }

  public getWeeklyTracksLoading$(): Observable<boolean> {
    return this.weeklyTracksState.getLoading$();
  }

  public getWeeklyTracks$(): Observable<any | null> {
    return this.weeklyTracksState.getState$();
  }

  public getWeeklyTracksAPI(data: any, unsubscribe: Subject<void>) {
    this.weeklyTracksState.setState(null);
    this.weeklyTracksState.setLoading(true);
    this.httpClient
      .get<any>(`${this.ENDPOINT_WEEKLYTRACK}${data.username}${this.API_KEY}`)
      .pipe(takeUntil(unsubscribe))
      .subscribe({
        next: (response: any) => {
          if (!response.error) {
            this.weeklyTracksState.setState(response.weeklytrackchart.track);
          }
        },
        error: (err) => {
        },
        complete: () => {
            this.weeklyTracksState.setLoading(false);
        },
      });
  }
}
