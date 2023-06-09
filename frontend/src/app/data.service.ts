import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getHistories(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/getHistories');
  }
  getHistoriesByUser(id: any): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/getHistoriesByUserId/' + id);
  }
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/getEvents');
  }
  getHistory(id: any) {
    return this.http.get('http://localhost:8000/api/getHistory/' + id);
  }
  getEventById(id: any){
    return this.http.get('http://localhost:8000/api/getEventById/' + id);
  }
}