<template>
    <div id="app">
        <Sidebar />
        <Toast />

        <ThemeSwitcher style="display: none;" />  
        
        <Loader v-if="isLoading" />
        <router-view v-else />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';
import Sidebar from './components/Sidebar.vue';
import Loader from './components/Loader.vue';

const isLoading = ref(true);

setTimeout(() => {
    isLoading.value = false;
}, 2000);

</script>