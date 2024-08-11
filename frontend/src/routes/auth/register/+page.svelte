<script>
	import { base } from '$app/paths';

  let email = '';
  let password = '';

  async function handleRegister() {
    // if (!valid) return;

    const register = await fetch(`${base}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password})
    });
    const resRegister = await register.json();
    console.log(`resRegister: `, resRegister);

    return console.log('Successfully registered user.');
  };

</script>

<div class="form-container">
  <form on:submit|preventDefault={handleRegister}>
    <input
      type="email"
      bind:value={email}
      placeholder="Email"
      required
    />
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      required
    />
    <button
      type="submit"
      >
      Register
    </button>

  </form>
</div>

<style>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80dvh;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 12rem;
  }
</style>
