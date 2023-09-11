<script setup lang="ts">
defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <input
    class="rounded-md bg-brown-50 p-4 text-brown-700 placeholder-brown-700/60 shadow-[0px_2px_0px_0px_--tw-shadow] shadow-brown-100"
    :value="modelValue"
    :placeholder="placeholder"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>
