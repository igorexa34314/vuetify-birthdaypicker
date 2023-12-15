<template>
	<div
		class="v-birthdaypicker d-flex flex-column flex-sm-row align-sm-center"
		:style="{ 'max-width': `${maxWidth}px` }">
		<v-select
			v-for="item in datePickerDateItems"
			:key="item.type"
			:label="item.title"
			:items="item.items"
			v-model="datePickerState[item.type as keyof typeof datePickerState]"
			:density="density"
			class="mr-4"
			:variant="variant"
			hide-details
			:class="`${item.type}-select`"
			:style="{ order: item.order }">
		</v-select>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { VSelect } from 'vuetify/components';

const props = withDefaults(
	defineProps<{
		modelValue: Date;
		fromYear?: string | number;
		order?: 'dd-mmm-yyyy' | 'mmm-dd-yyyy';
		density?: VSelect['$props']['density'];
		variant?: VSelect['$props']['variant'];
		maxWidth?: string | number;
		monthFormat?: Intl.DateTimeFormatOptions['month'];
		customFormatter?: Intl.DateTimeFormat['format'];
	}>(),
	{
		modelValue: () => new Date(),
		fromYear: () => new Date().getFullYear() - 100,
		order: 'dd-mmm-yyyy',
		variant: 'outlined',
		density: 'compact',
		maxWidth: 'none',
		monthFormat: 'long',
	}
);

const emit = defineEmits<{
	(e: 'update:model-value', val: string | Date): void;
}>();

const monthsForLocales = (
	format: Intl.DateTimeFormatOptions['month'],
	customFormatter?: Intl.DateTimeFormat['format']
) => {
	const formatter = customFormatter ?? new Intl.DateTimeFormat('en-US', { month: format }).format;
	return [...new Array(12).keys()].map(m => formatter(new Date(Date.UTC(2022, m++ % 12))));
};

const datePickerDateItems = computed(() => [
	{
		type: 'month',
		title: 'Month',
		items: monthsForLocales(props.monthFormat, props.customFormatter).map((title, i) => ({ title, value: i++ })),
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

const datePickerState = ref({
	year: props.modelValue.getFullYear(),
	month: props.modelValue.getMonth(),
	day: props.modelValue.getDate(),
});

watch(
	datePickerState,
	newVal => {
		emit('update:model-value', new Date(Object.values(newVal).join('-')));
	},
	{ deep: true }
);
</script>

<style scoped>
.v-birthdaypicker {
}
</style>
