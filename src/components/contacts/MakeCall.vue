<template>
  <Button 
    v-if="!activeCall"
    color="primary"
    @click="initiateCall(props.phoneNumber)" 
    :disabled="!props.phoneNumber || activeCall"
  >
    {{ props.label }}
  </Button>
  <div v-if="activeCall" class="flex flex-col md:flex-row items-center gap-0 md:gap-4">
    <Caption>Duração: {{ formattedTime }}</Caption>
    <Button @click="hangUpCall" class="bg-alizarin-crimson-400 text-white">
      Desligar
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Device, Connection } from '@twilio/voice-sdk';
import Button from '@/components/ui/Button.vue';
import Caption from '@/components/ui/Caption.vue';
import client from '@/services/http';

const props = defineProps({
  phoneNumber: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  }
});

const activeCall = ref(false);
const elapsedTime = ref(0);
const activeCallInstance = ref<null | Connection>(null);
const timer = ref<null | ReturnType<typeof setInterval>>(null);

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const resumeAudioContext = () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {});
  }
};

const startTimer = () => {
  if (timer.value) clearInterval(timer.value);
  timer.value = setInterval(() => {
    elapsedTime.value += 1;
  }, 1000);
};

const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedTime.value / 60);
  const seconds = elapsedTime.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

const initiateCall = async (phoneNumber: string) => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });

    resumeAudioContext();

    const response = await client.get('/twilio/generate-token');
    const data = response.data;

    const device = new Device(data.token, {
      codecPreferences: ['opus', 'pcmu'],
      maxCallSignalingTimeoutMs: 30000,
    });

    device.register();

    const callParams = {
      to: `+55${props.phoneNumber}`,
      agent: 'Huggy',
      callerId: import.meta.env.VITE_TWILIO_CALLER_ID,
    };

    const call = await device.connect({ params: callParams });
    activeCallInstance.value = call;

    activeCall.value = true;
    startTimer();

    activeCallInstance.value.on('disconnect', () => {
      activeCallInstance.value = null;
      activeCall.value = false;
      elapsedTime.value = 0;
      if (timer.value) clearInterval(timer.value);
    });

  } catch (error) {
    console.error('Error initiating call:', error);
  }
};

const hangUpCall = () => {
  try {
    if (activeCallInstance.value) {
      activeCallInstance.value.disconnect();
    }
  } finally {
    activeCall.value = false;
    elapsedTime.value = 0;
    if (timer.value) clearInterval(timer.value);
  }
};
</script>