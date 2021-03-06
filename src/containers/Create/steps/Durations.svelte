<script lang="ts">
  import { fly } from 'svelte/transition';
  import classnames from 'classnames';
  import Button from '../../../components/Form/Button.svelte';
  import { padNum } from '../../../utils/helpers';
  import {
    getMinsFromMillis,
    getMillisFromMins,
    getHoursAndMinsFromMillis,
    getMillisFromHoursAndMins,
  } from '../../../utils/timeUnits';

  export let handleCreate: () => void;
  export let goToStep: (step: string) => void;
  export let workDuration: number = getMillisFromMins(25);
  export let breakDuration: number = getMillisFromMins(5);
  let valuesInitialized = false;

  const assignWorkHoursAndMins = (duration: number) => {
    const { hrs, mins } = getHoursAndMinsFromMillis(duration);
    workHours = padNum(hrs);
    workMins = padNum(mins);
  };

  const assignBreakHoursAndMins = (duration: number) => {
    const { hrs, mins } = getHoursAndMinsFromMillis(duration);
    breakHours = padNum(hrs);
    breakMins = padNum(mins);
  };

  // duration input form values
  // values are 0 padded ('01:23' instead of '1:23')
  let workHours: string;
  let workMins: string;
  let breakHours: string;
  let breakMins: string;
  const initPaddedDisplayValues = () => {
    assignWorkHoursAndMins(workDuration);
    assignBreakHoursAndMins(breakDuration);
  };

  initPaddedDisplayValues();

  const getRecommendedBreakDuration = (workDuration: number): number => {
    const workMins = getMinsFromMillis(workDuration);
    let recommendedBreakInMins = 0;
    if (workMins < 26) {
      recommendedBreakInMins = 5;
    } else if (workMins < 50) {
      recommendedBreakInMins = 8;
    } else if (workMins < 90) {
      recommendedBreakInMins = 10;
    } else {
      recommendedBreakInMins = 15;
    }
    return getMillisFromMins(recommendedBreakInMins);
  };

  // prop form values are updated/converted from the padded input values
  $: {
    if (valuesInitialized) {
      const updated = getMillisFromHoursAndMins({
        hrs: Number(workHours),
        mins: Number(workMins),
      });
      workDuration = updated;
      const recommendedBreak = getRecommendedBreakDuration(updated);
      assignBreakHoursAndMins(recommendedBreak);
    } else {
      valuesInitialized = true;
    }
  }
  $: {
    breakDuration = getMillisFromHoursAndMins({
      hrs: Number(breakHours),
      mins: Number(breakMins),
    });
  }

  // determines which duration inputs and section to emphasize as active
  let inputFocused: string = 'work';

  // button actions
  const handleTextButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    goToStep('text');
  };

  const handleSubmitButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    handleCreate();
  };

  $: shouldShowButtons = Boolean(workDuration) && Boolean(breakDuration);
</script>

