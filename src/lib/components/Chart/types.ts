import type { Readable } from "svelte/store";

export type LayerCakeContext = {
  data: Readable<[number, number][]>;
  xGet: Readable<() => number>;
  yGet: Readable<() => number>;
  yScale: Readable<(t: number) => number>
}
