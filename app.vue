<script setup lang="ts">
  import Header from './components/header.vue'
  import Content from './components/content.vue'
</script>

<template>
  <NuxtLayout>
    <v-app>
      <Header></Header>
      <Content />
    </v-app>
  </NuxtLayout>
</template>
