<template>
    <Table :items="customers" :columns="CustomerColumt" @refresh="loadData" @download="exportData" />
</template>

<script setup>
import { ref } from 'vue';
import Table from '../components/Table.vue';
import { CustomerService } from '../service/CustomerService';
import { Columns as CustomerColumt } from '../service/CustomerService';

const customers = ref([]);

const loadData = () => {
    CustomerService.getCustomersXLarge().then((data) => {
        customers.value = data;
    });
};

loadData();
</script>