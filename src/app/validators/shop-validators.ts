import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {

    //validacion de espacios en blanco
    static notOnlyWhitespace(control: FormControl) : ValidationErrors {

        //verificar si el string contiene unicamente espacios en blanco
        if ((control.value != null) && (control.value.trim().length === 0)) {
            
            //invalido, retornar error
            return { 'notOnlyWhitespace':  true };
        } 
        else {
            //valido, retornara null
            return null!;
        }

        
    }
}
