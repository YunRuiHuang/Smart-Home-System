<script setup></script>

<template>
  <div class="page">
      <!-- TODO -->
      <!-- play music button and music status, need an larger button and clear view -->
      <p id="musicInfo">{{ musicInfo }}</p>
      <button @click="toggleMusic">turn on/off music</button><spam>{{ musicState }}</spam>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const musicInfo = ref('Fetching music information...');
  const musicState = ref('Fetching music state...');

  function toggleMusic() {
    fetch('http://10.0.0.152:3000/routers/music/state', { method: 'PUT' })
      .then(response => {
        if (response.ok) {
          console.log('PUT request successful');
          fetchMusicInfo();
        } else {
          console.error('Error in PUT request');
        }
      });
  }

  function fetchMusicInfo() {
    fetch('http://10.0.0.152:3000/routers/music/playing')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        musicInfo.value = 'Currently playing: ' + data.playing;
      })
      .catch(error => {
        console.error('Error in GET request', error);
      });

      fetch('http://10.0.0.152:3000/routers/music/state')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        musicState.value = 'Currently status: ' + data.state;
      })
      .catch(error => {
        console.error('Error in GET request', error);
      });
  }

  fetchMusicInfo();
</script>

<style scoped>

</style>