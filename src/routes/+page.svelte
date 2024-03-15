<script>
  import {
    Graph,
    Configurations,
    Controller,
    DataInput,
  } from "$lib/components";
</script>

<div class="container section">
  <div class="row">
    <div class="col s4">
      <div class="card">
        <div class="card-content">
          <span class="card-title">Configurations</span>
          <Configurations />
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <span class="card-title">Data Input</span>
          <DataInput />
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <span class="card-title center">Controls</span>
          <Controller />
        </div>
      </div>
    </div>
    <div class="col s8">
      <div class="card">
        <div class="card-content">
          <span class="card-title center">Polar Graph</span>
          <div id="polar-graph">
            <Graph />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
