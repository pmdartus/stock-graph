import url from 'url';
import fetch from 'isomorphic-fetch';

const API_ENDPOINTS = {
  LOOKUP: url.parse('http://dev.markitondemand.com/Api/v2/Lookup/json'),
  QUOTE: url.parse('http://dev.markitondemand.com/Api/v2/Quote/json'),
}

function lowerCamelCaseKeys(obj) {
  const ret = {};
  for (let key in obj) {
    const [first, ...rest] = key;
    const newKey = [first.toLowerCase(), ...rest].join('');

    ret[newKey] = obj[key];
  }

  return ret;
}

async function fetchAndParse(urlToFetch) {
  const response = await fetch(urlToFetch);
  if (response.status !== 200)
    throw new Error(`Invalid server response`);

  const json = await response.json();
  return json;
}

export async function getCompaniesInformations(input) {
  const parameterizedUrl = Object.assign(API_ENDPOINTS.LOOKUP, {
    query: { input }
  });

  const companies = await fetchAndParse(url.format(parameterizedUrl));
  return companies.map(lowerCamelCaseKeys);
}

export async function getCompanyStock(symbol) {
  const parameterizedUrl = Object.assign(API_ENDPOINTS.QUOTE, {
    query: { symbol }
  });

  const stockInfo = await fetchAndParse(url.format(parameterizedUrl));
  return lowerCamelCaseKeys(stockInfo);
}
