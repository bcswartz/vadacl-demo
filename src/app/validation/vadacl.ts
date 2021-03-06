import { ValidationMethods, Vadacl, Validateable, PropertyValidations as BasePropertyValidations } from 'vadacl'
import { ValidationMessages } from './validation-messages'


// Define new custom validation methods
class CustomValidationMethods extends ValidationMethods {

  /*
   Most custom single-field validations will be specific string patterns (zip code, email, URL, etc.) that can leverage
   the existing pattern validation method.
  */
  static fullZipCode( message ?: string, className ?: string, propertyName ?: string ) {
    /*
      Need to obtain the desired message and provide it to the pattern validation method, otherwise
      the pattern validation message will look for a "pattern" message in the validation messages object
      or the domain class.
     */
    let msg = message || ValidationMethods.getLocaleMessage( 'fullzipcode', className, propertyName );
    return ValidationMethods.pattern( '[0-9]{5}\-[0-9]{4}', msg )
  }
}

// Increment / extend vadacl interfaces to support custom validation methods
interface FullZipCodeSettings {
  message ?: string
}

interface PropertyValidations extends BasePropertyValidations {
  fullZipCode ?: FullZipCodeSettings
}

ValidationMethods.messages = ValidationMessages;
Vadacl.validationMethods = CustomValidationMethods;

export { Vadacl, Validateable, PropertyValidations };
