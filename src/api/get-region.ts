import { queryOptions } from "@tanstack/vue-query";
import axios from "axios";
import { computed, type Ref } from "vue";

interface RegionDTO {
  region: string;
}


function getRegions(region: Ref<RegionDTO>) {
  return axios.get(`https://restcountries.com/v3.1/region/${region}`);
}

export function getRegionOptions(region: Ref<string>) {
  return queryOptions({
    queryFn: ({ queryKey }) =>
      getRegions(queryKey[1] as unknown as Ref<RegionDTO>),
    queryKey: ["region", region],
    enabled: computed(() => region.value !== ""),
  });
}
