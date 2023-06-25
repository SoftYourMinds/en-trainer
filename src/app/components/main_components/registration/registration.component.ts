import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/services/validation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validator } from 'src/app/helpers/validator';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICandidat } from 'src/app/shared/models/user.model';
import { tap } from 'rxjs/operators';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    public validator: Validator;
    public registrationForm: FormGroup; 
    public formTitle: string;
    public hide: boolean;
    public isLogin: boolean = false;

  
    constructor(
      private SnackBar: SnackBarService,
      private ProgressBar: ProgressBarService,
      private authorizationSerice: AuthorizationService,
      private validationDataService: ValidationService,
      private fb: FormBuilder) {
      this.validator = new Validator(this.validationDataService);
      this.formTitle = "Приєднуйся до English Trainer";
      this.hide = true;
    }
  
    ngOnInit(): void {
      this.validator.getValidationData();
      this.registrationForm = this.fb.group({
        name: ['', this.validator.validateUserNameField()],
        surname: ['', this.validator.validateUserNameField()],
        email: ['', this.validator.validateEmailField()],
        password: ['', this.validator.validatePasswordField()]
      });
      this.validator.formGroup = this.registrationForm;
    }
  
    onRegistration(): void {
      if (this.registrationForm.invalid) {
        return;
      }
      const candidat: ICandidat = this.registrationForm.value
      this.ProgressBar.showProgressBar();
      this.registrationForm.disable(); // Disable the form
  
      this.authorizationSerice.registration(candidat).pipe(
        tap(() => {
          this.ProgressBar.hideProgressBar()
          this.SnackBar.openSnackbar("Реєстрація успішна", true);
          this.registrationForm.reset();
          this.registrationForm.enable()
          this.clearErrorStates();
        })
      ).subscribe({
        error: (error) => {
          console.log('registration-component',error)
          this.ProgressBar.hideProgressBar()
          this.SnackBar.openSnackbar(error.error.message, false);
          this.registrationForm.enable(); // Enable the form
          
          // Handle registration error
        }
      });
    }
  
    clearErrorStates(): void {
      Object.keys(this.registrationForm.controls).forEach(controlName => {
        const control = this.registrationForm.get(controlName);
        control?.setErrors(null);
      });
    }
  
    
    public addSpotForMatError(): boolean {
      const controlName = this.registrationForm.get('name');
      const controlSurname = this.registrationForm.get('surname');
      
      if (!controlName || !controlSurname) {
        return false;
      }
  
      if (controlName.hasError('maxLength') ||
        controlSurname.hasError('maxLength')) {
        return true;
      }
  
      if (controlName.hasError('pattern') ||
        controlSurname.hasError('pattern')) {
        return true;
      }
  
      return false;
  
    }

    
}
 

