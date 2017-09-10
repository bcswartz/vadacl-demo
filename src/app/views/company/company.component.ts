
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Company } from '../../domain/company';
import { EnterpriseCompany } from '../../domain/enterprise-company';

/*
 Using an override version of vadacl in order to use custom validation methods and messages.
*/
import { Vadacl } from '../../validation/vadacl';

@Component({
  selector: 'views-company',
  templateUrl: 'company.component.html'
})

export class CompanyComponent extends Vadacl implements OnInit {

  pageReady: boolean = false;
  formSubmitted: boolean = false;
  companyForm: FormGroup;
  company: Company;

  constructor() {
    super();
  }

  ngOnInit() {
    this.company = new Company();
    //this.company = new EnterpriseCompany(); // Switch with line above to get different set of messages for what is otherwise the same object

    this.companyForm = new FormGroup({
      'name': new FormControl(
        this.company.name,
        this.applyRules( this.company, 'name')
      ),
      'city': new FormControl(
        this.company.city,
        this.applyRules( this.company, 'city' )
      ),
      'state': new FormControl(
        this.company.state,
        this.applyRules( this.company, 'state' )
      ),
      'zip': new FormControl(
        this.company.zip,
        this.applyRules( this.company, 'zip' )
      )
    });

    this.pageReady = true;
  }

  resetForm() {
    this.companyForm.reset();
    this.formSubmitted = false;
  }

  submitForm() {
    this.formSubmitted = true;
  }

}
