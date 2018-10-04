<template>
  <div class="f-left w-100pct chat-container">
    <div class="chat-header">
      #{{id}}: {{name}}
    </div>
    <div class="chat-body" ref="conversation">
      <div v-for="(m, i) in messages" :key="i">
        <div class="message-left" v-if="m.sender === 'user'">
          <img :src="thread.img">
          <span>{{ m.message }}</span>
        </div>
        <div class="message-right" v-else>
          <img src="https://vignette.wikia.nocookie.net/line/images/1/10/2015-cony.png/revision/latest?cb=20150806042102">
          <span :class="{
            'cl-red': m.color === 'red',
            'cl-blue': m.color === 'blue',
            'cl-green': m.color === 'green',
          }">
            {{ m.message }}
          </span>
        </div>
      </div>
    </div>
    <div class="chat-type-box">
      <input v-model="inputMessageBox"
      type="text"
      class="type-box"
      placeholder="Say hi ..."
      @keyup.enter="sendMessage">
    </div>
  </div>
</template>

<script>
import channels from '@/constants/channels';

export default {
  name: 'Chat',
  data() {
    return {
      thread: { img: 'https://vignette.wikia.nocookie.net/line/images/b/b7/1511.png/revision/latest?cb=20150809133444' },
      name: 'Brown',
      id: 70456,
      messages: [
        { sender: 'user', message: 'Hello :)' },
        { sender: 'user', message: 'How are you ?' },
      ],
      inputMessageBox: '',
    };
  },
  created() {
    this.pushMessagesSubscriber = this.$pubsub.subscribe(
      channels.CHANGE_MESSAGE_COLOR,
      this.changeColor,
    );
  },
  methods: {
    sendMessage() {
      if (!this.inputMessageBox) return;
      const payload = { sender: 'admin', message: this.inputMessageBox };
      this.messages.push(payload);
      this.inputMessageBox = '';
      this.$nextTick(() => {
        this.$refs.conversation.scrollTop = this.$refs.conversation.scrollHeight;
      });
      this.$pubsub.publish(channels.PUSH_MESSAGE, payload);
    },
    changeColor(channel, payload) {
      this.$set(this.messages, payload.index, {
        ...this.messages[payload.index],
        color: payload.color,
      });
    },
  },
};
</script>

<style scoped>
.chat-container {
  border-right: 1px solid #ccc;
  height: 100vh;
}
.chat-header {
  float: left;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, .10);
  height: 60px;
  line-height: 60px;
}
.chat-body {
  float: left;
  width: 100%;
  height: calc(100vh - 60px - 60px);
  overflow: scroll;
}
.chat-type-box {
  float: left;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, .10);
  height: 60px;
  line-height: 60px;
}
.type-box {
  float: left;
  width: 100%;
  height: 100%;
  border: 0;
  padding-left: 20px;
  font-size: 16px;
  outline: none;
}
.message-left {
  float: left;
  width: 100%;
  text-align: left;
  margin: 10px 0;
}
.message-left img {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin: 0 10px;
}
.message-left span {
  float: left;
  line-height: 60px;
}
.message-right {
  float: right;
  width: 100%;
  text-align: right;
  margin: 10px 0;
}
.message-right img {
  float: right;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin: 0 10px;
}
.message-right span {
  float: right;
  line-height: 60px;
}
.cl-red {
  color: red;
}
</style>
