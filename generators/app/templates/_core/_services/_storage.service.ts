import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private dbName = 'storageDB';
  private storageDB;
  private subject = new Subject<any>();
  private subject2 = new Subject<any>();


  constructor() {
    if (!window.indexedDB) {
      console.log('Your browser doesn\'t support a stable version of IndexedDB. Such and such feature will not be available.');
    } else {
      console.log('Your browser support a stable version of IndexedDB.');
      // this.openIndexedDB();

      // TODO DELETE
      const index = ['data.vehicle.company', 'data.vehicle.name'];
      // this.saveIndexedDB('garageDB', 'ER299ED', {vehicle: {brand: 'audi', model: 'a3', vin: 'abcd12345tredf3434', insurance: {name: 'allianz', expireDate: 123456}, tax: {expireDate: 11234}}}, index);
      // this.saveIndexedDB('garageDB', '67890', {vehicle: {brand: 'porsche', model: '911', vin: 'abcd12345tredf3434', insurance: {name: 'genertel', expireDate: 123456}}}, index);
      // this.saveIndexedDB('garageDB', '12342', {vehicle: {brand: 'fiat', model: '500', vin: 'abcd12345tredf3434', insurance: {name: 'genertel', expireDate: 123456}}});
      // this.findIndexedDB('garageDB', ['audi', 'a3']);
      // this.loadIndexedDB('garageDB', 'ER299ED');

      //this.saveIndexedDB('profileDB', 'Tommaso Ruscica', {drivingLicense: {number: 'AE12345434', expireDate: 12123223}, settings: {notifications: true}});


    }
  }

  // -------------------------------
  // INDEXEDDB
  // -------------------------------
  openIndexedDB(dbName, index?) {
    const indexedDB = window.indexedDB;
    const openDB = indexedDB.open(this.dbName, 1);
    openDB.onupgradeneeded = (event: any) => {
      this.storageDB = event.target.result;
      let key;
      if (dbName === 'playersDB') {
        key = 'number';
      } else if (dbName === 'matchesDB') {
        key = 'date';
      }
      if (index) {
        this.storageDB.createObjectStore('playersDB', {keyPath: key}).createIndex('nameIndex', index);
      } else {
        this.storageDB.createObjectStore('playersDB', {keyPath: key});
      }
      this.storageDB.createObjectStore('matchesDB', {keyPath: 'date'});
    };
    return openDB;
  }

  saveIndexedDB(dbName, key, filedata, index?) {
    const openDB = this.openIndexedDB(dbName, index);
    openDB.onsuccess = () => {
      if (dbName === 'playersDB') {
        openDB.result.transaction(dbName, 'readwrite').objectStore(dbName).put({number: key, data: filedata});
      } else if (dbName === 'matchesDB') {
        openDB.result.transaction(dbName, 'readwrite').objectStore(dbName).put({date: key, data: filedata});
      }
    };
    this.subject2.next();
    return this.subject2.asObservable();
  }

  findIndexedDB(dbName, filesearch) {
    return this.loadIndexedDB(dbName, null, filesearch);
  }

  loadIndexedDB(dbName, key: string, filesearch?) {
    const openDB = this.openIndexedDB(dbName);
    openDB.onsuccess = () => {
      let getData;
      if (key) {
        getData = openDB.result.transaction(dbName, 'readwrite').objectStore(dbName).get(key);
      } else {
        getData = openDB.result.transaction(dbName, 'readwrite').objectStore(dbName).index('nameIndex').get(filesearch);
      }

      getData.onsuccess = () => {
        console.log(getData.result.data);
      };

      openDB.result.transaction(dbName, 'readwrite').oncomplete = () => {
        openDB.result.close();
      };
    };
    return true;
  }

  getAllData(dbName): Observable<any> {
    const openDB = this.openIndexedDB(dbName);
    openDB.onsuccess = () => {
      const getData = openDB.result.transaction(dbName, 'readwrite').objectStore(dbName).getAll();
      getData.onsuccess = () => {
        this.subject.next({ data: getData.result });
        return this.subject.asObservable();
      };
      openDB.result.transaction(dbName, 'readwrite').oncomplete = () => {
        openDB.result.close();
      };
    };
    this.subject.next();
    return this.subject.asObservable();
  }


  // -------------------------------
  // SESSION & LOCAL STORAGE
  // -------------------------------


  setToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  deleteFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  setToSessionStorage(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getFromSessionStorage(key: string) {
    return sessionStorage.getItem(key);
  }

  deleteFromSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }
}
