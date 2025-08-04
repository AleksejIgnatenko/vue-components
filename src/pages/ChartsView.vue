<template>
    <div class="bg-surface-0 dark:bg-surface-950 px-6 md:px-12 lg:px-20 py-20 text-center">
        <div class="flex flex-col gap-6">
            <!-- Заголовок -->
            <div class="flex flex-col items-center gap-4">
                <div class="font-bold text-3xl leading-tight">
                    <span class="text-primary-500 dark:text-primary-400">Charts</span>
                </div>
            </div>

            <div class="flex flex-wrap justify-center gap-8">

                <!-- Column Chart -->
                <router-link to="/components/charts/column-chart">
                    <div class="w-full sm:w-auto rounded-md p-4 max-w-xs">
                        <span
                            class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-800 shadow mx-auto">
                            <i class="pi pi-chart-bar !text-2xl lg:!text-3xl text-primary-500 dark:text-primary-400" />
                        </span>
                        <div class="flex flex-col gap-1">
                            <div class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">Column Chart
                            </div>
                        </div>
                    </div>
                </router-link>
                
                <!-- Doughnut Chart -->
                <router-link to="/components/charts/doughnut-chart">
                    <div class="w-full sm:w-auto rounded-md p-4 max-w-xs">
                        <span
                            class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-800 shadow mx-auto">
                            <i class="pi pi-chart-pie !text-2xl lg:!text-3xl text-primary-500 dark:text-primary-400" />
                        </span>
                        <div class="flex flex-col gap-1">
                            <div class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">
                                Doughnut Chart
                            </div>
                        </div>
                    </div>
                </router-link>

                <!-- Line Chart -->
                <router-link to="/components/charts/line-chart">
                    <div class="w-full sm:w-auto rounded-md p-4 max-w-xs">
                        <span
                            class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-800 shadow mx-auto">
                            <i class="pi pi-chart-line !text-2xl lg:!text-3xl text-primary-500 dark:text-primary-400" />
                        </span>
                        <div class="flex flex-col gap-1">
                            <div class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">
                                Line Chart
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>