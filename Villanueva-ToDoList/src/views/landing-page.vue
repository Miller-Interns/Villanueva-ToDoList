<template>
  <div class="landing-container">
    <div class="landing-content">
      <h1 class="trainee-name">Lance Villanueva</h1>
      <p class="start-date">Exercise started on: November 24, 2025</p>
      <button class="go-to-app-button" @click="goToApp">Go to app</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const goToApp = () => {
  router.push('/app');
};
</script>

<style scoped>
.landing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.landing-content {
  text-align: center;
  color: white;
  padding: 2rem;
}

.trainee-name {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.start-date {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.go-to-app-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.go-to-app-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.go-to-app-button:active {
  transform: translateY(0);
}
</style>
