import { DomainClass } from "./domain-class";
import { PropertyValidations } from "vadacl";

export class CruiseShip extends DomainClass {
  name: string = null;
  cruiseLine: string = null;
  yearBuilt: number = null;
  deckCount: number = null;
  tonnage: number = null;
  isActive: boolean = true;
  comments: string = null;

  validations: { [ index: string ] : PropertyValidations } = {
    name: {
      required: { message: "Ship name is required." },
      minLength: { minLength: 3, message: "Ship name must be at least 3 characters long." }
    },
    cruiseLine: {
      required: { message: "Cruise line is required." }
    },
    yearBuilt: {
      required: { message: "Year built is required." },
      pattern: { pattern: "[12]{1}[0-9]{3}", message: "Year must be in YYYY format, and between 1900 and 2999." }
    },
    deckCount: {
      pattern: { pattern: "[0-9]{1,2}", message: "Deck count must be a one or two-digit number." }
    },
    tonnage: {
      pattern: { pattern: "[0-9]*", message: "Tonnage must be greater than or equal to 100." },
      min: { min: 100, message: "Tonnage must be greater than or equal to 100." }
    }
  };

  constructor() {
    super();
  }

}
