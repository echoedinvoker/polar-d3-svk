<script lang="ts">
  import { data } from "../../routes/data";
  import { inputs } from "../../routes/inputs";
</script>

<div class="row center center-on-small">
  {#if $inputs.name && $inputs.value}
    <div class="col s4">
      {#if $data.map((d) => d.name).includes($inputs.name)}
        <button
          on:click={() => {
            data.update((d) => {
              const result = d.map((i) => {
                if (i.name === $inputs.name && $inputs.value) {
                  return { name: i.name, value: $inputs.value };
                }
                return i;
              });
              return result;
            });
          }}
          class="waves-effect waves-light btn">Update</button
        >
      {:else}
        <button
          on:click={() => {
            data.update((d) => {
              if ($inputs.value) {
                return [...d, { name: $inputs.name, value: $inputs.value }];
              }
              return d;
            });
          }}
          class="waves-effect waves-light btn">Add</button
        >
      {/if}
    </div>
    {#if $data.map((d) => d.name).includes($inputs.name)}
      <div class="col s4">
        <button
          on:click={() => {
            data.update((d) => {
              return d.filter((i) => i.name !== $inputs.name);
            });
          }}
          class="waves-effect waves-light btn">Remove</button
        >
      </div>
    {/if}
  {/if}
  <div
    class="col {$data.map((d) => d.name).includes($inputs.name) ? 's4' : 's6'}"
  >
    <button
      class="waves-effect waves-light btn"
      on:click={() => inputs.set({ name: "", value: null })}>Reset</button
    >
  </div>
</div>

<style>
  @media (max-width: 1500px) {
    .row.center-on-small {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%; /* 確保在小螢幕上佔滿父元素寬度 */
    }

    .row.row.center-on-small .col {
      width: 100%; /* 確保在小螢幕上佔滿父元素寬度 */
      margin-bottom: 10px; /* 在按鈕之間添加間隔 */
      margin-left: 18px;
    }

    .row.center-on-small .btn {
      width: 100%; /* 使按鈕寬度匹配父元素寬度 */
    }

    .row.center-on-small .col:last-child {
      margin-bottom: 0; /* 移除最後一個按鈕的間隔，保持美觀 */
    }
  }
</style>
