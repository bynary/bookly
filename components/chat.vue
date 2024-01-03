<script setup>
  import { ref } from 'vue'

  const variants = ['elevated', 'flat', 'tonal', 'outlined']
  const color = ref('secondary')
</script>

<template>
    <div>
        <v-card class="elevation-16 floating chat-card"
          :color="color"
          :variant="variant">
            <v-card-title>
                <v-row>
                    <v-col>
                        Ask Bookly
                    </v-col>
                    <v-col>
                        <div class="pa-4 text-end">
                            <v-btn
                                density="compact"
                                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                @click="show = !show"></v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-expand-transition>
                <div v-show="show">
                    <div class="d-flex w-100 chat-history">
                        <v-infinite-scroll :items="items" :onload="load">
                            <template v-for="(item, index) in items" :key="item">
                                <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
                                {{ item }}
                                </div>
                            </template>
                        </v-infinite-scroll>
                    </div>
                    <div class="pa-4 text-end">
                        <v-form @submit.prevent>
                            <v-row>
                                <v-col cols="10">
                                    <v-textarea
                                    maxlength="200"
                                    label="Enter your question here..."
                                    rows="1"
                                    auto-grow
                                    clearable
                                    counter
                                    max-rows="3"
                                    no-resize
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn density="default" icon="mdi-send" type="submit" class="mt-2"></v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </div>
                </div>
            </v-expand-transition>
        </v-card>       
    </div>
</template>

<script>
    export default {
        data: () => ({
            items: [],
            show: false,
        }),

        methods: {
            async api () {
            return new Promise(resolve => {
                setTimeout(() => {
                resolve(Array.from({ length: 10 }, (k, v) => v + this.items.at(-1) + 1))
                }, 1000)
            })
            },
            async load ({ done }) {
            // Perform API call
            const res = await this.api()

            this.items.push(...res)

            done('ok')
            },
        },
    }
</script>

<style>
    .floating {
        position: fixed !important;
        z-index: 1000;
        right: 20px;
        bottom: 20px;
    }

    .chat-header {
        font-weight: 800;
    }

    .chat-history {
        height: 65dvh;
        width: 50dvw;
    }

    .chat-card {
        border-radius: 20px !important;
    }
</style>