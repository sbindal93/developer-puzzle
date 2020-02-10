import { Action } from '@ngrx/store';
import { PriceQueryResponse } from './price-query.type';

export enum PriceQueryActionTypes {
  FetchPriceQuery = 'priceQuery.fetch',
  PriceQueryFetched = 'priceQuery.fetched',
  PriceQueryFetchError = 'priceQuery.error'
}

export class FetchPriceQuery implements Action {
  readonly type = PriceQueryActionTypes.FetchPriceQuery;
  constructor(public symbol: string, public period: string) {}
}

export class PriceQueryFetchError implements Action {
  readonly type = PriceQueryActionTypes.PriceQueryFetchError;
  constructor(public error: any) {}
}

export class PriceQueryFetched implements Action {
  readonly type = PriceQueryActionTypes.PriceQueryFetched;
  constructor(public queryResults: PriceQueryResponse[]) {}
}

export type PriceQueryAction =
  | FetchPriceQuery
  | PriceQueryFetched
  | PriceQueryFetchError;


export const fromPriceQueryActions = {
  FetchPriceQuery,
  PriceQueryFetched,
  PriceQueryFetchError
};
