<template>
  <header class="relative flex w-full flex-col items-center">
    <div class="mb-2 flex w-full justify-end sm:mb-6">
      <BaseCard class="cursor-pointer p-2" @click="$modal.open('api-key')">
        <KeyIcon />
      </BaseCard>
    </div>

    <LogoIcon class="h-auto w-36 sm:w-auto" />

    <p
      class="mb-6 mt-2 max-w-sm text-center font-quicksand text-lg font-medium leading-6 opacity-60 sm:mb-9 sm:text-xl"
    >
      Generate short ad-hoc English lessons for your next read.
    </p>

    <BaseButton size="big" @click="$modal.open('story-textbox')">
      Paste Story
    </BaseButton>
  </header>
</template>
