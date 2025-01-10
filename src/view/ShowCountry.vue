<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { ShowCountryOptions } from "../api";
import { ArrowLeft } from "lucide-vue-next";
import { useRouter } from "vue-router";



const route = useRoute(`/ShowCountry/:name`);
const name = Array.isArray(route.params.name)
  ? route.params.name[0]
  : route.params.name;

const { data: show, isPending: load } = useQuery(ShowCountryOptions(name));

const router = useRouter();

function goBack() {
  router.back();
}
</script>

<template>
  <div v-if="load" class="flex justify-center items-center h-screen">
    <div
      class="w-16 h-16 border-4 border-t-green-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"
    ></div>
  </div>
  <button
    class="border-2 rounded-lg px-4 flex absolute left-10 mt-20 max-sm:left-2 max-sm:mt-10"
    @click="goBack"
  >
    <ArrowLeft />
    Back
  </button>

  <div class="flex justify-center items-center h-[70vh]">
    <div
      v-for="country in show?.data"
      :key="country"
      class="flex w-full justify-center max-sm:flex-col max-sm:items-center"
    >
      <img :src="country.flags.png" class="w-[500px] h-[300px] object-contain   max-sm:w-[300px]" />
      <div class="ml-10">
        <h2 class="font-bold text-3xl mb-4">{{ country.name.common }}</h2>
        <p>
          <strong>Capital:</strong>
          <span class="ml-2 text-slate-700">{{ country.capital[0] }}</span>
        </p>
        <p>
          <strong>Population:</strong>
          <span class="ml-2 text-slate-700">{{
            country.population.toLocaleString()
          }}</span>
        </p>
        <p>
          <strong>Subregion:</strong>
          <span class="ml-2 text-slate-700">{{ country.subregion }}</span>
        </p>
        <p>
          <strong>Region:</strong>
          <span class="ml-2 text-slate-700">{{ country.region }}</span>
        </p>
        <p>
          <strong>Languages:</strong
          ><span class="ml-2 text-slate-700">
            {{ Object.values(country.languages).join(", ") }}</span
          >
        </p>
        <p>
          <strong>Currency:</strong>
          <span class="ml-2 text-slate-700">{{
            Object.values(country.currencies)
              .map((currency: any) => currency.name)
              .join(", ")
          }}</span>
        </p>
        <p>
          <strong>Borders:</strong
          ><span class="ml-2 text-slate-700">{{
            country.borders && Object.values(country.borders).join(", ")
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
