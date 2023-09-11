<template>
  <form class="max-w-[35rem] grow rounded-md bg-brown-700 p-8" @submit.prevent>
    <HeadingTwo>Paste your PaLM API key</HeadingTwo>

    <BaseInput v-model="$app.apiKey" class="my-4 w-full sm:my-5" />

    <div class="flex justify-end">
      <BaseButton @click="$modal.close('api-key')"> Save </BaseButton>
    </div>
  </form>
</template>
