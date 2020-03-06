import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { IProfile } from '../model/interfaces';
import { catchError } from 'rxjs/operators';
import { Errors } from '../model/contants';

const MOCK_CPF = "xxxxxxxxxxx";

describe('ProfileService', () => {
  let service: ProfileService;
  let savedProfile: IProfile;
  let profile = {
    firstName: 'Robson',
    lastName: 'William da Silva Matos',
    cpf: 'xxxxxxxxx00',
    profilePictureUri: 'https://avatars3.githubusercontent.com/u/36487035?s=460&v=4',
    address: {
      city: 'Fortaleza',
      state: 'Ceará',
      street: 'Praia do Coco'
    }
  } as IProfile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
    service.save({ ...profile, cpf: MOCK_CPF }).subscribe(savedProfile => savedProfile = savedProfile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save a profile', () => {
    service.save(profile)
      .subscribe(savedProfile => {
        expect(savedProfile).not.toBeNull();
        expect(savedProfile.id).toEqual(2);
      });
  });

  it('should throw a error if cpf is already saved', () => {
    service.save({...profile, cpf: MOCK_CPF})
      .subscribe(
        _savedProfile => fail(),
        error => expect(error).toEqual(Errors.CPF_IN_USE)
      );
  })

  it('should return a profile by cpf', () => {
    service.findByCpf(MOCK_CPF)
      .subscribe(savedProfile => {
        expect(savedProfile).not.toBeNull();
        expect(savedProfile.id).toEqual(savedProfile.id);
      })
  })
});
