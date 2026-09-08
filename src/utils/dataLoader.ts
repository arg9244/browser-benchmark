import { BrowserData, Manifest, BenchmarkTest, SpeedometerTest } from '../types';

const LOCAL_DATA_URL = './data';
const GITHUB_DATA_URL = 'https://raw.githubusercontent.com/arg9244/temp/main';

let resolvedBaseUrl: string | null = null;

async function getDataBaseUrl(): Promise<string> {
  if (resolvedBaseUrl) return resolvedBaseUrl;
  
  // Try local first
  try {
    const res = await fetch(`${LOCAL_DATA_URL}/manifest.json`, { method: 'HEAD' });
    if (res.ok) {
      resolvedBaseUrl = LOCAL_DATA_URL;
      return resolvedBaseUrl;
    }
  } catch {
    // Local not available, fall back to GitHub
  }
  
  resolvedBaseUrl = GITHUB_DATA_URL;
  return resolvedBaseUrl;
}

export async function loadManifest(): Promise<Manifest> {
  const baseUrl = await getDataBaseUrl();
  const res = await fetch(`${baseUrl}/manifest.json`);
  if (!res.ok) throw new Error('Failed to load manifest');
  return res.json();
}

export async function loadBrowserData(browserName: string): Promise<BrowserData> {
  const baseUrl = await getDataBaseUrl();
  const res = await fetch(`${baseUrl}/${browserName}.json`);
  if (!res.ok) throw new Error(`Failed to load ${browserName}`);
  return res.json();
}

export async function loadAllBrowserData(): Promise<BrowserData[]> {
  const manifest = await loadManifest();
  const results = await Promise.all(
    manifest.browsers.map(name => loadBrowserData(name))
  );
  return results;
}

export function isJetStreamTest(test: BenchmarkTest | SpeedometerTest): test is BenchmarkTest {
  return 'score' in test;
}

export function isSpeedometerTest(test: BenchmarkTest | SpeedometerTest): test is SpeedometerTest {
  return 'mean' in test;
}

export function getTestScore(test: BenchmarkTest | SpeedometerTest): number {
  if (isJetStreamTest(test)) return test.score;
  return test.mean;
}

export function getBenchmarkSuite(data: BrowserData, suiteName: string) {
  return data.benchmarks.find(b => b.name === suiteName);
}

export function getOverallScore(data: BrowserData): { jetstream: number; speedometer: number; combined: number } {
  const jetstream = data.benchmarks.find(b => b.name === 'JetStream 3.0');
  const speedometer = data.benchmarks.find(b => b.name === 'Speedometer 3.0');
  
  const js = jetstream?.overall_score || 0;
  const sp = speedometer?.overall_score || 0;
  
  // Normalize: JetStream is ~100-200 range, Speedometer is ~15-25 range
  // Normalize both to 0-100 scale then average
  const jsNormalized = (js / 200) * 100;
  const spNormalized = (sp / 25) * 100;
  const combined = (jsNormalized + spNormalized) / 2;
  
  return { jetstream: js, speedometer: sp, combined };
}

export function getCategoryScores(data: BrowserData, testNames: string[], suiteName: string): { name: string; fullName: string; score: number }[] {
  const suite = getBenchmarkSuite(data, suiteName);
  if (!suite) return [];
  
  return testNames.map(name => {
    const test = suite.tests.find(t => t.name === name);
    return {
      name: name.length > 20 ? name.substring(0, 18) + '...' : name,
      fullName: name,
      score: test ? getTestScore(test as BenchmarkTest | SpeedometerTest) : 0,
    };
  }).filter(t => t.score > 0);
}
