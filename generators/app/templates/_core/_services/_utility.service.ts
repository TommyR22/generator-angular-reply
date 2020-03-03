import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export enum brands {
  acura = 'acura',
  audi = 'audi',
  bmw = 'bmw',
  buick = 'buick',
  cadillac = 'cadillac',
  chevrolet = 'chevrolet',
  citroen = 'citroen',
  ducati = 'ducati',
  ferrari = 'ferrari',
  fiat = 'fiat',
  ford = 'ford',
  harley_davidson = 'harley-Davidson',
  holden = 'holden',
  honda = 'honda',
  husqvarna = 'husqvarna',
  hyunday = 'hyunday',
  infiniti = 'infiniti',
  jeep = 'jeep',
  kawasaki = 'kawasaki',
  kia = 'kia',
  ktm = 'ktm',
  kymco = 'kymco',
  lexus = 'lexus',
  mazda = 'mazda',
  mercedes_benz = 'mercedes-Benz',
  mercury = 'mercury',
  mini = 'mini',
  mitsubishi = 'mitsubishi',
  nissan = 'nissan',
  opel = 'opel',
  peugeot = 'peugeot',
  piaggio = 'piaggio',
  pontiac = 'pontiac',
  porsche = 'porsche',
  renault = 'renault',
  smart = 'smart',
  subaru = 'subaru',
  suzuki = 'suzuki',
  sym_moto = 'sym Motor'
}


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  Brands: typeof brands = brands;

  private titleHeaderChangeSource = new Subject<string>();
  public titleHeaderChange$ = this.titleHeaderChangeSource.asObservable();

  constructor() {
  }

  /**
   * change title header on demand
   * @param {string} title
   */
  onChangeTitleHeader(title: string) {
    this.titleHeaderChangeSource.next(title);
  }

}
