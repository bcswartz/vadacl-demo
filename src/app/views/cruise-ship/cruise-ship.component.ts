import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CruiseShip } from "../../domain/cruise-ship";
import { Vadacl } from "vadacl";

@Component({
  selector: 'views-cruise-ship',
  templateUrl: 'cruise-ship.component.html'
})

export class CruiseShipComponent extends Vadacl implements OnInit {
  pageReady: boolean = false;
  formSubmitted: boolean = false;
  shipForm: FormGroup;
  cruiseShip: CruiseShip; //The CruiseShip class extends the DomainClass class

  constructor() {
    super();
  }

  ngOnInit() {
    this.cruiseShip = new CruiseShip();

    //Pre-populate cruise line value
    this.cruiseShip.cruiseLine = 'Travellers of the Seas';

    this.shipForm = this.generateForm( this.cruiseShip );
    /*
     generateForm takes a "mods" object literal as a second argument that processes the following properties:

     exclude: an array of object properties you don't want to create FormControls for
     only: an array of the only object properties you want to create FormControls for (overrides exclude)
     rename: an object literal for remapping a property name (key) to a different FormControl name (value)
     validations: an object literal of additional validations to apply to particular object properties

     Example:

     this.shipForm = this.generateForm( this.cruiseShip, {
        rename: { cruiseLine: 'company' },
        validations: {
          name: { maxLength: { maxLength: 100, message: "Ship name cannot be longer than 100 characters" } }
        }
      });

    */
    this.pageReady = true;

  }

  resetForm() {
    this.shipForm.reset();
    this.formSubmitted = false;
  }

  submitForm() {
    this.formSubmitted = true;
  }

}
