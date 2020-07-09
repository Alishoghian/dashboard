import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MassageService {

  $theme:BehaviorSubject<boolean>=new BehaviorSubject(false)
  getTheme=this.$theme.asObservable();

  private loader =new Subject<boolean>();
  constructor() { 
    let theme = localStorage.getItem('theme')
    if(!theme){
      localStorage.setItem('theme',this.$theme.value.toString())
    }
    else{
      let val=false
      theme == 'false' ? val=false : val=true
      this.setTheme(val)      
    }
  }
  setTheme(theme: boolean) {
    this.$theme.next(theme);
    localStorage.setItem('theme',theme.toString())
  }

  setLoader(loader:boolean){
    this.loader.next(loader)
  }
  getLoader():Observable<boolean>{
    return this.loader.asObservable()
  }
}
