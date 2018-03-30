# vadacl Demo

vadacl ("validation at domain and component levels") is an [npm-packaged TypeScript library](https://www.npmjs.com/package/vadacl) for Angular 4.x/5.x that enhances the 
reactive form validation features provided in Angular.  It provides a means by which developers can set domain/database-based 
validation rules on data objects but then augment or override those validations as needed within different components.
It also provides a number of helper functions for managing validation error data, and provides the option to define validation
messages in a single file that can then be swapped out for different application builds.

This repository contains an Angular CLI-powered Angular application composed of examples of using vadacl for form validation, examples
that demonstrate the flexibility of the library.

## Installation

To install and execute the demo, perform the following steps:

1. Download and install [Angular CLI](https://github.com/angular/angular-cli).
2. Download or checkout this repo.
3. Open a terminal window, navigate to the main project folder, then invoke "npm install".
4. Invoke "ng serve" to start the application, then open your browser to the URL specified in the terminal output.

## Explanation By Example

Imagine your Angular application serves two types of users:  customers and admin users.  Both types of users can edit
their own user profile, which your application retrieves from the corresponding UserProfile record in your database.
The UserProfile table contains the following columns:

* firstName (not nullable, maxlength 25 characters)
* lastName (not nullable, maxlength 25 characters)
* username (not nullable, maxlength 30 characters)
* age (nullable, integer)
* gender (nullable, single character: M or F)

Your application needs to apply the following (somewhat arbitrary) business rules regarding user profile data:

* Customers are required to provide values for the demographics fields (age, gender); admin users are not.
* Customer usernames must be at least 8 characters long; admin usernames can be as short as 3 characters.
* Customer and admins have separate components/forms for editing their user profile data.
* Validation errors should be display beneath the form inputs, and should be context-appropriate.

This is how you could implement validation with vadacl that addresses all of these validation and business rules:

Create a domain class with properties that will hold the data from the UserProfile database record retrieved by your application:

```javascript
export class UserProfile {
    firstName: string = null;
    lastName: string = null;
    username: string = null;
    age: number = null;
    gender: string = null;
}    
```

Now refactor the class to implement vadacl's Validatable interface, and add a "validations" property with validation settings
that adhere to the PropertyValidations interface provided by vadacl.  Now your UserProfile domain class looks like this:

```javascript
import { Validatable, PropertyValidations } from 'vadacl'

export class UserProfile implements Validatable {
    firstName: string = null;
    lastName: string = null;
    username: string = null;
    age: number = null;
    gender: string = null;

    validations: { [ index: string ] : PropertyValidations } = {
        firstName: {
            maxLength: { maxLength: 25, message: 'Your first name cannot be longer than 25 characters.'},
            required: { message: 'Your first name is required.' }
        },
        lastName: {
            maxLength: { maxLength: 25, message: 'Your last name cannot be longer than 25 characters.'},
            required: { message: 'Your last name is required.' }
        },
        username: {
            maxLength: { maxLength: 30, message: 'Your username cannot be longer than 25 characters.'},
            required: { message: 'You must have a username.' }
        },
        age: {
            pattern: { pattern: '[0-9]*', message: 'Enter your age as an integer.' }
        },
        gender: {
            pattern: { pattern: 'M|F', message: 'Enter your gender as "M" or "F".' }
        }
    };
}    
```

In vadacl parlance, these validations are the "domain validations" referred to in the vadacl acronym.  They can also be
thought of as "persistence" validations:  if you send back UserProfile property values that don't adhere to these validation
rules back to your database to be saved/persisted, the save attempt will fail.  Such validation constraints should be
applied consistently throughout your application.

One quick note before moving on:  applying the interfaces is strictly optional, but doing so will help your IDE and 
TypeScript compiler alert you to any mistakes or omissions you may make in the validation settings.

Now create the CustomerProfileComponent that your customer users will use to edit their profile.  First, code the
component as if it was going to implement the form using Angular's reactive form controls in a standard manner (minus the
use of any Validators):

```javascript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserProfile } from '../../domain/user-profile';

@Component({
    moduleId: module.id,
    selector: 'views-customer-profile',
    templateUrl: 'customer-profile.component.html'
})

export class CustomerProfileComponent implements OnInit {

    pageReady: boolean = false;
    profileForm: FormGroup;
    userProfile: UserProfile;

    constructor() {}

    ngOnInit() {
        this.userProfile = new UserProfile();

        this.profileForm = new FormGroup({
            'firstName': new FormControl( this.userProfile.firstName ),
            'lastName': new FormControl( this.userProfile.lastName ),
            'username': new FormControl( this.userProfile.username ),
            'age': new FormControl( this.userProfile.age ),
            'gender': new FormControl( this.userProfile.gender )
        });

        this.pageReady = true;
    }

}  
```

Now refactor the class to extend the Vadacl class provided by the vadacl package.  Add 
the validation settings needed to implement the user profile business logic that applies to customer users, and then
configure the validation behavior for the form fields using that customer-specific business logic as needed via vadacl's
applyRules() method:

```javascript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserProfile } from '../../domain/user-profile';
import { Vadacl } from 'vadacl';

@Component({
    moduleId: module.id,
    selector: 'views-customer-profile',
    templateUrl: 'customer-profile.component.html'
})

export class CustomerProfileComponent extends Vadacl implements OnInit {

    pageReady: boolean = false;
    profileForm: FormGroup;
    userProfile: UserProfile;

    constructor() {
        super();
    }

    ngOnInit() {
        this.userProfile = new UserProfile();
        
        let componentValidations = {
            username: { 
                minLength: { minLength: 8, message: 'Your username must be at least 8 characters long.' }
            },
            age: {
                required: { message: 'You must provide your age.' }
            },
            gender: {
                required: { message: 'You must provide your gender.' }
            }
        }

        this.profileForm = new FormGroup({
            'firstName': new FormControl(
                this.userProfile.firstName,
                this.applyRules( this.userProfile, 'firstName')
            ),
            'lastName': new FormControl(
                this.userProfile.lastName,
                this.applyRules( this.userProfile, 'lastName' )
            ),
            'username': new FormControl(
                this.userProfile.username,
                this.applyRules( this.userProfile, 'username', componentValidations.username )
            ),
            'age': new FormControl(
                this.userProfile.age,
                this.applyRules( this.userProfile, 'age', componentValidations.age )
            ),
            'gender': new FormControl(
                this.userProfile.gender,
                this.applyRules( this.userProfile, 'gender', componentValidations.gender )
            )
        });

        this.pageReady = true;
    }

}
```

The applyRules() method of the Vadacl class is the heart of vadacl.  It uses the domain object and property name arguments
to obtain the validation rules for that property set in the data object, then adds to or overrides those settings with any
new validation settings provided in the 3rd argument.  It then uses that combination of domain validation settings and
component-level validation settings to produce an array of validator methods that can be returned as the 2nd argument to 
the FormControl constructor.

(The Vadacl class also contains a similar method, the applyCollectionRule() method, that 
performs the same function for applying a single validation method to a FormGroup or FormArray collection of FormControls)

The AdminProfileComponent used to let admin users edit their user profile would be constructed in a similar way, but 
would apply a different set of component-level validation settings:

```javascript
let componentValidations = {
    firstName: {
        required: { message: 'The firstName field is required.'}
    },
    lastName: {
        required: { message: 'The lastName field is required.'}
    },
    username: {
        minLength: { minLength: 3, message: 'The username must be at least 3 characters long.' }
    }
};

this.profileForm = new FormGroup({
    'firstName': new FormControl(
        this.userProfile.firstName,
        this.applyRules( this.userProfile, 'firstName', componentValidations.firstName )
    ),
    'lastName': new FormControl(
        this.userProfile.lastName,
        this.applyRules( this.userProfile, 'lastName', componentValidations.lastName )
    ),
    'username': new FormControl(
        this.userProfile.username,
        this.applyRules( this.userProfile, 'username', componentValidations.username )
    ),
    'age': new FormControl(
        this.userProfile.age,
        this.applyRules( this.userProfile, 'age' )
    ),
    'gender': new FormControl(
        this.userProfile.gender,
        this.applyRules( this.userProfile, 'gender' )
    )
}); 
``` 

If combining domain and component-level validations is vadacl's primary purpose, then management of the validation error
messages is its secondary purpose.  Even though the same domain-level validation rules are applied, the error messages
for those rules can be altered via the component validation settings to fit the context.

vadacl also allows you to configure global validation messages within a ValidationMessages object (provided by the 
validation-messages.ts file).  This object contains two different sets of message configurations:

* Default validation method messages: generic messages returned for the given validation method if you don't provide 
error message text in either the domain-level validation settings, the component-level settings, or locale-based domain
class validations (see next bullet).

* Domain class validation messages: specific messages for a given domain 
class / property / validation error.  Provides an alternative to defining the error messages amongst the validation 
settings in the domain class, allowing you to keep all of the messages in one place and to swap sets of messages at 
build time by targeting a different file.  These messages can still be overridden at both the domain and component levels.

The following ValidationMessages object provides examples of both sets:

```javascript
let ValidationMessages = {

    /* DEFAULT VALIDATOR ERROR MESSAGES */
    required: 'A value is required',
    requiredtrue: 'The value must be true',
    minlength: 'The value is too short',
    maxlength: 'The value is too long',
    min: 'The number is too small',
    max: 'The number is too large',
    email: 'The email is invalid',
    pattern: 'The value does not match the pattern',
    withinlength: 'The value does not meet the size requirements',
    totals: 'The total value does not meet the required total',
    equalvalues: 'The values are not equal',
    withintruecount: 'The number of true values does not meet the requirement',

    /* DOMAIN CLASS VALIDATION MESSAGES */
    Company: {
        name: {
            required: 'Please enter a name for the company.',
            pattern: 'The company name cannot contain letters or spaces.'
        },
        city: {
            required: 'Please enter the city the company is based in.',
            minlength: 'The city name must be at least 2 characters long.'
        },
        state: {
            required: 'Please enter the state the company is based in.',
            pattern: 'The state should be a 2-letter capitalized abbreviation.'
        },
        zip: {
            required: 'Please enter the zip code the company is based in.',
            pattern: 'Please enter the zip as a 5-digit code.'
        }
    },

    /*
     By extending Company class as a class with a different name, you can create different validation messages for a
     different usage of what is essentially the same class.
    */
    EnterpriseCompany: {
        name: {
            required: 'Please enter a name for the enterprise.',
            pattern: 'The enterprise name cannot contain letters or spaces.'
        },
        city: {
            required: 'Please enter the city the enterprise is based in.',
            minlength: 'The enterprise name must be at least 2 characters long.'
        }
        //The state and zip validation messages will fall back to the locale validation message defaults
    }
};
``` 
Note the fact that validation property names are all in lowercase, not camelCase like the method names.  They match the 
key name of the metadata object returned by the validation method when the value is invalid.

The Vadacl class also includes methods that assist with the task of displaying the validation error messages in the 
component template, eliminating the need to conditionally display different DOM elements for different validation errors:

```
<input id="firstName" type="text" class="form-control" formControlName="firstName">
<div *ngIf="pageReady && showErrors( profileForm.controls.firstName )" class="alert alert-danger">
    <ul>
        <li *ngFor="let error of getControlErrors( profileForm.controls.firstName )">
            {{error}}
        </li>
    </ul>
</div>
```

[Click to view admin profile form screenshot](docs/adminProfileErrors.png)

Starting with version 1.1.0, vadacl also provides a generateForm() convenience method for generating a domain class-based
form with a single statement, eliminating the need to declare the FormControl instances by hand.  Refactoring the earlier example:

```javascript
export class CustomerProfileComponent extends Vadacl implements OnInit {

    profileForm: FormGroup;
    userProfile: UserProfile;

    constructor() {
        super();
    }

    ngOnInit() {
      this.userProfile = new UserProfile();
      this.profileForm = this.generateForm( this.userProfile );
    }
```

Component-specific validations can be applied with the generateForm() method by passing in a modification object (which can also be 
used to exclude and rename FormControl instances) as the second method argument.  See the demo example code for details.

#### vadacl Validation Methods

The ValidationMethods class of vadacl includes validation methods that either mimic or wrap the Validator methods 
provided by Angular as of version 4.3.6:

* required
* requiredTrue
* minLength
* maxLength
* min
* max
* pattern
* email (NOTE: unlike the current Angular version, the validator will not flag a null, undefined, or empty value 
as invalid, essentially allowing the email value to be optional)

It also includes the following additional validation methods:

* "withinLength": Validates that the length of the value of the AbstractControl falls within a certain range.  Like
the minLength and maxLength methods, it can be used to validate the length of a string or the number of form controls 
in a FormGroup or FormArray.

* "totals": Validates that the sum of the numeric values of the FormGroup or FormArray controls equals a certain numeric amount.

* "equalValues": Validates that all of the values of the FormControls within a FormGroup or FormArray are exactly equal. 
Useful for performing password confirmation.

* "withinTrueCount": Validates that the number of FormControls within a FormGroup or FormArray with a value of Boolean 
true falls within a given range.  Designed primarily to validate how many checkboxes are checked.

#### Using the ValidationMessages Object to Provide Locale-Based Messages (i18n)

As mentioned earlier in this document, if you needed to deploy different versions of your application for different 
locations and/or languages, the best approach would be to define all of the validation messages within custom copies
of the validation-messages.ts file provided in the package.  Then you can swap in the appropriate set of messages 
during your build process.

This demonstration application provides one example of how you might go about it.  The "Company" demo provides an 
example where the validation messages are set within a custom validation-messages.ts file in the src/app/validation folder.
There are two other copies of the validation-messages.ts file within the src/locale folder, one of which has the
validation messages translated into French.

The package.json file in the application defines a "release" script that will swap out the copy of validation-messages.ts within 
the src/app/validation folder with one of the other copies (based on the "locale" property in the "config" block of the 
package.json file, which is current set to use the French/"fr" version), execute the Angular CLI build command, and then 
restore the src/app/validation version via the "postbuild" script.

So if you execute "npm run release", the contents of the "dist" folder will contain an optimized version of the application
that uses the French validation messages, which you can see if you copy the "dist" folder contents to a virtual website
on your machine.
