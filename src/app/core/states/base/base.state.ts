import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BaseState<T> {
  protected state       : BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);
  protected loadingState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getState$(): Observable<T | null> {
    return this.state.asObservable();
  }

  public setState(state: T | null): void {
      this.state.next(state);
  }

  public getLoading$(): Observable<boolean> {
      return this.loadingState.asObservable();
  }

  public setLoading(isLoading: boolean): void {
      this.loadingState.next(isLoading);
  }
}
