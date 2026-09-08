export interface BenchmarkTest {
  name: string;
  score: number;
  first: number;
  worst: number | null;
  average: number | null;
}

export interface SpeedometerTest {
  name: string;
  mean: number;
  runs: number[];
}

export interface BenchmarkSuite {
  name: string;
  overall_score: number;
  tests: (BenchmarkTest | SpeedometerTest)[];
}

export interface BrowserData {
  browser_short_name: string;
  browser_full_name: string;
  benchmarks: BenchmarkSuite[];
}

export interface Manifest {
  browsers: string[];
}

export interface CategoryDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  benchmarkSuite: string;
  testNames: string[];
}

export interface BrowserAnalysis {
  shortName: string;
  fullName: string;
  description: string;
  pros: string[];
  cons: string[];
  recommendation: string;
  bestFor: string[];
}
