import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  public get Form(): FormGroup {
    return this.form;
  }

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(data) {
    this.authService.login(data).subscribe(result => {
      if (result.success) {
        console.log(result);
        this.userService.setUser(result.data);
        this.router.navigate(['/dashboard/users']);
      } else {

      }
    })
  }

}
