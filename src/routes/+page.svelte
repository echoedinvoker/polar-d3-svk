<script lang="ts">
  import { Polar } from "polar-d3";
  import { onMount } from "svelte";

  let polar: Polar | null = null;
  let name: string = "";
  let orders: number = 0;
  let config: string = "";
  let dataEl: HTMLTextAreaElement | null = null;
  let value: { name: string; value: number }[] = [];

  function save() {
    value = JSON.parse(dataEl?.value || "[]");
    polar.itemModel.new = value;
    value = Array.from(polar.itemModel.new);
  }
  function addAndUpdate() {
    if (polar && name in polar.itemModel.getNames) {
      polar.update([{ type: "updated", name: name, orders: orders }]);
      return;
    } else {
      polar && polar.update([{ type: "added", name: name, orders: orders }]);
    }
    value = Array.from(polar.itemModel.new);
  }
  function remove() {
    polar && polar.update([{ type: "removed", name: name }]);
    value = Array.from(polar.itemModel.new);
  }
  function updateConfig() {
    const canvas = document.querySelector(JSON.parse(config).selector);
    canvas && canvas.innerHTML && (canvas.innerHTML = "");
    polar?.changeConfig(JSON.parse(config));
  }

  onMount(() => {
    const initConfig = {
      fieldsId: "name",
      fieldsName: "name",
      fieldsValue: "orders",
      selector: ".canvas",
      svgWidth: 600,
      svgHeight: 600,
      marginTop: 100,
      marginRight: 20,
      marginBottom: 20,
      marginLeft: 100,
      radialLength: 300,
      radialStrokeWidth: 1,
      radialTextSize: 16,
      radialTextFamily: "Arial",
      radialTextColor: "black",
      radialTextStrokeDasharray: "5,5",
      xTextSize: 16,
      xTextFamily: "Arial",
      xTextColor: "black",
      arcRadius: 250,
      arcRange: [270, 330, 360],
      arcStrokeWidth: 0.5,
      arcFillOpacity: 0.8,
      arcTextSize: 16,
      arcTextFamily: "Arial",
      arcTextColor: "black",
      eventHandlerEvent: "click",
      eventHandlerHandler: (d: any) => {
        polar?.update([{ type: "removed", name: d.name }]);
        value = Array.from(polar.itemModel.new);
      },
      animationDuration: 750,
    };
    config = JSON.stringify(initConfig, null, 2);
    polar = new Polar(initConfig);
    polar.itemModel.new = [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
      { name: "C", value: 30 },
    ];
    value = Array.from(polar.itemModel.new);
  });
</script>

<div class="f-col">
  <div class="col">
    <div class="f-row">
      <div class="row">
        <textarea
          on:blur={updateConfig}
          bind:value={config}
          style="width: 100%; height: 100%;"
          rows="40"
        ></textarea>
      </div>
      <div class="row">
        <div class="data">
          <div class="f-col">
            <div class="col">
              <textarea
                on:blur={save}
                bind:this={dataEl}
                value={JSON.stringify(value, null, 2)}
                rows="40"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="row last">
        <div class="f-col">
          <div class="col">
            <input type="text" bind:value={name} />
            <input type="number" bind:value={orders} />
            <button on:click={addAndUpdate}>ADD/UPDATE</button>
            <button on:click={remove}>DELETE</button>
          </div>
          <div class="col">
            <div class="canvas"></div>
          </div>
        </div>
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
    align-items: center;
    gap: 40px;
  }
  .row {
    width: 50%;
  }
  input {
    width: 100px;
  }
  .last {
    margin-left: 10px;
  }
</style>
