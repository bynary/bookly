
import type { VExpansionPanel } from 'vuetify/lib/components/index.mjs';
<script setup lang="ts">
    import Chat from './chat.vue'
    import { ref } from 'vue'

    const variants = ['elevated', 'flat', 'tonal', 'outlined']
    const color = ref('secondary')
</script>

<template>
    <v-container class="bg-white-variant h-screen">
        <v-row no-gutters>
            <v-col cols="12">
                <v-sheet class="ma-2 pa-2">
                    <v-icon icon="mdi-cake"></v-icon> <span>You found the hidden VExpansionPanel. Congratulations!</span>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8" offset="2" class="instructions">
                <h4>Upload a file to get started</h4>
                <div class="file-types">Accepted file types: .txt, .pdf, .doc, .docx, .rtf</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8" offset="2">
                <div  class="file-upload">
                    <v-file-input
                    small-chips
                    label="Drag & drop file or Click to select file"
                    variant="solo-filled"
                    show-size
                    counter
                    clearable
                    @change="getFile($event)">
                    </v-file-input>
                </div>
            </v-col>
            <v-col cols="2">
                <div class="file-upload">
                    <v-btn :color="color" prepend-icon="mdi-upload" @click="uploadFile()">upload</v-btn>
                </div>
            </v-col>
        </v-row>
        <Chat></Chat>
    </v-container>
</template>

<script lang="ts">
    export default {
        data: () => ({
            file: [],
        }),
        methods: {
            async getFile (e) {
                const files = await e.target.files;

                if (files[0] !== undefined) {
                    console.log(files[0].name);
                    this.file = files[0];
                }

                console.log(this.file);
            },
        },
    }
</script>

<style>
    .instructions {
        text-align: center;
    }

    .instructions .file-types {
        font-size: 0.85em;
    }

    .file-upload {
        display: flex;
        align-items: center;
    }
</style>