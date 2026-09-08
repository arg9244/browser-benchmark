# Data Directory

This directory contains static data and configurations used by the application.

## 📁 Structure

- `categories.ts` - Category definitions and configurations
- `analysis.ts` - Browser analysis data and scoring
- `README.md` - This file

## 📊 Data Flow

1. **Raw Data**: JSON files in `public/data/`
2. **Processing**: Utility functions in `utils/dataLoader.ts`
3. **Display**: Components render processed data

## 🛠️ Adding New Data

When adding new browser data or categories:

1. Define types in `types.ts`
2. Add data files to appropriate directories
3. Update data loaders if needed
4. Update components to display new data

## 📝 Conventions

- Use TypeScript interfaces for type safety
- Keep data files in JSON format
- Document any custom configurations