<script>
	import { onMount } from 'svelte';

	let currentYear, currentMonth;

	/**
	 * @typedef Day
	 * @type {object}
	 * @property {number} day - The day number.
	 * @property {boolean} current - Indicates if the day belongs to the current month.
	 */
	/** @type {Day[]} */
	let daysInMonth = [];
	/** @type {Date} */
	let chooseDate;

	// Get the number of days in a month
	function getDaysInMonth(year, month) {
		return new Date(year, month + 1, 0).getDate();
	}

	// Initialize the calendar for a specific year and month
	function initializeCalendar(year, month) {
		currentYear = year;
		currentMonth = month;

		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const lastDayOfMonth = getDaysInMonth(year, month);

		daysInMonth = [];

		if (firstDayOfMonth !== 0) {
			const prevMonthDays = getDaysInMonth(year, month - 1);
			for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
				daysInMonth.push({ day: i, current: false });
			}
		}

		for (let i = 1; i <= lastDayOfMonth; i++) {
			daysInMonth.push({ day: i, current: true });
		}

		const remainingDays = 42 - daysInMonth.length;
		for (let i = 1; i <= remainingDays; i++) {
			daysInMonth.push({ day: i, current: false });
		}
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

	function updateChooseDate() {
		console.log('chose date');
	}

	onMount(() => {
		const today = new Date();
		initializeCalendar(today.getFullYear(), today.getMonth());
	});
</script>

<div class="calendar">
	<div class="calendar-controls">
		<button aria-label="calender-before" onclick={previousMonth}>
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
				class="lucide-icon lucide lucide-chevron-left h-4 w-4"><path d="m15 18-6-6 6-6"></path></svg
			>
		</button>
		<div>{currentYear} - {currentMonth + 1}</div>
		<button aria-label="calendar-after" onclick={nextMonth}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide-icon lucide lucide-chevron-right h-4 w-4"><path d="m9 18 6-6-6-6"></path></svg
			>
		</button>
	</div>
	<div class="calendar-header">
		<div class="header-item">Lu</div>
		<div class="header-item">Ma</div>
		<div class="header-item">Me</div>
		<div class="header-item">Je</div>
		<div class="header-item">Ve</div>
		<div class="header-item">Sa</div>
		<div class="header-item">Di</div>
	</div>
	<div class="calendar-content">
		{#each daysInMonth as day}
			<button
				type="button"
				onclick={() => updateChooseDate()}
				class="day"
				class:current-month={day.current}
				class:other-month={!day.current}
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
		background-color: #000;
		color: #fff;
		border-radius: 10px;
		font-family:
			geist-sans,
			ui-sans-serif,
			system-ui,
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			Segoe UI Symbol,
			'Noto Color Emoji';
		font-feature-settings: normal;
		font-variation-settings: normal;
		border: solid 1px #333;
		font-family: 1px;
		/* width: 30%; */
		font-size: 14px;
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
</style>
