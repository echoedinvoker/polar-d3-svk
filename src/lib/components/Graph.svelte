<script lang="ts">
  import { onMount } from "svelte";
  import { Polar } from "polar-d3";
  import { select } from "d3";
  import { data } from "../../routes/data";
  import { inputs } from "../../routes/inputs";
  import { polar } from "../../routes/polar";

  type Item = {
    name: string;
    value: number;
  };

  let svg: SVGSVGElement | null = null;
  let group: SVGGElement | null = null;
  let isPolarCreated = false;
  let svgWidth = 0;
  let svgHeight = 0;
  let groupTranslateX = 0;
  let groupTranslateY = 0;
  let propData: Item[] = [];
  $: if (group) {
    const groupSelection = select(group);
    polar.set(new Polar(groupSelection as any));
  }
  $: if ($polar && !isPolarCreated) {
    $polar.newConfig = {
      xOffSet: 200,
      yOffSet: -210,
      arcRange: [90, 180, 360],
      arcRadius: 130,
      radialLength: 150,
      eventHandlerHandler: (d: Item) => {
        inputs.set({ name: d.name, value: d.value });
      },
    };
    isPolarCreated = true;
  }
  $: if ($polar) {
    groupTranslateX =
      svgWidth / 2 + ($polar.config.xOffSet - $polar.config.radialLength);
    groupTranslateY =
      svgHeight / 2 - ($polar.config.radialLength + $polar.config.yOffSet);
  }
  $: if ($polar) {
    $polar.itemModel.new = propData;
  }
  data.subscribe((d) => {
    propData = d;
  });
  onMount(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        svgWidth = width;
        svgHeight = height;
      }
    });
    return () => observer.disconnect();
  });
</script>

<svg bind:this={svg} width="100%" height="100%" viewBox="0 0 400 400">
  <g
    bind:this={group}
    transform={`translate(${groupTranslateX},${groupTranslateY})`}
  ></g>
</svg>
