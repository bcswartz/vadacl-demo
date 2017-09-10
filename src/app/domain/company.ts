/*
 Since we are using a custom validation method with matching custom interface declarations, we will pull in
 the interfaces from the customized implementation of vadacl.
*/
import { Validateable, PropertyValidations } from '../validation/vadacl'

export class Company implements Validateable {
  name: string = null;
  city: string = null;
  state: string = null;
  zip: string = null;

  /*
   The messages for the validations below are configured in the custom copy of validation-messages.ts in the
   validation folder.
   */
  validations: {
    name: PropertyValidations,
    city: PropertyValidations,
    state: PropertyValidations,
    zip: PropertyValidations
  } = {
    name: {
      required: {},
      pattern: { pattern: '[a-zA-Z]+' }
    },
    city: {
      required: {},
      minLength: { minLength: 2 }
    },
    state: {
      required: { message: 'You must enter a state.' }, //Domain-level messages override the locale message
      pattern: { pattern: '[A-Z]{2}'}
    },
    zip: {
      required: {},
      fullZipCode: {}
    }
  };

  /*
   A convenient way to set the properties on a domain class, as long as the properties are set with some sort
   of initial value.
   */
  constructor( companyData?: any ) {
    if( companyData ) {
      let props = Object.keys( this );
      for( let p in props ) {
        if( companyData[ props[p] ] ) {
          this[ props[p] ] = companyData[ props[p] ];
        }
      }
    }
  }
}

