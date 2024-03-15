<script lang="ts">
  import { polar } from "../../routes/polar";

  function setPolarConfig(e: Event, key: string) {
    if (
      e.target &&
      "value" in e.target &&
      typeof e.target.value === "string" &&
      $polar
    ) {
      if (key === "arcRange") {
        const newConfig = { [key]: e.target.value.split(",").map(Number) };
        if (
          newConfig[key].length !== 3 ||
          !newConfig[key].every(Number) ||
          newConfig[key][0] >= newConfig[key][1] ||
          newConfig[key][1] >= newConfig[key][2]
        ) {
          return;
        }
        $polar.newConfig = newConfig;
        return;
      }
      const newConfig = { [key]: parseInt(e.target.value) };
      $polar.newConfig = newConfig;
    }
  }
</script>

{#if $polar}
  <div class="input-field">
    <input
      type="number"
      id="n"
      on:change={(e) => setPolarConfig(e, "radialLength")}
      value={$polar.config.radialLength}
    />
    <label for="n">Radial Length</label>
  </div>
  <div class="input-field">
    <input
      type="number"
      id="r"
      on:change={(e) => setPolarConfig(e, "arcRadius")}
      value={$polar.config.arcRadius}
    />
    <label for="r">Arc Radius</label>
  </div>
  <div class="input-field">
    <input
      type="text"
      id="a"
      on:change={(e) => setPolarConfig(e, "arcRange")}
      value={$polar.config.arcRange}
    />
    <label for="a">Angle</label>
  </div>
{/if}
