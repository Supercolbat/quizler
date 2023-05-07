<script>
  export let data;
</script>

<svelte:head>
	<title>Quizler</title>
	<meta name='description' content='Privacy and usability-focused frontend for Quizlet' />
</svelte:head>

<section class='details'>
  {#if data.breadcrumbs}
    <ul>
      {#each data.breadcrumbs as page}
        <li>{page.name}</li>
      {/each}
    </ul>
  {/if}

  <h1>{data.title}</h1>
  <h2>By {data.author}</h2>

  <section class='metadata'>
    {#if data.recent}
      <p>📈 {data.recent.numStudiers}

      {#if data.recent.time == 1}
        {#if data.recent.timeUnit == 'DAY'}
          studiers today
        {:else if data.recent.timeUnit == 'HOUR'}
          studying now
        {:else}
          {data.recent.timeUnit}
        {/if}
      {:else}
        studiers in the last {data.recent.time.toLowerCase()}s
      {/if}
      </p>
    {/if}

    {#if data.rating !== null}
      <p>⭐ {data.rating.average.toPrecision(2)} ({data.rating.count} reviews)</p>
    {/if}
  </section>
</section>

<!-- for debugging -->
{@html data.next_data}

<section class='cards'>
  {#each data.cards as card}
    <div class='card'>
      <div class='front'>
        <p><strong>{card.front.text}</strong></p>
      </div>
      <div class='back'>
        <p>{card.back.text}</p>
      </div>
    </div>
  {/each}
</section>

<section class='terms'>
  <h2>All the terms</h2>
  {#each data.cards as card}
    <div class='term'>
      <p><strong>{card.front.text}</strong></p>
      <p>{card.back.text}</p>
    </div>
  {/each}
</section>

<style lang="scss">
  section.details {
    margin-bottom: 2rem;

    h1 {
      margin: .5em 0;
    }
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  li:not(:first-child)::before {
    content: '/';
    padding: .5em;
  }

  section.metadata > * {
    display: inline-block;
    margin-top: 0.5rem;
  }

  section.cards {
    overflow-x: scroll;
    white-space: nowrap;
    scroll-snap-type: x proximity;
  }

  .card {
    display: inline-block;
    width: fit-content;
    width: min(100%, 40rem);
    height: 20rem;
    position: relative;
    perspective: 2000px;
    scroll-snap-align: center;

    margin-left: calc((100% - min(100%, 40rem)) / 2 + 1rem);

    &:last-child {
      margin-right: calc(100% - min(100%, 40rem) + 1rem);
    }

    &:not(:first-child)::before {
      content: '';
      display: block;
      width: 1rem;
    }

    &:hover > .front {
      transform: rotateY(180deg);
      background-color: #eee;
    }

    &:hover > .back {
      transform: rotateY(360deg);
      background-color: #fff;
    }
  }

  .front,
  .back {
    position: absolute;
    top: 0;

    width: 100%;
    height: 20rem;

    display: flex;
    justify-content: center;
    align-items: center;

    backface-visibility: hidden;

    border-radius: 8px;

    background-color: #FFF;
    border: 1px solid #aaa;

    transition: transform 1.0s ease, background-color 1.0s ease;
    overflow-y: scroll;

    p {
      white-space: break-spaces;
      padding: 1em;
    }
  }

  .back {
    transform: rotateY(180deg);
    background-color: #eee;
  }

  .terms {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .term {
    background-color: #fff;
    padding: 0 1rem;
    border: 1px solid #aaa;
    border-radius: 8px
  }
</style>
