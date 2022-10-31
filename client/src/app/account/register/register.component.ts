import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, of, switchMap, timer } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createRegister();
  }

  createRegister() {
    this.registerForm = this.formBuilder.group({
      displayName: [null,[Validators.required]],
      email: [null, [Validators.required, 
                     Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
                     [this.checkIfEmailRegistered()]],
      password: [null, [Validators.required, Validators.pattern('(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'?/&gt;.&lt;,])(?!.*\\s).*$')]]
    });
  }

  checkIfEmailRegistered(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap( () => {
          if(!control.value) {
            return of(null);
          }
          return this.accountService.isEmailRegistered(control.value).pipe(
            map(res => {
              return res ? {emailregistered: true} : null;
            })
          )
        })
      )
    }
  }

  submit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/shop');
      },
      error: (error) => {
        console.log(error);
        this.errors = error.error.message;
      }
    })
  }

}
