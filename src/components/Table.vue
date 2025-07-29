<template>
    <div class="card">
        <!-- Выбор колонок -->
        <div class="mb-4 flex justify-end">
            <MultiSelect v-model="selectedColumns" :options="columnOptions" optionLabel="header"
                placeholder="Select Columns" display="chip" />
        </div>

        <!-- Таблица с Skeleton -->
        <DataTable v-if="isLoading" :value="skeletonRows">
            <Column v-for="col of selectedColumns" :key="col.field" :header="col.header">
                <template #body>
                    <Skeleton />
                </template>
            </Column>
        </DataTable>

        <!-- Таблица с данными и редактированием -->
        <DataTable v-else v-model:filters="filters" v-model:editingRows="editingRows" :value="items" :totalRecords="totalRecords" editMode="row"
            sortMode="multiple" paginator :rows="5" dataKey="id" @row-edit-save="onRowEditSave"
            :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem" filterDisplay="row"
            :globalFilterFields="globalFilterFields"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            @page="onPageChange">
            <!-- Глобальный поиск -->
            <template #header>
                <div class="flex justify-end">
                    <IconField iconPosition="left">
                        <InputIcon><i class="pi pi-search" /></InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>

            <!-- Пагинатор кнопки -->
            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" text @click="onRefresh" />
            </template>
            <template #paginatorend>
                <Button type="button" icon="pi pi-download" text @click="onDownload" />
            </template>

            <!-- Динамические колонки с редактированием -->
            <Column v-for="col of selectedColumns" :key="col.field" :field="col.field" :header="col.header" sortable
                :style="{ width: col.width || 'auto' }">
                <!-- Тело -->
                <template #body="{ data }">
                    <div v-if="col.type === 'boolean'" class="text-center">
                        <i class="pi" :class="{
                            'pi-check-circle text-green-500': data[col.field],
                            'pi-times-circle text-red-400': !data[col.field]
                        }"></i>
                    </div>
                    <div v-else-if="col.field === 'country.name'" class="flex items-center gap-2">
                        <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png "
                            :class="`flag flag-${data.country.code}`" style="width: 24px" />
                        <span>{{ data.country.name }}</span>
                    </div>
                    <div v-else-if="col.field === 'representative.name'" class="flex items-center gap-2">
                        <img :src="`/avatars/${data.representative.image}`" style="width: 32px" />
                        <span>{{ data.representative.name }}</span>
                    </div>
                    <Tag v-else-if="col.field === 'status'" :value="data[col.field]"
                        :severity="getSeverity(data[col.field])" />
                    <span v-else-if="col.field === 'price'">{{
                        formatCurrency(data[col.field]) }}</span>
                    <span v-else>{{ data[col.field] }}</span>
                </template>

                <!-- Редактор -->
                <template #editor="{ data, field }">
                    <!-- 1. Специальный редактор для страны с флагом -->
                    <div v-if="field === 'country.name'" class="flex items-center gap-2">
                        <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                            :class="`flag flag-${data.country.code}`" style="width: 24px" />
                        <InputText v-model="data.country.name" @input="onCountryNameChange(data.country)" fluid />
                    </div>

                    <!-- 2. Редактор для выпадающего списка -->
                    <Select v-else-if="col.editorType === 'select'" v-model="data[field]" :options="col.enumValues"
                        placeholder="Select Status" fluid>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Select>

                    <!-- 3. Редактор для файла -->
                    <FileUpload v-else-if="col.editorType === 'file'" mode="basic" name="demo[]" url="/api/upload"
                        accept="image/*,.pdf" :maxFileSize="1000000" @upload="onUpload(data, field, $event)"
                        chooseLabel="Выбрать файл" fluid />

                    <!-- 4. Общий текстовый редактор для всех остальных полей -->
                    <InputText v-else-if="col.editorType === 'text'" v-model="data[field]" fluid />
                </template>

                <!-- Фильтр -->
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-if="col.filterType === 'text'" v-model="filterModel.value" @input="filterCallback"
                        placeholder="Search" />

                    <Select v-else-if="col.filterType === 'select'" v-model="filterModel.value"
                        @change="filterCallback()" :options="col.enumValues" placeholder="Select One"
                        style="min-width: 12rem" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Select>

                    <MultiSelect v-else-if="col.filterType === 'multiselect'" v-model="filterModel.value"
                        @change="filterCallback()" :options="col.enumValues" placeholder="Any" style="min-width: 14rem"
                        :maxSelectedLabels="2" display="chip">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </MultiSelect>

                    <Checkbox v-else-if="col.filterType === 'boolean'" v-model="filterModel.value"
                        :indeterminate="filterModel.value === null" binary @change="filterCallback" />
                </template>
            </Column>

            <!-- Кнопка редактирования -->
            <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { FilterMatchMode } from "@primevue/core/api";

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  totalRecords: {
    type: Number,
    default: 0
  },
  loadData: {
    type: Function,
    required: false,
    default: null
  }
});

const emit = defineEmits(["refresh", "download"]);

// Состояние Skeleton
const skeletonRows = ref(new Array(5));

// Состояние загрузки
const isLoading = ref(true);

// Редактирование строк
const editingRows = ref([]);

// Обработка событий пагинации
const onRefresh = () => emit("refresh");
const onDownload = () => emit("download");

// Опции для выбора колонок
const columnOptions = ref(props.columns);
const selectedColumns = ref([...props.columns]);

// Для глобального поиска
const globalFilterFields = computed(() => selectedColumns.value.map((col) => col.field));

// Фильтры динамически создаются на основе выбранных колонок
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ...Object.fromEntries(
        props.columns.map((col) => [
            col.field,
            {
                value: null,
                matchMode:
                    col.filterType === "multiselect"
                        ? FilterMatchMode.IN
                        : col.filterType === "select"
                            ? FilterMatchMode.EQUALS
                            : col.filterType === "boolean"
                                ? FilterMatchMode.EQUALS
                                : FilterMatchMode.CONTAINS
            }
        ])
    )
});

const statuses = computed(() => {
    const statusColumn = props.columns.find(c => c.field === 'status');
    if (!statusColumn) return [];

    return statusColumn.enumValues.map(status => ({
        label: status,
        value: status
    }));
});

// Логика цвета статуса
function getSeverity(status) {
    switch (status) {
        case "unqualified":
            return "danger";
        case "qualified":
            return "success";
        case "new":
            return "info";
        case "negotiation":
            return "warn";
        case "renewal":
            return null;
        default:
            return null;
    }
}

// Сохранение изменений
const onRowEditSave = (event) => {
    const { newData, index } = event;
    props.items[index] = newData;
};

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
});
</script>