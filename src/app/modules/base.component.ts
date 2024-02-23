import { formatNumber } from '@angular/common';
import { Directive, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnDestroy {
    protected ngUnsubscribe: Subject<void> = new Subject<void>();
    protected firstTime: Subject<void> = new Subject<void>();
    subscriptions: Subscription[] = [];

    public constructor() { }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
        this.firstTime.next();
        this.firstTime.complete();
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    addDecimalPoint(num: number): string{
        return formatNumber(num, 'es_VE', '1.2-2');
    }

    addZeroDecimalPoint(num: number): string{
        return formatNumber(num, 'es_VE', '1.0-0');
    }

}
