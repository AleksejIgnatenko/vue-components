<template>
    <div class="card flex justify-center">
        <Breadcrumb :model="breadcrumbs">
            <template #item="{ item }">
                <router-link v-if="item.to" :to="item.to" class="p-menuitem-link">
                    <span class="p-menuitem-text">{{ item.label }}</span>
                </router-link>
                <span v-else class="p-menuitem-text">{{ item.label }}</span>
            </template>
        </Breadcrumb>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Breadcrumb from "primevue/breadcrumb";

const route = useRoute();

const home = ref({
    label: 'Home',
    icon: 'pi pi-home',
    to: '/'
});

// Вычисляем хлебные крошки
const breadcrumbs = computed(() => {
    const pathSegments = route.path.split('/').filter(Boolean);
    const crumbs = [];

    // Добавляем Home как первый элемент
    crumbs.push({
        label: 'Home',
        to: '/'
    });

    let currentPath = '';
    for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        currentPath += `/${segment}`;
        const isLast = i === pathSegments.length - 1;

        crumbs.push({
            label: formatSegment(segment),
            to: isLast ? undefined : currentPath
        });
    }

    return crumbs;
});

// Форматируем сегмент пути в читаемый вид
function formatSegment(segment) {
    return segment
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
}
</script>