<script>
  import { navigating } from '$app/stores';
	import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import '../app.css';

  $: if ($navigating) checkToken();

  async function checkToken() {
    const isToken = !!localStorage.getItem('token');
    authStore.set({ ...$authStore, isAuth: isToken });
  };

  function handleLogout() {
    localStorage.removeItem('token');
    checkToken();
  };

  onMount(async () => {
    checkToken();
  });

</script>

<div class="app">
  <main>
    <div class='navbar'>
      {#if $authStore.isAuth}
        <button type='button' on:click={handleLogout}>Logout</button>
      {:else}
        <a href='/auth/login'>Login</a>
      {/if}
    </div>

    <slot />
  </main>
</div>

