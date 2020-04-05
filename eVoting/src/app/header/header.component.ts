import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any; // to use jQeury

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  signInForm: FormGroup;
  signUpForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public http: HttpClient, private router: Router,
    public cookies: CookieService) {

    // signInForm form group
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    // signUpForm form group
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],

    });



  }
  ngOnInit(): void {
  }

  isLoggedIn() {
    return (this.cookies.get('token').length === 0)
  }
  onTextChange(event) {
    if ($(event.target).val().length === 0) {
      $(event.target).next().show();
    }
    else {
      $(event.target).next().hide();

    }
  }



  login() {

    const data = this.signInForm.value;
    console.log(data);
    if (data['email'].length === 0) {
      $("#email-feedback").show();
    }
    if (data['password'].length === 0) {
      $("#password-feedback").show();
    }

    if (this.signInForm.invalid) {  // if login is falid send data to backend ...
      return;
    }
    this.http.post('http://localhost:8000/user/sign-in', data).subscribe(res => {

      if (!res['isError']) {
        this.cookies.set('token', res['token']);


      }
      else {
        $("#login-feedback").html(res['message']); // send res.message to html
        $("#login-feedback").show();
      }
    });
  }


  logout() {
    this.cookies.delete('token');

  }




  // signUp ---------------------------------

  signUp() {

    const data = this.signUpForm.value;
    for(let i =0;i<$('.signup-input').length; i++){
      if($($('.signup-input')[i]).val().length===0){
        $($('.signup-input')[i]).next().show();
      }

    }
    if (this.signUpForm.invalid) {  // if signUp is falid send data to backend ...
      return;
    }
    this.http.post('http://localhost:8000/user/create', data).subscribe(res => {
      console.log(res);
      if (!res['isError']) {
        this.cookies.set('token', res['token']);
        this.cookies.set('name', res['name']);
      }
      else {
        if (res['message'] !== 'Maximum number of users are 10') {
          $('#sign-up-feedback').html(res['message']);
          $('#sign-up-feedback').show();
        }
      }
    });
  }

}



