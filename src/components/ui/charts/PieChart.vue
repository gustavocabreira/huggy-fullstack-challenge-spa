<template>
  <div>
    <VueApexCharts type="pie" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts" setup>
import VueApexCharts from "vue3-apexcharts";
import { ref, onMounted, onUnmounted } from 'vue';

const updateDimensions = () => {
  if (window.innerWidth < 480) {
    chartWidth.value = "100%";
    chartHeight.value = "350";
  } else if (window.innerWidth < 768) {
    chartWidth.value = "100%";
    chartHeight.value = "400";
  } else if (window.innerWidth < 1024) {
    chartWidth.value = "100%";
    chartHeight.value = "450";
  } else if (window.innerWidth < 1366) {
    chartWidth.value = "100%";
    chartHeight.value = "500";
  } else {
    chartWidth.value = "100%";
    chartHeight.value = "550";
  }
};


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

const chartWidth = ref("100%");
const chartHeight = ref("350");

const chartOptions = {
  chart: {
    width: chartWidth,
    height: chartHeight,
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
    position: window.innerWidth < 768 ? "bottom" : "right",
    floating: false,
    horizontalAlign: "center",
    verticalAlign: "middle",
    offsetX: window.innerWidth < 768 ? 0 : -30,
    margin: 20,
    itemMargin: { vertical: 5 },
    itemStyle: {
      fontFamily: "Roboto",
      fontSize: window.innerWidth < 480 ? "10px" : "12px",
      lineHeight: "16px",
      letterSpacing: "0.4px",
      color: "#757575",
    },
    width: window.innerWidth < 768 ? "100%" : 250,
  },
  responsive: [
  {
      breakpoint: 1280,
      options: {
        chart: {
          width: "100%",
          height: "500px",
        },
        legend: {
          position: "right",
          horizontalAlign: "center",
          verticalAlign: "middle",
          offsetY: 80,
          offsetX: -30,
        },
      },
    },
    {
      breakpoint: 1024,
      options: {
        chart: {
          width: "100%",
          height: "350px",
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          verticalAlign: "top",
          offsetY: 10,
          offsetX: 0,
        },
      },
    },
    {
      breakpoint: 768,
      options: {
        chart: {
          width: "100%",
          height: "350px",
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          verticalAlign: "top",
          offsetY: 10,
          offsetX: 0,
        },
      },
    },
    {
      breakpoint: 480,
      options: {
        chart: {
          width: "100%",
          height: "100%",
        },
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          verticalAlign: "top",
          offsetY: 10,
          offsetX: 0,
          itemStyle: {
            fontSize: "10px",
          },
        },
      },
    },
  ],
};

onMounted(() => {
  window.addEventListener("resize", updateDimensions);
  updateDimensions();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateDimensions);
});
</script>

<style>
.apexcharts-theme-light {
  border: none !important;
  background: none !important;
}
</style>
