<template>
  <div class="mx-auto flex flex-col items-center min-h-screen overflow-x-hidden">
    <Container class="w-full">
      <header class="py-4 w-full flex items-center">
        <h2>{{ route.meta.title }}</h2>
      </header>
      <Card class="rounded-lg overflow-x-hidden w-full">
        <div class="flex items-center justify-between gap-8 p-4">
          <router-link :to="{ name: 'Contacts' }" class="flex items-center">
            <Icon icon="go-back"></Icon><Button>Voltar</Button>
          </router-link>
        </div>
        <div class="flex flex-col gap-12 md:gap-4 p-9">
          <div id="by-state" class="w-full md:w-1/2 min-h-[380px]">
            <p class="subtitle2 mb-8">Segmentação por estado</p>
             <PieSkeleton v-if="!stateSeries.length" :display="!stateSeries.length" />
            <PieChart v-else :labels="stateLabels" :series="stateSeries" />
          </div>
          <div id="by-city" class="w-full md:w-1/2 min-h-[380px]">
            <p class="subtitle2 mb-8">Segmentação por cidade</p>
            <PieSkeleton v-if="!citySeries.length" :display="!citySeries.length" />
            <PieChart v-else :labels="cityLabels" :series="citySeries" />
          </div>
        </div>
      </Card>
    </Container>
  </div>
</template>



<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Container from '@/components/ui/Container.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import PieSkeleton from "@/components/ui/charts/PieSkeleton.vue";
import PieChart from "@/components/ui/charts/PieChart.vue";
import client from '@/services/http';

const route = useRoute();

const stateSeries = ref<number[]>([]);
const stateLabels = ref<string[]>([]);
const citySeries = ref<number[]>([]);
const cityLabels = ref<string[]>([]);

const getPercentage = (value: number, total: number): number => {
  return Math.round((value / total) * 100, 2);
};

const getStateReport = async () => {
  try {
    const response = await client.get('reports/grouped-by-state');

    const total = response.data.reduce((acc: number, item: any) => acc + item.count, 0);

    stateSeries.value = response.data.map((item: any) => getPercentage(item.count, total));
    stateLabels.value = response.data.map((item: any) => item.state);
  } catch (error) {
    console.error('Error fetching state report:', error);
  }
};

const getCityReport = async () => {
  try {
    const response = await client.get('reports/grouped-by-city');

    const total = response.data.reduce((acc: number, item: any) => acc + item.count, 0);

    citySeries.value = response.data.map((item: any) => getPercentage(item.count, total));
    cityLabels.value = response.data.map((item: any) => `${item.city} - ${item.state}`);
  } catch (error) {
    console.error('Error fetching city report:', error);
  }
};

onMounted(async () => {
  getStateReport();
  getCityReport();
});
</script>
