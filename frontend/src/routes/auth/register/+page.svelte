<script>
	import { base } from '$app/paths';

  let email = '';
  let password = '';

  async function handleRegister() {
    try {

      // TODO: if (!valid) return;
      const register = await fetch(`${base}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
      });
      const resRegister = await register.json();
      console.log(`resRegister: `, resRegister);

      const isSuccessfullyRegistered = (/success/i).test(resRegister.message);
      if (isSuccessfullyRegistered) {
        console.log('Successfully registered user.');

        email = '';
        password = '';
      };
      // TODO: else throw error;

    } catch (error) {
      console.error(error);
    };

  };

</script>

<div class="form-container">
  <form on:submit|preventDefault={handleRegister}>
    <input
      type="email"
      bind:value={email}
      placeholder="Email"
      autocomplete="email"
      required
    />
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      autocomplete="new-password"
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
