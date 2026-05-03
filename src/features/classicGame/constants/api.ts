export const BASE_API_URL = 'https://restcountries.com/v3.1'
export const COUNTRIES_ENDPOINT = '/all'
export const COUNTRIES_FIELDS = 'name,capital,flags,population'

export const COUNTRIES_URL = `${BASE_API_URL}${COUNTRIES_ENDPOINT}?fields=${COUNTRIES_FIELDS}`
