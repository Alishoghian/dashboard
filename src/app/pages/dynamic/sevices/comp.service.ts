import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class CompService {
    private compID = new Subject<string>()

    setCompID(data:string){
        this.compID.next(data)
    }
    getCompID():Observable<string>{
        return this.compID.asObservable()
    }
}