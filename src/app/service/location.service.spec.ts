import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const mapsAPILoader = jasmine.createSpyObj('MapsAPILoader', ['load']);
    const executer: any = {
      resolve: () => {},
      reject: () => {},
      then: () => {
        return;
      },
    };
    mapsAPILoader.load = () => {
      return new Promise(executer);
    };
    service = new LocationService(<any>httpClientSpy, mapsAPILoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
