# Benchmark Data

This folder contains the benchmark JSON files for each browser.

## Structure

- `manifest.json` - Lists all browser data files. Update this when adding/removing browsers.
- `{browser-name}.json` - Individual browser benchmark data files.

## Adding a New Browser

1. Add the browser's JSON file to this folder (e.g., `new-browser.json`)
2. Update `manifest.json` to include the new browser name in the `browsers` array
3. Rebuild the site

## Removing a Browser

1. Delete the browser's JSON file from this folder
2. Remove the browser name from `manifest.json`
3. Rebuild the site

## JSON Format

Each browser JSON file should follow this structure:

```json
{
  "browser_short_name": "browser-id",
  "browser_full_name": "Browser Display Name",
  "benchmarks": [
    {
      "name": "JetStream 3.0",
      "overall_score": 167.87,
      "tests": [
        {
          "name": "test-name",
          "score": 123.45,
          "first": 100.0,
          "worst": 150.0,
          "average": 130.0
        }
      ]
    },
    {
      "name": "Speedometer 3.0",
      "overall_score": 16.28,
      "tests": [
        {
          "name": "test-name",
          "mean": 45.67,
          "runs": [45.1, 46.2, ...]
        }
      ]
    }
  ]
}
```

## Deployment

When deploying to GitHub Pages:
1. Ensure all JSON files are in this `data/` folder (or `public/data/` in the source)
2. The `manifest.json` lists all available browsers
3. The app dynamically loads all files listed in the manifest
4. No code changes needed when adding/removing browsers - just update the manifest
