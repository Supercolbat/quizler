<svelte:head>
  <title>Quizler</title>
  <meta name='description' content='Privacy-friendly frontend for Quizlet' />
</svelte:head>

<header>
  <h1>Study with confidence,<br />not spyware.</h1>
  <p>
    <strong>Quizler</strong> allows you to study Quizlet flashcards in a 
    <strong>privacy-friendly</strong> environment.
  </p>
</header>

<form method='POST' action='/'>
  <input type='text' name='url' placeholder='https://quizlet.com/1234567890/example-url'>
  <button type='submit'>View</button>
</form>

<style>
  form > input {
    width: min(75%, 30em);
  }
</style>
