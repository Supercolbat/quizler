<script>
  import './styles.scss';
</script>

<div class="app">
  <nav>
    <h1>Quizler</h1>
  </nav>
  
	<main>
		<slot />
	</main>

  <footer>
    <p>read the <a href="#">source code</a></p>
  </footer>
</div>

<style>
  .app {
    min-height: 100vh;
    min-height: 100dvh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  nav,
  main,
  footer {
    padding: 1rem;
  }

  h1 {
    margin: 0;
  }
</style>
