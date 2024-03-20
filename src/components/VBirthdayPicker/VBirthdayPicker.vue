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
			<template v-for="slot in slots" :key="slot.name" v-slot:[slot.name]="slotProps">
				<component :is="slot(slotProps)" :name="`${item.type}:${slot.name}`" v-bind="slotProps" />
			</template>
		</v-select>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { VSelect } from 'vuetify/components';

interface DateItemProps {
	title?: string;
}

interface MonthProps extends DateItemProps {
	format?: Intl.DateTimeFormatOptions['month'];
	formatter?: (date: Date) => string;
}
interface DayProps extends DateItemProps {}
interface YearProps extends DateItemProps {}

export interface VBirthdayPickerProps {
	modelValue: Date;
	fromYear?: string | number;
	order?: 'dd-mmm-yyyy' | 'mmm-dd-yyyy';
	density?: VSelect['$props']['density'];
	variant?: VSelect['$props']['variant'];
	maxWidth?: string | number;

	month?: MonthProps | boolean;
	day?: DayProps | boolean;
	year?: YearProps | boolean;
}
const props = withDefaults(defineProps<VBirthdayPickerProps>(), {
	modelValue: () => new Date(),
	fromYear: () => new Date().getFullYear() - 100,
	order: 'dd-mmm-yyyy',
	variant: 'outlined',
	density: 'compact',
	maxWidth: 'none',
	month: () => ({
		format: 'long',
	}),
	day: true,
	year: true,
});

const dateModel = defineModel<Date>({ default: () => new Date() });
const slots = defineSlots<VSelect['$slots']>();

const monthsForLocales = () => {
	const formatter =
		typeof props.month === 'object' && props.month.formatter
			? props.month.formatter
			: new Intl.DateTimeFormat('en-US', {
					month: typeof props.month === 'object' && props.month.format ? props.month.format : 'long',
				}).format;

	return [...new Array(12).keys()].map(m => formatter(new Date(Date.UTC(2022, m % 12))));
};

interface DatePickerDateItem {
	type: string;
	title: string;
	items: VSelect['$props']['items'];
	order: number;
}

const datePickerDateItems = computed(() => {
	return [
		props.month
			? {
					type: 'month',
					title: 'Month',
					items: monthsForLocales().map((title, i) => ({ title, value: ++i })),
					order: props.order === 'dd-mmm-yyyy' ? 2 : 1,
				}
			: false,
		props.day
			? {
					type: 'day',
					title: 'Day',
					items: Array.from({ length: 31 }, (_, i) => ++i),
					order: props.order === 'dd-mmm-yyyy' ? 1 : 2,
				}
			: false,
		props.year
			? {
					type: 'year',
					title: 'Year',
					items: Array.from(
						{ length: new Date().getFullYear() - +props.fromYear },
						(_, i) => i + +props.fromYear
					).reverse(),
					order: 3,
				}
			: false,
	].filter(Boolean) as DatePickerDateItem[];
});

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
