import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  myReactiveForm: FormGroup;
  genders = [
    {
      id: 1,
      genderType: 'Male',
    },
    {
      id: 2,
      genderType: 'Female',
    },
  ];

  notAllowedNames = ["Sudhakar", "Nikita"];
  notAllowedEmail:string = "sanagar.sudhakar@gmail.com";
  constructor() {}

  ngOnInit() {
    this.myReactiveForm = new FormGroup({
      'userDetail': new FormGroup({
        'username': new FormControl(null, [Validators.required, Validators.minLength(5), this.naNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.naEmails.bind(this)),
      }),
      'course': new FormControl('Html'),
      'gender': new FormControl('Male'),
      'skills': new FormArray([
        new FormControl(null, Validators.required)
      ])
    });


    /* Status changes and Value changes */
    this.myReactiveForm.valueChanges.subscribe((value)=> {
      console.log("Value Changes:");
      console.log(value);
    });

    this.myReactiveForm.statusChanges.subscribe((value)=> {
      console.log("Status Changes: ");
      console.log(value);
    })
    /* End Status changes and Value changes */

    /* Set Value and Patch Value */
    this.myReactiveForm.setValue({
      'userDetail': {
        'username': 'Sudhakar',
        'email': 'n.s@gmail.com'
      },
      'course': '',
      'gender':'',
      'skills': ['']
    })

    this.myReactiveForm.patchValue({
      'userDetail': {
        'username': 'Sudhakar Sanagar',
      }
    })
    /* End Set Value and Patch Value */
  }

  onSubmit() {
    console.log(this.myReactiveForm);
  }

  get skillsList () {
    return this.myReactiveForm.get('skills') as FormArray;
  }

  onAddSkills() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.myReactiveForm.get('skills')).push(control);
    /* or */
    /* this.skillsList.push(new FormControl(null)) */
  }

  /* Custom Validators */
  naNames(control: FormControl) {
    if(this.notAllowedNames.indexOf(control.value) !== -1) {
      return {nameIsNotAllowed: true}
    }
    return null;
  }
  /* End Custom Validators */

  /* Custom Async Validators */
  naEmails(control: any): Promise<any> | Observable<any> {
    const myResponse = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log(control.value);
        if(control.value === this.notAllowedEmail) {
          resolve({emailIsNotAllowed: true});
        } else {
          resolve(null);
        }
      }, 3000);

    })
    return myResponse;
  }
  /* End Custom Async Validators */

  /* Reset Form */
  resetForm() {
    // this.myReactiveForm.reset();
    // or
    this.myReactiveForm.reset({
      'userDetail': {
        'username': 'Sudhakar',
        'email': 'n.s@gmail.com'
      },
      'course': 'Html',
      'gender':'Male',
      'skills': ['Java']
    })
  }
  /* End Reset Form */

}
