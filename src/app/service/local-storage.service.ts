import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable( {
    providedIn: 'root'
} )
export class LocalStorageService {
    private memoization = new Map<string, Subject<string | null>>();

    constructor() { }

    public lookup( key: string ): Observable<string | null> {
        return this.lookupSubject( key ).asObservable();
    }

    public set( key: string, value: string ): void {
        localStorage.setItem( key, value );
        this.next( key );
    }

    public remove( key: string ): void {
        localStorage.removeItem( key );
        this.next( key );
    }

    private lookupSubject( key: string ): Subject<string | null> {
        if ( !this.memoization.has( key ) ) {
            const subject = new BehaviorSubject<string | null>( localStorage.getItem( key ) );
            this.memoization.set( key, subject );
        }

        return this.memoization.get( key );
    }

    private next( key: string ): void {
        this.lookupSubject( key ).next( localStorage.getItem( key ) );
    }
}
