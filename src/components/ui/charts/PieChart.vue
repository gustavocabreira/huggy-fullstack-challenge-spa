<template>
  <div>
    <VueApexCharts type="pie" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts" setup>
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  series: {
    type: Array,
    required: true,
  },
  labels: {
    type: Array,
    required: true,
  },
});

const chartOptions = {
  chart: {
    width: 380,
    height: 380,
    type: 'pie',
  },
  colors: ['#2715B0', '#BDB5F4', '#7E6FEA', '#5946E4', '#180D6E'],
  labels: props.labels,
  stroke: { show: false },
  grid: { show: false },
  dataLabels: { enabled: false },
  tooltip: {
    theme: 'light',
    fillSeriesColor: false,
    custom: function ({ series, seriesIndex, w }) {
      return (
        `<div style="border: 1px solid #C9C9C9; padding: 6px 8px; border-radius: 8px; background: #ffffff; box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);">` +
        `<span style="font-size: 12px; font-weight: 500; color: #333333; line-height: 18px;">` +
        `${series[seriesIndex]}% ${w.globals.labels[seriesIndex]}` +
        `</span>` +
        `</div>`
      );
    },
  },
  legend: {
    position: 'right',
    floating: false,
    horizontalAlign: 'center',
    verticalAlign: 'middle',
    offsetX: -30,
    offsetY: 80,
    margin: 20,
    itemMargin: {
      vertical: 5,
    },
    itemStyle: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.4px',
      color: '#757575',
    },
    width: 250,
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          width: 406,
          height: 406,
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          offsetY: 10,
          offsetX: 0,
        },
      },
    },
    {
      breakpoint: 480,
      options: {
        chart: {
          width: '100%',
          height: '100%',
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          verticalAlign: 'top',
          offsetY: 10,
          offsetX: 0,
          itemStyle: {
            fontSize: '10px',
          },
        },
      },
    },
  ],
};
</script>

<style>
.apexcharts-theme-light {
  border: none !important;
  background: none !important;
}
</style>