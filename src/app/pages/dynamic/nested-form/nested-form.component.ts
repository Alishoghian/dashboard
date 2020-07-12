import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-nested-form',
  templateUrl: './nested-form.component.html',
  styleUrls: ['./nested-form.component.scss']
})
export class NestedFormComponent implements OnInit {

  dForm:FormGroup
  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.dForm = new FormGroup({
      formG:this.fb.array([])
    })
  }
  logForm(){
    console.log(this.dForm.value);
    
  }
  getFormControlArray(){
    let item = <FormArray>this.dForm.controls['formG']
     return item.controls
  }
  addForm(){
    let cr = this.dForm.controls['formG'] as FormArray
    let inputLength = cr.length
    let pushInput: FormGroup = this.fb.group({
      name: [ null,Validators.required],
      family: [ null,Validators.required],
      age: [ null,Validators.required],
      gender: [ null,Validators.required],
      des: [ null,Validators.required],
      webDev:[ null,Validators.required],
      mobileDev:[ null,Validators.required],
      softwareDev:[ null,Validators.required],
      networkSec:[ null,Validators.required],
    })
    cr.insert(inputLength, pushInput)
  }
  deleteIndex(i:number){
    let cr = this.dForm.controls['formG'] as FormArray
    cr.removeAt(i)
  }
  reset(){
    let cr = this.dForm.controls['formG'] as FormArray
    let len = cr.length
    let timer = setInterval(()=>{
      cr.removeAt(len)
      len--
      if(cr.length==0)window.clearInterval(timer)
    },20)

  }

}
