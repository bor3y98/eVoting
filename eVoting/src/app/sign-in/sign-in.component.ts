import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $:any; // to use jQeury
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public http: HttpClient, private router: Router,
    public cookies: CookieService) {

    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });


  }

  ngOnInit(): void {
 
  }
  isLoggedIn() {
    return (this.cookies.get('token').length !== 0)
  }
  onTextChange(event){
    if($(event.target).val().length===0){
      $(event.target).next().show();
    }
    else{
      $(event.target).next().hide();

    }
  }


  login() {
    
    const data = this.signInForm.value;
    console.log(data);
     if(data['email'].length===0){
      $("#email-feedback").show();
     }
     if(data['password'].length===0){
      $("#password-feedback").show();
     }
    
    if (this.signInForm.invalid) {  // if login is falid send data to backend ...
      return;
    }
    this.http.post('http://localhost:8000/user/sign-in', data).subscribe(res => {
    
      if (!res['isError']) {
        this.cookies.set('token', res['token']);
      }
      else{
        $("#login-feedback").html(res['message']); // send res.message to html
        $("#login-feedback").show();
      }
    });
  }
 

  logout() {
    this.cookies.delete('token');
   
  }

}
