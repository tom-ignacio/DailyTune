import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../../states/base/state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_KEY = `&api_key=680d8f8b1b6a9e0d8599a0830174afe6&format=json`;
  private readonly ENDPOINT_AUTH = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=`;

  constructor(
    private httpClient: HttpClient,
    private state: State,
    public router: Router,
  ) {}

  public getAuthLoading$(): Observable<boolean> {
    return this.state.getLoading$();
  }

  public getAuth$(): Observable<any> {
    return this.state.getState$();
  }

  public getAuthAPI(username: string | null, unsubscribe: Subject<void>) {
    this.state.setState(null);
    this.state.setLoading(true);
    this.httpClient
      .get<any>(`${this.ENDPOINT_AUTH}${username}/${this.API_KEY}`)
      .pipe(takeUntil(unsubscribe))
      .subscribe({
        next: (response: any) => {
          if (!response.error) {
            localStorage.setItem('username', response.user.name)
            this.router.navigate(['home']);
          }
        },
        error: (err) => {
        },
        complete: () => {
            this.state.setLoading(false);
        },
      });
  }
}
