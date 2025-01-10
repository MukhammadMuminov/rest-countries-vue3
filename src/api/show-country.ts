import { queryOptions } from "@tanstack/vue-query";
import axios from "axios";

function ShowCountry(name: string) {
  return axios.get(`https://restcountries.com/v3.1/name/${name}`);
}

export function ShowCountryOptions(name: string) {
  return queryOptions({
    queryFn: ({ queryKey }) => ShowCountry(queryKey[1] as string),
    queryKey: ["country", name],
  });
}
