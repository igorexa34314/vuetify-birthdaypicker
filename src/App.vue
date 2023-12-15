<template>
	<div class="playground w-100 h-100 d-flex flex-column align-center">
		<div class="title my-5">
			<span>vuetify-birthdaypicker playground</span>
		</div>
		<h3 class="state">
			{{ 'Date state: ' + birthdayDate.toDateString() }}
		</h3>
		<v-birthday-picker class="mt-4" v-model="birthdayDate" order="dd-mmm-yyyy" :max-width="450" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VBirthdayPicker } from '@/components';

const birthdayDate = ref(new Date());
</script>
