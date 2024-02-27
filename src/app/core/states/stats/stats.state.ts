import { Injectable } from '@angular/core';
import { BaseState } from '../base/base.state';

@Injectable({
    providedIn: 'root'
})
export class StatsState extends BaseState<any> {}