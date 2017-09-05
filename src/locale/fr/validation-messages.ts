
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
      required: "Entrez un nom pour l'entreprise.",
      pattern: "Le nom de l'entreprise ne peut contenir de lettres ou d'espaces."
    },
    city: {
      required: "Entrez la ville dans laquelle l'entreprise est basée.",
      minlength: "Le nom de la ville doit comporter au moins 2 lettres."
    },
    state: {
      required: "Entrez l'état dans lequel l'entreprise est basée.",
      pattern: "L'état devrait être une abréviation en majuscule en 2 lettres."
    },
    zip: {
      required: "Entrez le code postal dans lequel l'entreprise est basée.",
      fullZipCode: "Entrez le code postal complet (5 chiffres, un tiret, puis 4 chiffres)." // Message for custom validation method
    }
  },

  /*
   By extending Company class as a class with a different name, you can create different validation messages for a
   different usage of what is essentially the same class.
   */
  EnterpriseCompany: {
    name: {
      required: "Entrez un nom pour l'entreprise, s'il vous plaît.",
      pattern: "Le nom de l'entreprise ne peut contenir de lettres ou d'espaces."
    },
    city: {
      required: "Entrez la ville dans laquelle l'entreprise est basée, s'il vous plaît.",
      minlength: "Le nom de la ville doit comporter au moins 2 lettres."
    }
    /*
     The state and zip validation messages will fall back to the locale validation message defaults if no
     domain-level or component-level messages are defined.
     */
  }
};

export { ValidationMessages };


