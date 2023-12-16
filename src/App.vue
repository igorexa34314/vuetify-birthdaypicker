<template>
	<div class="playground w-100 h-100 d-flex flex-column align-center">
		<div class="title my-5">
			<span>vuetify-birthdaypicker playground</span>
		</div>
		<h3 class="state">
			{{ 'Date state: ' + birthdayDate.toDateString() }}
			<v-btn class="mt-3" block @click="changeDate">Change date state</v-btn>
		</h3>
		<span class="mt-6 mb-5">Default</span>
		<v-birthday-picker v-model="birthdayDate" :max-width="450" />

		<span class="mt-6 mb-5">order="mmm-dd-yyyy"</span>
		<v-birthday-picker v-model="birthdayDate" order="mmm-dd-yyyy" :max-width="450" />

		<span class="mt-6 mb-5">from-year="1960"</span>
		<v-birthday-picker v-model="birthdayDate" :from-year="1960" :max-width="450" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VBtn } from 'vuetify/components';
import { VBirthdayPicker } from '@/components';

const birthdayDate = ref(new Date());

const changeDate = () => {
	birthdayDate.value = generateRandomDate(new Date(1960, 0, 1), new Date());
};

const generateRandomDate = (from: Date, to: Date) =>
	new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
</script>
