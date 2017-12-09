<template>
  <div class="x-timeline">
    <div v-for="(event, index) in events" class="x-timeline-event">
      <div class="x-timeline-content">{{ event.content }}</div>
      <div class="x-timeline-time">{{ event.time }}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'x-timeline',
    props: ['value', 'events']
  }
</script>
<style>
  .x-timeline {
    background-color: #fff;
    padding: 0.5333rem 0.59rem;
  }
  .x-timeline-event {
    position: relative;
    padding-left: 0.45rem;
    padding-bottom: 0.5333rem;
    border-left: 1px solid #cccccc;
    color: #9b9b9b;
  }
  .x-timeline-event::after {
    content: '';
    position: absolute;
    width: 0.24rem;
    height: 0.24rem;
    top: 0;
    left: -0.14rem;
    background-color: #cccccc;
    border-radius: 100%;
  }
  .x-timeline-event:first-child {
    color: #F5A623;
  }
  .x-timeline-event:first-child::after {
    width: 0.35rem;
    height: 0.35rem;
    border: 0.05rem solid #FFDA4B;
    background-color: #F5AB23;
    left: -0.18rem;
  }
  .x-timeline-event:last-child {
    border: none;
  }
  .x-timeline-content {
    line-height: 16px;
    font-size: 12px;
    margin-bottom: 3px;
  }
  .x-timeline-time {
    line-height: 14px;
    font-size: 10px;
  }
</style>
