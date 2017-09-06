import { Validateable, PropertyValidations } from 'vadacl'

export class Patient implements Validateable {
  firstName: string = null;
  lastName: string = null;
  username: string = null;
  emailAddress: string = null;
  age: number = null;
  numberOfVisits: number = null;
  agreement: boolean = false;
  workingPercentage: number = null;
  playingPercentage: number = null;
  sleepingPercentage: number = null;

  validations: {
      firstName: PropertyValidations,
      lastName: PropertyValidations,
      username: PropertyValidations,
      emailAddress: PropertyValidations,
      age: PropertyValidations,
      numberOfVisits: PropertyValidations,
      agreement: PropertyValidations
  } = {
    /*
     Since no "message" property is set, both the minLength and required validation methods will utilize the
     default error message provided by the Messages import in the ValidationMethods class file (unless
     overridden at the component level).
     */
    firstName: {
      minLength: { minLength: 2 },
      required: { } //Since the "message" property is always optional, this is an empty object literal.
    },
    lastName: {
      minLength: { minLength: 2 },  //Again, the default validation error message will be used.
      required: { message: 'Your last name is required.' }
    },
    username: {
      withinLength: { minLength: 8, maxLength: 12, message: 'Must be 8-12 characters long.' }
    },
    emailAddress: {
      email: { message: "Please provide a valid email address." }
    },
    age: {
      min: { min: 18, message: "All patients must be at least 18 years of age."}
    },
    numberOfVisits: {
      max: { max: 9, message: "Patient is allotted a maximum of 10 visits." }
    },
    agreement: {
      requiredTrue: { message: 'You must agree to allow us to use the information you provide for research purposes.'}
    }
  };

  constructor( userData?: any ) {
    /*
     A convenient way to set the properties on a domain class, as long as the properties are set with some sort
     of initial value.
     */
    if( userData ) {
      let props = Object.keys( this );
      for( let p in props ) {
        if( userData[ props[p] ] ) {
          this[ props[p] ] = userData[ props[p] ];
        }
      }
    }
  }
}

