<template>

    <v-app><v-layout>
            <v-app-bar :elevation="2">
                <template v-slot:prepend>
                    <v-app-bar-nav-icon to="/" icon="mdi-home" nuxt></v-app-bar-nav-icon>
                </template>
                <v-app-bar-title>Dynamic UI</v-app-bar-title>

            </v-app-bar>
            <v-main>

                <v-container fluid>
                    <slot />
                    
                    <v-fab icon="mdi-code-braces" active absolute offset location="bottom-start" nuxt to="debug"></v-fab>
                </v-container>

            </v-main>

        </v-layout>
    </v-app>

</template>