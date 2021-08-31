import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import {DataService} from './services/data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  myControl = new FormControl(''); // Form control de la caixa d'input
  filteredOptions: Observable<string[]>; // Llista filtrada d'opcions per mostrar

  constructor(private DataService: DataService){
    this.filteredOptions = this.myControl!.valueChanges.pipe(
      distinctUntilChanged(), // No fa la petició si no hi ha hagut canvi de valor
      debounceTime(500), // Espera 500ms abans de fer una nova petició
      switchMap(term => this.DataService.getAutofillOptions(term)) // Fa la petició al servei
      );
  }


  ngOnInit() {

  }

  /**
   * Mostra un alert amb el valor de la caixa de cerca
   */
  send(){
    alert(this.myControl.value);
  }







}
