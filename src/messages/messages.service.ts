import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatFactEntity } from './entities/cat-fact.entity';

@Injectable()
export class MessagesService {
  constructor(private httpService: HttpService) {}

  getCatFact(): Observable<AxiosResponse<CatFactEntity>> {
    return this.httpService.get('fact');
  }
}
