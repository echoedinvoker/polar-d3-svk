<script lang="ts">
  import { inputs } from "../../routes/inputs";
</script>

<div class="input-field">
  <input type="text" id="data" bind:value={$inputs.name} />
  <label class="active" for="data">Data</label>
</div>
<div class="input-field">
  <input type="number" id="update" bind:value={$inputs.value} />
  <label class="active" for="update">Update</label>
</div>
