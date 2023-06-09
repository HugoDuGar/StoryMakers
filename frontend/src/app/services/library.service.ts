import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  saveHistories: string[] = [];

  constructor() { }

  addHistory(historia: any): void {
    this.saveHistories.push(historia);
  }

  getHistories(): string[] {
    return this.saveHistories;
  }
}
