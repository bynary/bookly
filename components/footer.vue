<template>
    <v-footer class="text-center d-flex flex-column sticky-footer" 
        color="teal-darken-4">
 
        <v-divider :thickness="9"></v-divider>
    
        <div>
            <strong><v-icon icon="mdi-copyright"></v-icon> {{ new Date().getFullYear() }} — Bynary Studio</strong>
        </div>
    </v-footer>
</template>

<script>
export default {
  data: () => ({
  }),
}
</script>

<style>
    .sticky-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 2;
    }
</style>