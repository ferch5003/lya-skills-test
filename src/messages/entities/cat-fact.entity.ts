export class CatFactEntity {

  fact: string;

  length: number;

  constructor(partial: Partial<CatFactEntity>) {
    Object.assign(this, partial);
  }
}
