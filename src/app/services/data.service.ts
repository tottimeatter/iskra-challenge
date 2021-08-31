import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // For demo purposes
  options: AutofillOptions = {
    count: 3,
    data: ['suggestion textbox', 'suggestion textbox javascript', 'suggestion textbox jquery']
  }

  // Get Autofill options from server
  getAutofillOptions(term: string): Observable<string[]>{
    return this.http.get<AutofillOptions>(`http://api.iskra.cat/suggestions?term=${term}`).pipe(
      // Retorna valor hardcoded en cas d'error (demo)
      catchError((error, options) => of(this.options)),
      // Retorna un observable amb la llista data (filtrada segons el terme de cerca per aquesta demo)
      map(options => options.data.map(options => options).filter(option => option.toLowerCase().includes(term.toLowerCase())))
    );
  }
}

interface AutofillOptions {
  count: number;
  data: string[];
}
