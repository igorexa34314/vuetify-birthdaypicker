<template>
	<div
		class="v-birthdaypicker d-flex flex-column flex-sm-row align-sm-center"
		:style="{ 'max-width': `${maxWidth}px` }">
		<v-select
			v-for="item in datePickerDateItems"
			:key="item.type"
			:label="item.title"
			:items="item.items"
			v-model="datePickerState[item.type as keyof typeof datePickerState].value"
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
import { computed } from 'vue';
import { VSelect } from 'vuetify/components';

export interface VBirthdayPickerProps {
	modelValue: Date;
	fromYear?: string | number;
	order?: 'dd-mmm-yyyy' | 'mmm-dd-yyyy';
	density?: VSelect['$props']['density'];
	variant?: VSelect['$props']['variant'];
	maxWidth?: string | number;
	monthFormat?: Intl.DateTimeFormatOptions['month'];
	monthFormatter?: (date: Date) => string;
}

const props = withDefaults(defineProps<VBirthdayPickerProps>(), {
	modelValue: () => new Date(),
	fromYear: () => new Date().getFullYear() - 100,
	order: 'dd-mmm-yyyy',
	variant: 'outlined',
	density: 'compact',
	maxWidth: 'none',
	monthFormat: 'long',
});

const dateModel = defineModel<Date>({ default: () => new Date() });

const monthsForLocales = () => {
	const formatter = props.monthFormatter ?? new Intl.DateTimeFormat('en-US', { month: props.monthFormat }).format;
	return [...new Array(12).keys()].map(m => formatter(new Date(Date.UTC(2022, m % 12))));
};

const datePickerDateItems = computed(() => [
	{
		type: 'month',
		title: 'Month',
		items: monthsForLocales().map((title, i) => ({ title, value: ++i })),
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
			(_, i) => i + +props.fromYear
		).reverse(),
		order: 3,
	},
]);

const datePickerState = {
	year: computed({
		get: () => props.modelValue.getFullYear(),
		set: val => (dateModel.value = new Date(val, dateModel.value.getMonth(), dateModel.value.getDate())),
	}),
	month: computed({
		get: () => props.modelValue.getMonth() + 1,
		set: val => (dateModel.value = new Date(dateModel.value.getFullYear(), val - 1, dateModel.value.getDate())),
	}),
	day: computed({
		get: () => props.modelValue.getDate(),
		set: val => (dateModel.value = new Date(dateModel.value.getFullYear(), dateModel.value.getMonth(), val)),
	}),
};
</script>

<style scoped>
.v-birthdaypicker {
}
</style>
