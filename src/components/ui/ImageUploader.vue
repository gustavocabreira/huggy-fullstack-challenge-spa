<template>
  <div class="flex flex-col items-center">
    <label class="flex flex-col items-center cursor-pointer">
      <div class="avatar relative group rounded-full" :class="{ 'w-32 h-32': !hasPhoto && text }">
        <img
          v-if="hasPhoto || (!hasPhoto && !text)"  
          :src="previewImage"
          alt="Preview"
          class="w-32 h-32 rounded-full border-2 border-mine-shaft-30 object-cover" />
        <span
          v-else
          class="flex items-center justify-center w-full h-full font-semibold text-4xl">
          {{ initials }}
        </span>
        <div
          class="absolute inset-0 bg-mine-shaft-30 opacity-0 group-hover:opacity-30 transition-opacity duration-100 rounded-full">
        </div>
        <input type="file" accept="image/*" @change="handleFileChange"
          class="absolute inset-0 opacity-0 cursor-pointer" />
      </div>
      <Caption class="mt-2">Enviar Foto</Caption>
    </label>
    <Caption v-if="errorMessage" class="mt-2 text-red-500">{{ errorMessage }}</Caption>
  </div>
</template>


<script lang="ts" setup>
import { ref, defineEmits, computed } from 'vue';
import Caption from '@/components/ui/Caption.vue';
import White from '@/assets/images/white.jpg';

const props = defineProps({
  defaultPhoto: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: '',
  },
  hasPhoto: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['update:photo']);

const previewImage = ref(props.defaultPhoto ?? White);
const errorMessage = ref('');

const handleFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      errorMessage.value = 'Tipo de arquivo inválido. Use JPEG ou PNG.';
      previewImage.value = White;
      emit('update:photo', null);
      return;
    }

    if (file.size / 1024 > 2048) {
      errorMessage.value = 'O tamanho da imagem é maior que 2048 KB (2 MB).';
      previewImage.value = White;
      emit('update:photo', null);
      return;
    }

    errorMessage.value = '';

    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string;
      emit('update:photo', file);
    };
    reader.readAsDataURL(file);
  }
};

const initials = computed(() => {
  const names = props.text.split(' ');
  const firstInitial = names[0]?.charAt(0).toUpperCase() || '';
  const secondInitial = names[1]?.charAt(0).toUpperCase() || '';
  return `${firstInitial}${secondInitial}`;
});
</script>

<style lang="scss">
.avatar {
  background-color: #F8F7FD;
  color: #180D6E;
}
</style>