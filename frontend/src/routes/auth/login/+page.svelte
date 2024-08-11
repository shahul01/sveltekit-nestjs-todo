<script>
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";


  let email = '';
  let password=  '';

  async function handleLogin() {
    try {

      const login = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
      });

      // TODO: if failed toast to tell user if they verified their email

      const resLogin = await login.json();
      console.log(`resLogin: `, resLogin);

      // console.log('Successfully logged in. Redirecting...');

      email = '';
      password = '';

      const isSuccessfullyLoggedIn = (/success/i).test(resLogin.message);
      console.log(`isSuccessfullyLoggedIn: `, isSuccessfullyLoggedIn);
      if ( isSuccessfullyLoggedIn ) {
        // toast('Redirecting...');
        await new Promise((res) => setTimeout(res, 2000) );
        goto('/');
      };

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
      Login
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