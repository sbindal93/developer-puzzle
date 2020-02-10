import { PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';
import { PriceQueryFetched } from './price-query.actions';

export function transformPriceQueryResponse(action: PriceQueryFetched): PriceQuery[] {
  return action.queryResults
    .filter(responseItem => {
      let responseDate = new Date(responseItem.date);
      return responseDate >= action.fromDate
        && responseDate <= action.toDate
    })
    .map(
      responseItem =>
        ({
          ...pick(responseItem, [
            'date',
            'open',
            'high',
            'low',
            'close',
            'volume',
            'change',
            'changePercent',
            'label',
            'changeOverTime'
          ]),
          dateNumeric: parse(responseItem.date).getTime()
        } as PriceQuery)
    );
}
