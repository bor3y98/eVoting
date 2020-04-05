import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  option;
  constructor() {

   }

  ngOnInit(): void {
    
  }
  onSubmit(){
    console.log(this.option)
  }

}
