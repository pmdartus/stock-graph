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

export function getCompanyInformations(input) {
  const parameterizedUrl = Object.assign(API_ENDPOINTS.LOOKUP, {
    query: { input }
  });

  return fetch(url.format(parameterizedUrl))
    .then(response => {
      if (response.status !== 200)
        throw new Error(`Invalid server response`);

      return response.json();
    })
    .then(response => {
      if (response.Message)
        throw new Error(response.Message);

      return response.map(lowerCamelCaseKeys)
    });
}

export function getCompanyStock(symbol) {
  const parameterizedUrl = Object.assign(API_ENDPOINTS.QUOTE, {
    query: { symbol }
  });

  console.log(url.format(parameterizedUrl))

  return fetch(url.format(parameterizedUrl))
    .then(response => {
      if (response.status !== 200)
        throw new Error(`Invalid server response`);

      return response.json();
    })
    .then(response => {
      if (response.Message)
        throw new Error(response.Message);

      return lowerCamelCaseKeys(response)
    });
}
