import { Injectable } from '@angular/core';
import { BaseState } from '../base/base.state';

@Injectable({
    providedIn: 'root'
})
export class RecentTracksState extends BaseState<any> {}