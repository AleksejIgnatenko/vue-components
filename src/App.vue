<template>
    <div id="app">
        <Sidebar />
        <Toast />

        <div style="display: none;">
            <TheamSwitcher />
        </div>  

        <router-view />
    </div>
</template>

<script setup>
import TheamSwitcher from './components/ThemeSwitcher.vue';
import Sidebar from './components/Sidebar.vue';
</script>