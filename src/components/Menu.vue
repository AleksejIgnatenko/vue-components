<template>
    <div class="card">
        <Menubar :model="items" @command="handleMenuClick" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push('/');
        }
    },
    {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
            router.push('/settings');
        }
    },
    {
        label: 'Components',
        icon: 'pi pi-list',
        items: [
            {
                label: 'Table',
                icon: 'pi pi-table',
                command: () => {
                    router.push('/table');
                },
            },
        ]
    },
]);

const handleMenuClick = (item) => {
    if (item.command) {
        item.command();
    }
};
</script>