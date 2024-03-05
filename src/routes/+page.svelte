<script lang="ts">
  import { Polar } from "polar-d3";
  import { onMount } from "svelte";

  let polar: Polar | null = null;
  let name: string = "";
  let orders: number = 0;
  let config = JSON.stringify(
    {
      fields: {
        id: "name",
        name: "name",
        value: "orders",
      },
      selector: ".canvas",
      svg: { width: 600, height: 600 },
      margin: { top: 100, right: 20, bottom: 20, left: 100 },
      radial: {
        length: 300,
        strokeWidth: 1,
        text: {
          size: 16,
          family: "Arial",
          color: "black",
          strokeDasharray: "5,5",
        },
      },
      x: {
        text: {
          size: 16,
          family: "Arial",
          color: "black",
        },
      },
      arc: {
        radius: 250,
        range: [270, 330, 360],
        strokeWidth: 0.5,
        text: {
          size: 16,
          family: "Arial",
          color: "black",
        },
      },
      eventHandler: {
        event: "click",
        handler: (d: any) => console.log(d),
      },
      animation: {
        duration: 750,
      },
    },
    null,
    2,
  );

  onMount(() => {
    polar = new Polar(JSON.parse(config));
  });
</script>

<div class="f-col">
  <div class="col">
    <input type="text" bind:value={name} />
    <input type="number" bind:value={orders} />
    <button
      on:click={() => {
        if (polar && name in polar.itemModel.getNames) {
          polar.update([{ type: "updated", name: name, orders: orders }]);
          return;
        }
        polar && polar.update([{ type: "added", name: name, orders: orders }]);
      }}>ADD/UPDATE</button
    >
    <button
      on:click={() => {
        polar && polar.update([{ type: "removed", name: name }]);
      }}>DELETE</button
    >
  </div>
  <div class="col">
    <div class="f-row">
      <div class="row">
        <button
          on:click={() => {
            const canvas = document.querySelector(JSON.parse(config).selector);
            canvas && canvas.innerHTML && (canvas.innerHTML = "");
            polar = new Polar(JSON.parse(config));
          }}>UPDATE</button
        >
        <br />
        <br />
        <textarea
          bind:value={config}
          style="width: 100%; height: 100%;"
          rows="50"
        ></textarea>
      </div>
      <div class="row">
        <div class="canvas"></div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .f-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .f-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .row {
    width: 50%;
  }
</style>