<style>
  .container {
    width: 100%;
    height: 260px;
  }

  .durations-container {
    margin: 0 0 1rem;
    display: flex;
    flex-flow: center;
    justify-content: center;
    align-items: center;
  }

  .duration-outer-container {
    display: flex;
    flex-flow: column;
    align-items: center;
    opacity: 0.35;
    transition: opacity 0.125s ease-in-out;
  }

  .duration-outer-container--emphasis {
    opacity: 1;
  }

  .duration-outer-container:first-child {
    margin-right: 2rem;
  }

  .duration-title {
    font-size: 2.4rem;
    margin: 2rem 0 1rem;
    color: #333;
  }

  .break-title {
    color: #555;
  }

  .duration-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 1rem;
    position: relative;
  }

  .duration-container::after {
    display: block;
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    content: '';
    background: #444;
    opacity: 0;
    transform-origin: 50%;
    transform: scaleX(0);
    transition: all 0.125s ease-in-out;
  }

  .duration-container--focused::after {
    opacity: 1;
    transform: scaleX(1);
  }

  .duration {
    padding: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .work-duration--empty {
    opacity: 0.15;
  }

  .duration-input {
    width: 3.6rem;
    font-size: 2.4rem;
    text-align: center;
    outline: 0;
    border: 0;
    padding: 0;
    margin: 0;
  }

  .duration-label-text {
    line-height: 1.8rem;
  }

  .duration-input::-webkit-outer-spin-button,
  .duration-input::-webkit-inner-spin-button {
    display: none;
    margin: 0;
  }

  .duration-colon {
    font-size: 2rem;
    line-height: 2.8rem;
  }

  .buttons-container {
    margin: 2rem 0 0;
    display: flex;
    justify-content: center;
  }

  .container :global(.create-form-button) {
    padding: 0.5rem 1rem;
    border-radius: 1.2rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .container :global(.get-started-button) {
    margin-left: 0.5rem;
    background: #444;
    border: 2px solid #444;
    color: #fff;
  }

  .container :global(.get-started-button):hover,
  .container :global(.get-started-button):focus {
    background: #fff;
    color: #444;
  }

  .container :global(.text-button) {
    background: #fff;
    color: #444;
    border: 2px solid transparent;
  }

  .container :global(.text-button):hover,
  .container :global(.text-button):focus {
    border: 2px solid #444;
  }
</style>

<div class="container">
  <div class="durations-container">
    <div
      class={classnames('duration-outer-container', {
        'duration-outer-container--emphasis':
          !inputFocused || inputFocused === 'work',
      })}>
      <h4 class="duration-title">focus</h4>
      <div
        class={classnames('duration-container', {
          'duration-container--focused': inputFocused === 'work',
        })}>
        <label
          class={classnames('duration', 'work-duration', {
            'work-duration--empty': !Number(workHours),
          })}>
          <div class="duration-label-text">hrs</div>
          <input
            id="workHours"
            class="duration-input work-duration-input"
            type="number"
            bind:value={workHours}
            on:focus={() => {
              inputFocused = 'work';
            }}
            on:blur={() => {
              inputFocused = null;
              const updatedWorkHours = workHours === null ? 0 : Number(workHours);
              workHours = padNum(updatedWorkHours);
            }} />
        </label>
        <span class="duration-colon">:</span>
        <label class="duration work-duration">
          <div class="duration-label-text">mins</div>
          <input
            id="workMins"
            class="duration-input work-duration-input"
            type="number"
            bind:value={workMins}
            on:focus={() => {
              inputFocused = 'work';
            }}
            on:blur={() => {
              inputFocused = null;
              let updatedWorkMins = 0;
              if (workMins === null) {
                updatedWorkMins = 0;
              } else {
                if (Number(workMins) >= 60) {
                  workHours = padNum(Number(workHours) + Math.floor(Number(workMins) / 60));
                }
                updatedWorkMins = Number(workMins) % 60;
              }
              workMins = padNum(updatedWorkMins);
            }}
            autofocus />
        </label>
      </div>
    </div>
    <div
      class={classnames('duration-outer-container', {
        'duration-outer-container--emphasis':
          !inputFocused || inputFocused === 'break',
      })}>
      <h4 class="duration-title break-title">break</h4>
      <div
        class={classnames('duration-container', {
          'duration-container--focused': inputFocused === 'break',
        })}>
        <label
          class={classnames('duration', 'break-duration', {
            'work-duration--empty': !Number(breakHours),
          })}>
          <div class="duration-label-text">hrs</div>
          <input
            id="breakHours"
            class="duration-input break-duration-input"
            type="number"
            bind:value={breakHours}
            on:focus={() => {
              inputFocused = 'break';
            }}
            on:blur={() => {
              inputFocused = null;
              const updatedBreakHours = breakHours === null ? 0 : Number(breakHours);
              breakHours = padNum(updatedBreakHours);
            }} />
        </label>
        <span class="duration-colon">:</span>
        <label class="duration break-duration">
          <div class="duration-label-text">mins</div>
          <input
            id="breakMins"
            class="duration-input break-duration-input"
            type="number"
            bind:value={breakMins}
            on:focus={() => {
              inputFocused = 'break';
            }}
            on:blur={() => {
              inputFocused = null;
              let updatedBreakMins = 0;
              if (breakMins === null) {
                updatedBreakMins = 0;
              } else {
                if (Number(breakMins) >= 60) {
                  breakHours = padNum(Number(breakHours) + Math.floor(Number(breakMins) / 60));
                }
                updatedBreakMins = Number(breakMins) % 60;
              }
              breakMins = padNum(updatedBreakMins);
            }} />
        </label>
      </div>
    </div>
  </div>
  {#if shouldShowButtons}
    <div
      class="buttons-container"
      transition:fly|local={{ y: 5, duration: 250 }}>
      <Button
        className="create-form-button text-button"
        handleButtonClick={handleTextButtonClick}
        children="Edit text" />
      <Button
        className="create-form-button get-started-button"
        handleButtonClick={handleSubmitButtonClick}
        children="Start timer" />
    </div>
  {/if}
</div>
