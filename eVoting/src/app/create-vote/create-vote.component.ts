import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var $: any;
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-vote',
  templateUrl: './create-vote.component.html',
  styleUrls: ['./create-vote.component.scss']
})
export class CreateVoteComponent implements OnInit {
  createVoteForm; 
  constructor(public formBuilder: FormBuilder, public http: HttpClient, private router: Router) {


    this.createVoteForm = this.formBuilder.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isPublic: [true, Validators.required],
      options: this.formBuilder.array([]),
      optionsImages: this.formBuilder.array([]),
    });
    this.addOption();
  }

  ngOnInit() {

    // Datepicker formate
    $('#startDate').datepicker({
      dateFormat: 'dd-mm-yy',
      minDate: -0,
      onSelect(startDateText) {
        $('#startDateFeedback').fadeOut(500);
        $('#endDate').datepicker('destroy');
        const startDate = $('#startDate').val().split('-');
        $('#endDate').datepicker({
          dateFormat: 'dd-mm-yy',
          minDate: new Date((startDate[2]), startDate[1], startDate[0]),
          onSelect(endDateText) {
          }
        });
        // console.log('Start date: ' + dateText + '; input\'s current value: ' + this.value);
      }
    });

  }


  // Public or private vote
  changePublicStatus(event) {
    if (!$(event.target).hasClass('active')) {
      $('.form-check').removeClass('active');
      $(event.target).parent().addClass('active');
      this.createVoteForm.controls['isPublic'].setValue($(event.target).val());
    }
  }


  // Options operations
  addOption() {
    const options = this.createVoteForm.get('options') as FormArray;
    options.push(this.formBuilder.control(''));
    const optionsImages = this.createVoteForm.get('optionsImages') as FormArray;
    optionsImages.push(this.formBuilder.control(''));
  }
  deleteOption(index) {
    if (index) {
      const options = this.createVoteForm.get('options') as FormArray;
      const optionsImages = this.createVoteForm.get('optionsImages') as FormArray;
      options.removeAt(index);
      optionsImages.removeAt(index);

    }
  }
  addOptionText(index, event) {
    const options = this.createVoteForm.get('options') as FormArray;
    options.controls[index].setValue($(event.target).val());
    // options.push(this.formBuilder.control($(event.target).val()));
  }


  // On form submit
  createVote() {

    this.createVoteForm.controls['startDate'].setValue($('#startDate').val());
    this.createVoteForm.controls['endDate'].setValue($('#endDate').val());
    if (this.createVoteForm.invalid) {
      return;
    }
    const data = this.createVoteForm.value;
    console.log(data);
    this.http.post('http://localhost:8000/vote/create', data).subscribe(res => {
      if (!res['isError']) {
        this.router.navigate(['/']);
      }
    });
  }

  fileUploads(event: any, index: any) {
    console.log(index)
    const file = event.target.files;
    const optionsImages = this.createVoteForm.get('optionsImages') as FormArray;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = reader.result + '';
      optionsImages.controls[index].setValue(this.formBuilder.control(base64));
    };
    reader.readAsDataURL(file[0]);
    // event.srcElement.value = null;
  }
}
