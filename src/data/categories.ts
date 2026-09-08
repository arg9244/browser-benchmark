import { CategoryDefinition } from '../types';

export const categories: CategoryDefinition[] = [
  {
    id: 'js-core',
    name: 'JavaScript Core',
    description: 'Core JavaScript engine performance including algorithms, data structures, and language features',
    icon: '⚡',
    benchmarkSuite: 'JetStream 3.0',
    testNames: [
      'delta-blue', 'richards', 'navier-stokes', 'earley-boyer', 'Air',
      'crypto', 'splay', 'regexp-octane', 'Basic', 'hash-map',
      'cdjs', 'Box2D', 'ai-astar', 'lazy-collections'
    ],
  },
  {
    id: 'wasm',
    name: 'WebAssembly',
    description: 'WASM compilation and execution performance across various workloads',
    icon: '🔧',
    benchmarkSuite: 'JetStream 3.0',
    testNames: [
      'zlib-wasm', 'tsf-wasm', 'sqlite3-wasm', 'dotnet-interp-wasm',
      'dotnet-aot-wasm', '8bitbench-wasm', 'argon2-wasm', 'Kotlin-compose-wasm',
      'Dart-flute-todomvc-wasm', 'j2cl-box2d-wasm', 'richards-wasm',
      'transformersjs-bert-wasm', 'gbemu'
    ],
  },
  {
    id: 'graphics',
    name: 'Graphics & 3D',
    description: '3D rendering, raytracing, and graphics pipeline performance',
    icon: '🎮',
    benchmarkSuite: 'JetStream 3.0',
    testNames: [
      'raytrace', 'raytrace-public-class-fields', 'raytrace-private-class-fields',
      'Babylon', 'babylonjs-scene-es6', 'babylonjs-startup-es6', 'babylon-wtb',
      'threejs', 'gaussian-blur', 'segmentation'
    ],
  },
  {
    id: 'frameworks',
    name: 'Web Frameworks',
    description: 'Framework reactivity patterns and real-world web application performance',
    icon: '🌐',
    benchmarkSuite: 'JetStream 3.0',
    testNames: [
      'proxy-vue', 'proxy-mobx', 'mobx-startup', 'UniPoker',
      'web-ssr', 'FlightPlanner', 'pdfjs', 'prismjs-startup-es6',
      'jsdom-d3-startup'
    ],
  },
  {
    id: 'tooling',
    name: 'Tooling & Compilation',
    description: 'Build tools, parsers, minifiers, and developer tooling performance',
    icon: '🛠️',
    benchmarkSuite: 'JetStream 3.0',
    testNames: [
      'babel-wtb', 'babel-minify-wtb', 'prettier-wtb', 'postcss-wtb',
      'typescript-lib', 'espree-wtb', 'esprima-next-wtb', 'acorn-wtb',
      'chai-wtb', 'source-map-wtb', 'js-tokens', 'json-stringify-inspector',
      'json-parse-inspector', 'validatorjs', 'octane-code-load'
    ],
  },
  {
    id: 'async-realworld',
    name: 'Async & Data Processing',
    description: 'Asynchronous operations, data processing, and real-world application patterns',
    icon: '📊',
    benchmarkSuite: 'JetStream 3.0',
    testNames: [
      'doxbee-promise', 'doxbee-async', 'sync-fs', 'async-fs',
      'Sunspider', 'stanford-crypto-sha256', 'stanford-crypto-pbkdf2',
      'stanford-crypto-aes', 'bigint-noble-ed25519', 'bomb-workers',
      'multi-inspector-code-load', 'first-inspector-code-load'
    ],
  },
  {
    id: 'speedometer-frameworks',
    name: 'Framework DOM Operations',
    description: 'DOM manipulation performance across popular JavaScript frameworks (Speedometer 3.0)',
    icon: '🏗️',
    benchmarkSuite: 'Speedometer 3.0',
    testNames: [
      'TodoMVC-JavaScript-ES5', 'TodoMVC-JavaScript-ES6-Webpack-Complex-DOM',
      'TodoMVC-WebComponents', 'TodoMVC-React-Complex-DOM', 'TodoMVC-React-Redux',
      'TodoMVC-Backbone', 'TodoMVC-Angular-Complex-DOM', 'TodoMVC-Vue',
      'TodoMVC-jQuery', 'TodoMVC-Preact-Complex-DOM', 'TodoMVC-Svelte-Complex-DOM',
      'TodoMVC-Lit-Complex-DOM'
    ],
  },
  {
    id: 'speedometer-apps',
    name: 'Real-World Applications',
    description: 'Full application benchmarks including news sites, editors, charts, and dashboards (Speedometer 3.0)',
    icon: '📱',
    benchmarkSuite: 'Speedometer 3.0',
    testNames: [
      'NewsSite-Next', 'NewsSite-Nuxt', 'Editor-CodeMirror', 'Editor-TipTap',
      'Charts-observable-plot', 'Charts-chartjs', 'React-Stockcharts-SVG', 'Perf-Dashboard'
    ],
  },
];
