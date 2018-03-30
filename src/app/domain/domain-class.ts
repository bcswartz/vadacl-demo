import { Validateable } from "../validation/vadacl";

export class DomainClass implements Validateable {

  validations: {};

  constructor( objectData?: any ) {
    if( objectData ) {
      let props = Object.keys( this );
      for( let p in props ) {
        if( objectData[ props[p] ] ) {
          this[ props[p] ] = objectData[ props[p] ];
        }
      }
    }
  }

}
