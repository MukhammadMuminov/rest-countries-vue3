import { queryOptions } from "@tanstack/vue-query";
import axios from "axios";

function getCountry() {
    return axios.get('https://restcountries.com/v3.1/all')
}

export function getCountryOptions() {
    return queryOptions({
        queryFn: getCountry,
        queryKey: ['country']
    })
}