<template>
  <header class="relative mt-8 flex w-full flex-col items-center">
    <div class="mb-6 flex w-full justify-end">
      <BaseCard class="p-2">
        <KeyIcon />
      </BaseCard>
    </div>

    <LogoIcon />

    <p
      class="mb-9 mt-2 w-96 text-center font-quicksand text-xl font-medium leading-6 opacity-60"
    >
      Generate short ad-hoc English lessons for your next read.
    </p>

    <BaseButton size="big" @click="$modal.open('story-textbox')">
      Paste Story
    </BaseButton>
  </header>
</template>
