<template>
  <Card class="rounded-lg overflow-x-hidden w-full">
    <div class="flex items-center justify-between gap-8 p-4">
      <router-link :to="{ name: 'Contacts' }" class="flex items-center">
        <Icon icon="go-back"></Icon><Button>Voltar</Button>
      </router-link>
    </div>
    <div class="flex flex-col gap-12 md:gap-4 p-9">
      <div id="by-state" class="w-full md:w-1/2 min-h-[380px]">
        <p class="subtitle2 mb-8">Segmentação por estado</p>
        <PieSkeleton v-if="loadingStates" :display="loadingStates" />
        <div v-if="stateLabels.length">
          <PieChart :labels="stateLabels" :series="stateSeries" />
        </div>
        <div v-else>
          <NoContact @created="getReports" />
        </div>
      </div>
      <div id="by-city" class="w-full md:w-1/2 min-h-[380px]">
        <p class="subtitle2 mb-8">Segmentação por cidade</p>
        <PieSkeleton v-if="loadingCities" :display="loadingCities" />
        <div v-if="cityLabels.length">
          <PieChart :labels="cityLabels" :series="citySeries" />
        </div>
        <div v-else>
          <NoContact @created="getReports" />
        </div>
      </div>
    </div>


  </Card>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import PieSkeleton from "@/components/ui/charts/PieSkeleton.vue";
import PieChart from "@/components/ui/charts/PieChart.vue";
import client from '@/services/http';
import NoContact from '@/components/contacts/NoContact.vue';

const route = useRoute();

const stateSeries = ref<number[]>([]);
const stateLabels = ref<string[]>([]);
const citySeries = ref<number[]>([]);
const cityLabels = ref<string[]>([]);

const loadingStates = ref(false);
const loadingCities = ref(false);

const getPercentage = (value: number, total: number): number => {
  return Math.round((value / total) * 100, 2);
};

const getStateReport = async () => {
  try {
    loadingStates.value = true;
    const response = await client.get('reports/grouped-by-state');

    const total = response.data.reduce((acc: number, item: any) => acc + item.count, 0);

    stateSeries.value = response.data.map((item: any) => getPercentage(item.count, total));
    stateLabels.value = response.data.map((item: any) => item.state);
  } catch (error) {
    console.error('Error fetching state report:', error);
  } finally {
    loadingStates.value = false;
  }
};

const getCityReport = async () => {
  try {
    loadingCities.value = true;
    const response = await client.get('reports/grouped-by-city');

    const total = response.data.reduce((acc: number, item: any) => acc + item.count, 0);

    citySeries.value = response.data.map((item: any) => getPercentage(item.count, total));
    cityLabels.value = response.data.map((item: any) => `${item.city} - ${item.state}`);
  } catch (error) {
    console.error('Error fetching city report:', error);
  } finally {
    loadingCities.value = false;
  }
};

const getReports = () => {
  getStateReport();
  getCityReport();
}

onMounted(() => {
  getReports();
});
</script>
