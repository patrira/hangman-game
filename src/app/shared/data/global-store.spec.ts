import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GlobalStore } from './global-store'; // Adjust the import path
import { Categories } from '../models/category.model';
import { of } from 'rxjs';

describe('GlobalStore', () => {
  let store: InstanceType<typeof GlobalStore>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GlobalStore]
    });

    store = TestBed.inject(GlobalStore);
    httpMock = TestBed.inject(HttpTestingController);

    
    jest.spyOn(store, 'loadCategories').mockImplementation();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load categories on init', () => {
    const mockCategories: Categories = { category1: [{ name: 'option1', selected: false }] };

    
    
    
    store.loadCategories();
    const req = httpMock.expectOne('data/data.json');
    expect(req.request.method).toBe('GET');
    req.flush({ categories: mockCategories });

    expect(store.categories()).toEqual(mockCategories);
  });

  
});
