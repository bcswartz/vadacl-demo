import { Company } from './company';

/*
 Extends the Company class simply to allow for enterprise-specific validation errors to be defined in the global
 validation messages in validation/validation-messages.ts.
 */
export class EnterpriseCompany extends Company {
  constructor() {
    super();
  }
}
