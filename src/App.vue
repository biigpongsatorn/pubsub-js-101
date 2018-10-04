<template>
  <div id="app">
    <div class="f-left w-34pct">
      <Chat/>
    </div>
    <div class="f-left w-33pct">
      <Widget/>
    </div>
    <div class="f-left w-33pct top-level-logs-container">
      <div class="f-left w-100pct pd-15px">
        <div>
          TOP LEVEL LOGS
        </div>
        <ul>
          <li v-for="(l, i) in topLevelLogs" :key="i">
            <b>{{ l.channel }}</b>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from '@/components/Chat';
import Widget from '@/components/Widget';

export default {
  name: 'App',
  data() {
    return {
      topLevelLogs: [],
    };
  },
  created() {
    this.pushMessagesSubscriber = this.$pubsub.subscribe(
      'MESSAGE',
      this.topLevelMessage,
    );
  },
  methods: {
    topLevelMessage(channel, payload) {
      this.topLevelLogs.push({
        channel,
        payload,
      });
    },
  },
  components: {
    Chat,
    Widget,
  },
};
</script>

<style>
.top-level-logs-container {
  height: 100vh;
}
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
