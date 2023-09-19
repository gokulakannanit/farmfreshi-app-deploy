import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage = window.localStorage || this;
  private data: any[];
  constructor() {
    this.clearAll();
  }

  clearAll() {
    this.storage.removeItem('cities');
  }

  set(name: string, value: string) {
    this.storage.setItem(name, JSON.stringify(value));
  }

  get(name: string) {
    const value = JSON.parse(this.storage.getItem(name));
    if (!value || value === undefined) {
      this.storage.removeItem(name);
      return null;
    }
    return value;
  }

  removeItem(name: string) {
    this.data[name] = null;
  }

  setItem(name: string, value: any) {
    this.data[name] = value;
  }

  getItem(name) {
    return this.data[name];
  }
}
