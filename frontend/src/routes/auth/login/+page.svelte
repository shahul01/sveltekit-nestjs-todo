<script>
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { sleep } from "$lib/utils";


  let email = '';
  let password=  '';

  async function handleLogin() {
    try {

      const login = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
      });

      // TODO: if failed / redirected from register page
      //   toast to tell user if they verified their email

      const resLogin = await login.json();
      console.log(`resLogin: `, resLogin);

      const isSuccessfullyLoggedIn = (/success/i).test(resLogin.message);

      if ( isSuccessfullyLoggedIn ) {
        localStorage.setItem('token', resLogin.accessToken);

        console.log('Successfully logged in. Redirecting...');
        // toast('Successfully logged in. Redirecting...');
        email = '';
        password = '';
        await sleep(600);
        goto('/');
      };
      // TODO: else throw error

    } catch (error) {
      console.error(error);
    };

  };


</script>


<div class="form-container">
  <form on:submit|preventDefault={handleLogin}>

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
      autocomplete="current-password"
      required
    />
    <button
      type="submit"
      >
      Login
    </button>
  </form>
  <p class='register-note'>
    New user?
    <a href="/auth/register">Register</a>
    here
  </p>
</div>

<style>
  .form-container {
    display: flex;
    flex-direction: column;
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

  p.register-note {
    font-size: 0.8rem;
  }
</style>