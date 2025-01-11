<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { ArrowRight } from "lucide-vue-next";
import { getCountryOptions } from "../api";
import { watch, ref, watchEffect } from "vue";
import { useRegionStore } from "../regionStore";

const regionStore = useRegionStore();
const searchStore = useRegionStore();

const { data: allCountries, isLoading: load } = useQuery(getCountryOptions());

const filteredCountries = ref<any>(["all"]);

watchEffect(() => {
  if (!allCountries.value?.data) {
    filteredCountries.value = [];
    return;
  }

  filteredCountries.value = searchStore.searchCountry
    ? allCountries.value.data.filter((country: { name: { common: string } }) =>
        country.name.common
          .toLowerCase()
          .includes(searchStore.searchCountry.toLowerCase())
      )
    : allCountries.value.data;
});

watch(
  [
    () => regionStore.selectedRegion,
    () => allCountries.value,
  ],
  ([newRegion, countries]) => {
    if (!countries) return;

    filteredCountries.value = newRegion
      ? countries.data.filter(
          (country: { region: string }) => country.region === newRegion
        )
      : countries.data;
  },
  { immediate: true }
);
</script>

<template>
  <div v-if="load" class="flex justify-center items-center h-screen">
    <div
      class="w-16 h-16 border-4 border-t-green-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"
    ></div>
  </div>

  <div v-else class="grid grid-cols-4 mt-10 gap-10 px-6 w-full max-md:grid-cols-2 max-sm:grid-cols-1">
    <div
      v-for="(country, i) in filteredCountries"
      :key="i"
      class="h-300px w-300px rounded-lg shadow-lg shadow-slate-400/50 bg-slate-300 bg-opacity-50 px-6 w-full"
    >
      <div>
        <img
          :src="country.flags.png"
          class="w-[300px] h-[200px] rounded-xl object-cover pt-4 shadow-lg shadow-slate-500/50"
        />
        <div>
          <h1 class="text-xl font-bold py-2">{{ country.name.common }}</h1>
          <p class="py-2">
            Population:
            <span class="font-bold">{{
              country.population.toLocaleString()
            }}</span>
          </p>
          <p v-if="country.capital && country.capital.length > 0">
            Capital: <span class="font-bold">{{ country.capital[0] }}</span>
          </p>
        </div>
      </div>

      <div class="flex items-center justify-end pb-2 w-100px">
        <button
          @click="
            $router.push(
              `/ShowCountry/${encodeURIComponent(country.name.common)}`
            )
          "
          class="text-lg font-bold flex items-center hover:text-green-600 cursor-pointer"
        >
          More
          <ArrowRight class="ml-2" />
        </button>
      </div>
    </div>
  </div>
</template>
