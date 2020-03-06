import { Injectable } from '@angular/core';
import { IProfile } from '../model/interfaces';
import { defaultIfEmpty, mergeMap } from 'rxjs/operators';
import { of, throwError, merge } from 'rxjs';
import { Errors } from '../model/contants';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profiles: IProfile[] = [];

  constructor() {}

  findById = (id: number) => of(this.profiles.find( profile => profile.id === id));

  findByCpf = (cpf: string) => of(this.profiles.find( profile => profile.cpf === cpf));

  findAll = () => of(this.profiles);

  save = (profile: IProfile) => {
    return this.findByCpf(profile.cpf).pipe(mergeMap(savedProfile => {
      if(savedProfile) return throwError(Errors.CPF_IN_USE);
      const nextId = this.profiles.reduce((previewId: number, {id}) => previewId+id,1);
      profile.id = nextId;
      this.profiles.push(profile);
      return of(profile);
    }))
  }
}
