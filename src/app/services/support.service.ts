import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Support} from '../classes/support';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private apiUrl = 'http://localhost:5037/supports';

  constructor(private http: HttpClient) { }

  getAllSupports(): Observable<Support[]> {
    return this.http.get<Support[]>(this.apiUrl);
  }

  getSupportById(id: number): Observable<Support> {
    return this.http.get<Support>(`${this.apiUrl}/${id}`);
  }
}
