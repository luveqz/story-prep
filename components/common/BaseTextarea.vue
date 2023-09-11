<script setup lang="ts">
defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <textarea
    class="resize-none rounded-md border-r-[6px] border-brown-50 bg-brown-50 p-4 text-brown-700 shadow-[0px_2px_0px_0px_--tw-shadow] shadow-brown-100"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>
