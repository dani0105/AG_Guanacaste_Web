import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private toastService:ToastrService) { }

  ngOnInit(): void {
    this.userService.logout();
  }

  onSubmit(data) {
    this.authService.login(data).subscribe(result => {
      if (result.success) {
        this.toastService.success('Credenciales validas');
        this.userService.setUser(result.data);
        this.router.navigate(['/dashboard/users']);
      } else {
        this.toastService.info(result.error.message);
      }
    })
  }

}
