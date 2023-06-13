import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ICredentials } from 'src/app/shared/models/user.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isRegister: boolean
  public loginForm: FormGroup; 
  public formTitle: string;
  public hide: boolean;

  constructor(
    private Router: Router,
    private AuthrizationService: AuthorizationService,
    private fb: FormBuilder,
    private ProgressBarService: ProgressBarService,
    private SnackBarService: SnackBarService) {
    this.formTitle = "Практикуй, а не просто вчись";
    this.hide = true;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    if (!this.loginForm.valid) return
    
    const credentials: ICredentials = this.loginForm.value;
    this.ProgressBarService.showProgressBar()
    this.loginForm.disable;
    
    this.AuthrizationService.login(credentials).subscribe({
      next: () => {
        this.SnackBarService.openSnackbar("Вхід успішний!", false)
        this.ProgressBarService.hideProgressBar()  
        this.Router.navigate(['/home'])
        
      },
      error: (error) => {
         this.SnackBarService.openSnackbar(error.error.message, true);
         this.loginForm.enable;
         this.ProgressBarService.hideProgressBar()
      }
    })
    
  }
 
}