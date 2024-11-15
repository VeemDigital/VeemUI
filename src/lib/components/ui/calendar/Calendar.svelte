<script>
	import { onMount } from 'svelte';
	// Array of days to enable (0 = Sunday, 6 = Saturday)
	let { class: className, style, chooseDate = $bindable(), enableDays = [], ...rest } = $props();

	let currentYear, currentMonth;
	let stringMount = $state('');
	let initialized = false;

	let mounts = [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre'
	];

	/**
	 * @typedef Day
	 * @type {object}
	 * @property {number} day - The day number.
	 * @property {boolean} current - Indicates if the day belongs to the current month.
	 * @property {boolean} disabled - Indicates if the day should be disabled.
	 */
	/** @type {Day[]} */
	let daysInMonth = $state([]);

	function getDaysInMonth(year, month) {
		return new Date(year, month + 1, 0).getDate();
	}

	function isEnabled(year, month, day, current) {
		if (!current) return false; // Disable non-current month days

		// Create date object for the day we're checking
		const date = new Date(year, month, day);
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Get day of week (0-6, where 0 is Sunday)
		let dayOfWeek = date.getDay();

		// Convert from Sunday-Saturday (0-6) to Monday-Sunday (1-0)
		// If it's Sunday (0), make it 7, then subtract 1 from all days
		dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

		// Check if the date is today or before today
		const isNotFutureDate = date <= today;

		// Check if the day is in the enabled days array
		// Convert enabled days to match our Monday-first format
		const adjustedEnabledDays = enableDays.map((d) => (d === 0 ? 6 : d - 1));
		const isDayEnabled = adjustedEnabledDays.includes(dayOfWeek);

		// Enable only if:
		// 1. The day is in enableDays array AND
		// 2. The date is in the future (not today or before)
		return current && isDayEnabled && !isNotFutureDate;
	}

	function initializeCalendar(year, month) {
		currentYear = year;
		currentMonth = month;
		stringMount = mounts[month];
		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const lastDayOfMonth = getDaysInMonth(year, month);
		const newDaysInMonth = [];

		// Days from previous month
		if (firstDayOfMonth !== 0) {
			const prevMonthDays = getDaysInMonth(year, month - 1);
			for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
				newDaysInMonth.push({
					day: i,
					current: false,
					disabled: true
				});
			}
		}

		// Days from current month
		for (let i = 1; i <= lastDayOfMonth; i++) {
			const enabled = isEnabled(year, month, i, true);
			newDaysInMonth.push({
				day: i,
				current: true,
				disabled: !enabled
			});
		}

		// Days from next month
		const remainingDays = 42 - newDaysInMonth.length;
		for (let i = 1; i <= remainingDays; i++) {
			newDaysInMonth.push({
				day: i,
				current: false,
				disabled: true
			});
		}

		daysInMonth = newDaysInMonth;
	}

	function previousMonth() {
		if (currentMonth === 0) {
			currentYear--;
			currentMonth = 11;
		} else {
			currentMonth--;
		}
		initializeCalendar(currentYear, currentMonth);
	}

	function nextMonth() {
		if (currentMonth === 11) {
			currentYear++;
			currentMonth = 0;
		} else {
			currentMonth++;
		}
		initializeCalendar(currentYear, currentMonth);
	}

	function updateChooseDate(day) {
		if (!day.disabled) {
			let date = new Date(currentYear, currentMonth, day.day);
			chooseDate = date;
		}
	}

	onMount(() => {
		const today = chooseDate || new Date();
		initializeCalendar(today.getFullYear(), today.getMonth());
		initialized = true;
	});

	// Watch for changes in enableDays prop
	$effect(() => {
		// Only reinitialize if already mounted and values are set
		if (initialized && currentYear !== undefined && currentMonth !== undefined && enableDays) {
			initializeCalendar(currentYear, currentMonth);
		}
	});
</script>

<div class="{className} calendar" {style} {rest}>
	<div class="calendar-controls">
		<button aria-label="calendar-before" onclick={previousMonth}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide-icon lucide lucide-chevron-left h-4 w-4"
			>
				<path d="m15 18-6-6 6-6"></path>
			</svg>
		</button>
		<div>{stringMount}</div>
		<button aria-label="calendar-after" onclick={nextMonth}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide-icon lucide lucide-chevron-right h-4 w-4"
			>
				<path d="m9 18 6-6-6-6"></path>
			</svg>
		</button>
	</div>
	<div class="calendar-header">
		<div class="header-item">Di</div>
		<div class="header-item">Lu</div>
		<div class="header-item">Ma</div>
		<div class="header-item">Me</div>
		<div class="header-item">Je</div>
		<div class="header-item">Ve</div>
		<div class="header-item">Sa</div>
	</div>
	<div class="calendar-content">
		{#each daysInMonth as day}
			<button
				type="button"
				onclick={() => updateChooseDate(day)}
				class="day"
				class:current-month={day.current}
				class:other-month={!day.current}
				class:selected={chooseDate && chooseDate.getDate() === day.day && day.current}
				class:disabled={day.disabled}
				disabled={day.disabled}
			>
				<span style="margin: auto;">
					{day.day}
				</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.calendar {
		padding: 2vw;
		/* background-color: var(--ui-background-color-2); */
		color: var(--ui-theme-text-1);
		border-radius: 10px;
		border: solid 1px var(--ui-theme-border-1);
	}

	.calendar-controls {
		display: flex;
		vertical-align: middle;
		align-items: center;
	}

	.calendar-controls * {
		margin-left: auto;
		margin-right: auto;
	}

	.calendar-controls *:first-child {
		margin-left: 0;
	}

	.calendar-controls *:last-child {
		margin-right: 0;
	}

	button {
		background: transparent;
		border: solid 1px #333;
		border-radius: 4px;
		color: #fff;
		display: flex;
	}

	.calendar-header {
		display: flex;
		padding: 3vh 0 1vh 0;
	}
	.calendar-header div {
		display: flex;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
	}

	.header-item {
		color: #a1a1aa;
	}

	.calendar-content {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
	}

	.day {
		flex: 0 0 14.28%;
		text-align: center;
		border-radius: 4px;
		padding: 1vh 0 1vh 0;
		border: none;
		background: transparent;
		margin-left: auto;
		margin-right: auto;
	}

	.current-month {
		color: #fff;
		cursor: pointer;
	}

	.current-month:hover {
		background-color: #fff;
		color: #000;
	}

	.other-month {
		color: #a1a1aa;
		cursor: not-allowed;
	}

	.selected {
		background-color: #007bff;
		color: #fff;
	}

	.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
