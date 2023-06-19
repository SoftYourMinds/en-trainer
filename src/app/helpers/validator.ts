import { ValidatorFn, AbstractControl } from "@angular/forms";
import { ValidationService } from "../services/validation.service";
import { FormGroup } from "@angular/forms";
import { IAllowedDomain } from "../services/validation.service";
import { IForbiddenWord } from "../services/validation.service";

export class Validator {
    public forbiddenWordsList: IForbiddenWord[];
    public allwedDomainsList: IAllowedDomain[];
    private _formGroup: FormGroup; 
    private _loadingData = {
        "forbiddenWords": true,
        "allowedDomains": true 
    }


    constructor(private validationData: ValidationService) {
    }

    get loadingData() {
        return this._loadingData
    }

    get formGroup() {
        return this._formGroup;
    }

    set formGroup(newFormGroup: FormGroup) {
        this._formGroup = newFormGroup
    }

    public checkLoadingData(): boolean {
        return Object.values(this.loadingData).includes(true);
    }

    public getValidationData():void {
        this.validationData.getForbiddenWords().subscribe(this.initForbiddenWords.bind(this))
        this.validationData.getAllowedDomains().subscribe(this.initAllowedDoamains.bind(this))
    }
   
    private initForbiddenWords(data: IForbiddenWord[]): void {
        this.forbiddenWordsList = data;
        this._loadingData.forbiddenWords = false;
    }

    private initAllowedDoamains(data: IAllowedDomain[]):void  {
        this.allwedDomainsList = data;
        this._loadingData.allowedDomains = false;
    }

    validateUserNameField(): ValidatorFn {
        return (control: AbstractControl): {[key: string]:any } | null => {
            const value = control.value as string;
    
            if (!value) {
                return { required: true };
            }
            
            if (this.forbiddenWordsList.some(word => word.word === value.toLocaleLowerCase())) {
                return { forbiddenWord: true };
            }
    
            if (value.length < 2) {
                return { minLength: true };
            }
    
            if (value.length > 50) {
                return { maxLength: true };
            }
    
            const pattern = /^[a-zA-Zа-яА-ЯіїєІЇЄ'`-]+$/;
           
            if (!pattern.test(value)) {
                return { pattern: true };
            }
           
            return null
        }
    }
    
    validateEmailField(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const email = control.value as string;
            
            if (!email) {
                return { required: true };
            }
            
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if (!emailRegex.test(email)) {
                return { 'invalidEmail': true };
            }
    
            const emailDomain = email.split('@')[1];
            const isDomainAllowed = this.allwedDomainsList.some(email => email.domain === emailDomain);
         
            if (!isDomainAllowed) {
              return { 'forbiddenDomain': true };
            }
    
            return null
        };
    }
    
    validatePasswordField(): ValidatorFn {
        return (control: AbstractControl): {[key: string]:any } | null => {
            const value = control.value as string;
    
            if (!value) {
                return { required: true };
            }
    
            if (value.length < 8) {
                return { minPaswordLength: true };
            }
    
            const passwordAtLeastOneDigit = /^(?=.*\d).{6,}$/;
           
            if (!passwordAtLeastOneDigit.test(value)) {
                return { passwordAtLeastOneDigit: true };
            }
           
            return null
        }
    }
    
    public getValidationErrorMessage(controlName: string): string {
        const control = this.formGroup.get(controlName);
        if (!control) {
          return '';
        }
      
        const errorMessages = [
          { error: 'required', message: 'Поле обовя’зкове' },
          { error: 'invalidEmail', message: 'Не правильний email' },
          { error: 'forbiddenWord', message: 'Містить заборонені слова' },
          { error: 'minLength', message: 'Містить менше 2 символів' },
          { error: 'maxLength', message: 'Містить більше 50 символів' },
          { error: 'pattern', message: 'Містить не коректні символи' },
          { error: 'minPaswordLength', message: 'Містить менше 8 символів' },
          { error: 'passwordAtLeastOneDigit', message: 'Повинен містити хоча б 1 число' },
          { error: 'forbiddenDomain', message: 'Містить заборонений домен' },
    
        ];
      
        for (const errorMessage of errorMessages) {
          if (control.hasError(errorMessage.error)) {
            return errorMessage.message;
          }
        }
        
        return '';
      }
}