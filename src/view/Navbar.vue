<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { useRegionStore } from "../regionStore";
 

const regionStore = useRegionStore();
const searchStore = useRegionStore();

</script>

<template>
  <div
    class="flex items-center justify-between max-md:flex-col px-10 py-5 shadow-lg shadow-slate-400/50 bg-slate-300"
  >
    <h1 class="text-4xl font-bold text-gray-800 max-md:mb-4">Countries</h1>
    <div class="flex max-sm:flex-col">
      <div class="flex border-2 py-1 px-1 bg-white rounded-lg mr-10">
        <Search class="mr-4 text-slate-500" />
        <input
        v-model="searchStore.searchCountry"
          type="text"
          class="border-none focus:outline-none"
          placeholder="Search"
        />
      </div>

      <select
        v-model="regionStore.selectedRegion"
        class="rounded-lg px-2 outline-none max-sm:mt-4 max-sm:w-[100px] max-sm:px-4 max-sm:py-2"
      >
        <option value="">All</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  </div>
</template>
