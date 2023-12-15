<template>
	<div class="d-flex flex-column flex-sm-row align-sm-center" :style="{ 'max-width': `${maxWidth}px` }">
		<v-select
			v-for="item in datePickerDateItems"
			:key="item.type"
			:label="item.title"
			:items="item.items"
			v-model="datePickerState[item.type as keyof typeof datePickerState]"
			:density="density"
			class="mr-4"
			:variant="variant"
			:class="`${item.type}-select`"
			:style="{ order: item.order }" />
	</div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { VSelect } from 'vuetify/components';

const props = withDefaults(
	defineProps<{
		modelValue: string | Date;
		fromYear?: string | number;
		order?: 'dd-mmm-yyyy' | 'mmm-dd-yyyy';
		density?: VSelect['$props']['density'];
		variant?: VSelect['$props']['variant'];
		maxWidth?: string | number;
	}>(),
	{
		modelValue: () => new Date(),
		fromYear: () => new Date().getFullYear() - 100,
		order: 'dd-mmm-yyyy',
		variant: 'outlined',
		density: 'compact',
		maxWidth: 'none',
	}
);
const emit = defineEmits<{
	(e: 'update:model-value', val: string | Date): void;
}>();

const monthsForLocales = (
	format: Intl.DateTimeFormatOptions['month'] = 'long',
	customFormatter?: Intl.DateTimeFormat['format']
) => {
	const formatter = customFormatter ?? new Intl.DateTimeFormat('en-US', { month: format }).format;
	return [...Array(12).keys()].map(m => formatter(new Date(Date.UTC(2022, ++m % 12)), { month: format }));
};

const datePickerDateItems = computed(() => [
	{
		type: 'month',
		title: 'Month',
		items: monthsForLocales('long').map((title, i) => ({ title, value: ++i })),
		order: props.order === 'dd-mmm-yyyy' ? 2 : 1,
	},
	{
		type: 'day',
		title: 'Day',
		items: Array.from({ length: 31 }, (_, i) => ++i),
		order: props.order === 'dd-mmm-yyyy' ? 1 : 2,
	},
	{
		type: 'year',
		title: 'Year',
		items: Array.from(
			{ length: new Date().getFullYear() - +props.fromYear },
			(_, i) => +props.fromYear - 1 + i
		).reverse(),
		order: 3,
	},
]);

const datePickerState = reactive({
	month: new Date(props.modelValue).getMonth(),
	day: new Date(props.modelValue).getDate(),
	year: new Date(props.modelValue).getFullYear(),
});

watch(
	datePickerState,
	newVal => {
		emit('update:model-value', new Date(Object.values(newVal).join('-')));
	},
	{ deep: true }
);
</script>
