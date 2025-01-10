// stores/regionStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRegionStore = defineStore("region", () => {
  const selectedRegion = ref<string>("");  
  const searchCountry = ref<string>("");
  return { selectedRegion, searchCountry };
});
