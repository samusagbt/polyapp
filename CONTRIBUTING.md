# Contributing to Polymarket Dashboard ??

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Ways to Contribute

- ?? Report bugs
- ?? Suggest new features
- ?? Improve documentation
- ?? Enhance UI/UX
- ? Optimize performance
- ? Add new features

## Development Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/yourusername/polymarket-dashboard.git
cd polymarket-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Make your changes**

5. **Test your changes**
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
??? components/    # React components
??? hooks/        # Custom React hooks
??? services/     # API and external services
??? types/        # TypeScript type definitions
??? utils/        # Utility functions
??? App.tsx       # Main application
```

## Coding Standards

### TypeScript
- Use TypeScript for all new files
- Define proper types, avoid `any`
- Use interfaces for object shapes
- Export types when needed by other modules

### React
- Use functional components with hooks
- Keep components small and focused
- Use meaningful component and prop names
- Add comments for complex logic

### Styling
- Use TailwindCSS utility classes
- Follow the existing design system
- Ensure responsive design (mobile-first)
- Test on different screen sizes

### Code Style
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Use meaningful variable names
- Keep functions small and focused

## Feature Development Workflow

1. **Create a new branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Implement your feature**
   - Write clean, documented code
   - Follow existing patterns
   - Add proper error handling

3. **Test thoroughly**
   - Test in development mode
   - Test production build
   - Test on different browsers
   - Test responsive design

4. **Commit your changes**
```bash
git add .
git commit -m "Add: descriptive commit message"
```

Commit message format:
- `Add: new feature`
- `Fix: bug description`
- `Update: changes to existing feature`
- `Refactor: code improvement`
- `Docs: documentation changes`

5. **Push and create PR**
```bash
git push origin feature/your-feature-name
```

## Adding New Components

Example component structure:

```typescript
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  onAction 
}) => {
  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      {onAction && (
        <button onClick={onAction}>
          Click me
        </button>
      )}
    </div>
  );
};
```

## Adding New API Endpoints

1. **Add types** in `src/types/index.ts`:
```typescript
export interface NewDataType {
  id: string;
  name: string;
}
```

2. **Add API method** in `src/services/api.ts`:
```typescript
async getNewData(): Promise<NewDataType[]> {
  try {
    const response = await gammaClient.get('/new-endpoint');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
```

3. **Create hook** in `src/hooks/`:
```typescript
export const useNewData = () => {
  return useQuery<NewDataType[], Error>(
    'newData',
    () => polymarketAPI.getNewData(),
    { staleTime: 30000 }
  );
};
```

## Testing

### Manual Testing Checklist
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Works in Chrome, Firefox, Safari
- [ ] Loading states work properly
- [ ] Error states handled gracefully
- [ ] No broken links or images

### Browser Testing
Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Pull Request Guidelines

### Before Submitting
- [ ] Code builds without errors
- [ ] No console warnings
- [ ] Follows coding standards
- [ ] Tested on multiple browsers
- [ ] Responsive design verified
- [ ] Documentation updated if needed

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test this?

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested on multiple browsers
```

## Feature Ideas

Looking for something to work on? Here are some ideas:

### Easy
- [ ] Add more filter options
- [ ] Improve mobile UI
- [ ] Add dark mode toggle
- [ ] Add market share button
- [ ] Improve loading states

### Medium
- [ ] Add price history charts
- [ ] Implement favorites/watchlist
- [ ] Add export to CSV feature
- [ ] Create market comparison view
- [ ] Add pagination for large datasets

### Hard
- [ ] WebSocket integration for real-time updates
- [ ] Advanced analytics dashboard
- [ ] User accounts and saved preferences
- [ ] Price alert notifications
- [ ] Portfolio tracking

## Performance Tips

- Use `React.memo()` for expensive components
- Implement virtual scrolling for large lists
- Optimize images and assets
- Use code splitting with `React.lazy()`
- Minimize bundle size
- Cache API responses appropriately

## Documentation

When adding features:
1. Add inline code comments
2. Update README if needed
3. Add JSDoc comments for functions
4. Update TypeScript types
5. Document API usage

Example:
```typescript
/**
 * Fetches markets from Polymarket API
 * @param limit - Maximum number of markets to fetch
 * @param offset - Pagination offset
 * @returns Promise with array of markets
 */
async getMarkets(limit = 100, offset = 0): Promise<Market[]>
```

## Questions?

- Check existing issues
- Review the code
- Ask in pull request comments
- Refer to [Polymarket API docs](https://docs.polymarket.com)

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers
- Focus on the code, not the person
- Help others learn and grow

## Recognition

Contributors will be:
- Added to README acknowledgments
- Mentioned in release notes
- Given credit in relevant documentation

Thank you for contributing! ??
