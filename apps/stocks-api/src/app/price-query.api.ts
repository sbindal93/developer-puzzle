import * as Wreck from '@hapi/wreck';
import { environment } from '../environments/environment';

export const fetchQuote = async (symbol, period) => {
  let url = `${environment.apiURL}/beta/stock/${symbol}/chart/${period}?token=${environment.apiKey}`;
  let { res, payload } = await Wreck.get(url, { json: true });
  return payload;
};

