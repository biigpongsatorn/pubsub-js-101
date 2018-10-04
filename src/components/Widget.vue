<template>
  <div class="f-left w-100pct widget-container">
    <div class="f-left w-100pct pd-15px">
      Logs
    </div>
    <div class="f-left w-100pct">
      <button class="pd-15px cs-pointer bd-rd-5px" @click="unsubscribe">
        Unsubscribe
      </button>
    </div>
    <div class="f-left w-100pct pd-15px">
      <div v-for="(l, index) in logs" :key="index"
      class="f-left w-100pct pd-10px msg-item bd-rd-5px">
        <div class="mg-bt-10px">
          {{ l }}
        </div>
        <div>
          <span class="item-color-btn"
          style="background-color: red;"
          @click="changeColor('red', l, index)"/>
          <span class="item-color-btn"
          style="background-color: green;"
          @click="changeColor('green', l, index)"/>
          <span class="item-color-btn"
          style="background-color: blue;"
          @click="changeColor('blue', l, index)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import channels from '@/constants/channels';

export default {
  name: 'Widget',
  data() {
    return {
      pushMessagesSubscriber: null,
      logs: [],
    };
  },
  created() {
    this.pushMessagesSubscriber = this.$pubsub.subscribe(
      channels.PUSH_MESSAGE,
      this.messagePushed,
    );
  },
  methods: {
    messagePushed(channel, payload) {
      this.logs.push(payload);
    },
    unsubscribe() {
      this.$pubsub.unsubscribe(this.pushMessagesSubscriber);
    },
    changeColor(color, msg, index) {
      const payload = {
        color,
        msg,
        index: index + 2,
      };
      this.$pubsub.publish(channels.CHANGE_MESSAGE_COLOR, payload);
    },
  },
};
</script>

<style scoped>
.widget-container {
  border-right: 1px solid #ccc;
  height: 100vh;
}
.msg-item {
  border: 1px solid #ccc;
  margin-bottom: 5px;
}
.item-color-btn {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  display: inline-block;
}
</style>
