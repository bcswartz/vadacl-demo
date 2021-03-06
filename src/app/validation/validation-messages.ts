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
    fullzipcode: 'The zip code is invalid', // Default message for our custom fullZipCode validator

  /* DOMAIN CLASS VALIDATION MESSAGES */
  Company: {
    name: {
      required: 'Please enter a name for the company.',
      pattern: 'The company name cannot contain numbers or spaces.'
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
      fullzipcode: 'Please enter the full zip code (5 digits, a dash, then 4 digits).' // Message for custom validation method
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
    /*
     The state and zip validation messages will fall back to the locale validation message defaults if no
     domain-level or component-level messages are defined.
     */
  }
};

export { ValidationMessages };

