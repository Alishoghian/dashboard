import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MassageService {

  $theme:BehaviorSubject<boolean>=new BehaviorSubject(false)
  getTheme=this.$theme.asObservable();

  private loader =new Subject<boolean>();
  constructor() { }
  setTheme(theme: boolean) {
    this.$theme.next(theme);
  }

  setLoader(loader:boolean){
    this.loader.next(loader)
  }
  getLoader():Observable<boolean>{
    return this.loader.asObservable()
  }
}
