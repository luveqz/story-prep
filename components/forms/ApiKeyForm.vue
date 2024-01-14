<template>
  <form class="max-w-[35rem] grow rounded-md bg-brown-700 p-8" @submit.prevent>
    <HeadingTwo>Paste your Clarifai PAT</HeadingTwo>

    <BaseInput v-model="$app.apiKey" class="my-4 mb-1.5 w-full sm:mt-5" />
    <p class="font-medium text-white/40">
      Don’t have one?
      <a
        class="underline"
        href="https://docs.clarifai.com/clarifai-basics/authentication/personal-access-tokens/"
        target="_blank"
        rel="noreferrer"
      >
        Get it here</a
      >.
    </p>

    <div class="flex justify-end">
      <BaseButton
        class="mt-4 w-full sm:mt-0 sm:w-auto"
        @click="$modal.close('api-key')"
      >
        Save
      </BaseButton>
    </div>
  </form>
</template>
