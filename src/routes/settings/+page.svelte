<script>
  export let data;
</script>

<form method='POST' action='/theme'>
  <input name='redirect' value={data.redirect} type='hidden'>
  <select name='theme'>
    <option value='light'>Light</option>
    <option value='dark'>Dark</option>
  </select>
  <button type='submit'>View</button>
</form>
