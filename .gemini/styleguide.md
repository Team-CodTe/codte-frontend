# Project Style Guide

## Introduction

**IMPORTANT: All code reviews and explanations must be written in Korean.**

You are an expert full-stack developer proficient in TypeScript, React, Next.js, and modern UI/UX frameworks (e.g., Tailwind CSS, Shadcn UI, Radix UI). Your task is to produce the most optimized and maintainable Next.js code for the CodTe frontend project, following best practices and adhering to the principles of clean code and robust architecture.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI Primitives, Custom Components (Shadcn UI pattern)
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Naming Conventions

- **Files/Folders**:
  - Components: `PascalCase.tsx` (e.g., `Button.tsx`, `UserProfile.tsx`)
  - Hooks: `camelCase.ts` (e.g., `useAuth.ts`)
  - Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
  - Directories: `kebab-case` (e.g., `user-profile`, `auth-provider`)
- **Variables/Functions**: `camelCase`
- **Types/Interfaces**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE`

## Component Guidelines

- **Functional Components**: Use React Functional Components with TypeScript interfaces for props.
- **Export**: Use named exports for components (e.g., `export const Button = () => {}`).
- **Styling**:
  - Use Tailwind CSS for styling.
  - Use `clsx` and `tailwind-merge` (via `cn` utility in `src/lib/utils.ts`) for conditional classes.
  - Avoid inline styles unless absolutely necessary for dynamic values.
- **Props**:
  - Define props interfaces explicitly.
  - Use `React.ReactNode` for children.
  - Destructure props in the function signature.

## Best Practices

- **Server vs Client Components**:
  - Default to Server Components.
  - Add `'use client'` directive at the top of the file only when using hooks or event listeners.
- **Accessibility**:
  - Ensure all interactive elements have proper ARIA attributes.
  - Use semantic HTML tags.
- **Performance**:
  - Use `next/image` for images.
  - Optimize fonts using `next/font`.

## Core Principles

### Readability

Improving code clarity and ease of understanding.

#### Naming Magic Numbers

**Rule:** Replace magic numbers with named constants for clarity.

```typescript
const ANIMATION_DELAY_MS = 300;
const DEBOUNCE_DELAY_MS = 500;

const onLikeClick = async () => {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS); // Clearly indicates waiting for animation
  await refetchPostLike();
};
```

#### Abstracting Implementation Details

**Rule:** Abstract complex logic/interactions into dedicated components/HOCs.

```tsx
// AuthGuard component encapsulates auth check/redirect logic
const AuthGuard = ({ children, requireAuth = true }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && requireAuth && !user) {
      router.push('/login');
    }
  }, [user, isLoading, requireAuth, router]);

  return requireAuth && !user ? null : children;
};

// LoginStartPage is now simpler, focused only on login UI/logic
const LoginStartPage = () => {
  return (
    <AuthGuard requireAuth={false}>
      <LoginForm />
    </AuthGuard>
  );
};
```

#### Separating Code Paths for Conditional Rendering

**Rule:** Separate significantly different conditional UI/logic into distinct components.

```tsx
const SubmitButton = () => {
  const { role } = useRole();

  // Delegate rendering to specialized components
  return role === 'viewer' ? <ViewerSubmitButton /> : <AdminSubmitButton />;
};

const ViewerSubmitButton = () => {
  return <Button disabled>Submit</Button>;
};

const AdminSubmitButton = () => {
  useEffect(() => {
    showAnimation(); // Animation logic isolated here
  }, []);

  return <Button type="submit">Submit</Button>;
};
```

#### Simplifying Complex Ternary Operators

**Rule:** Replace complex/nested ternaries with `if`/`else` or IIFEs for readability.

```typescript
const status = (() => {
  if (ACondition && BCondition) return 'BOTH';
  if (ACondition) return 'A';
  if (BCondition) return 'B';
  return 'NONE';
})();
```

#### Reducing Eye Movement (Colocating Simple Logic)

**Rule:** Colocate simple, localized logic or use inline definitions to reduce context switching.

```tsx
const Page = () => {
  const { user } = useUser();

  // Logic is directly visible here
  switch (user.role) {
    case 'admin':
      return (
        <div className="flex gap-2">
          <Button disabled={false}>Invite</Button>
          <Button disabled={false}>View</Button>
        </div>
      );
    case 'viewer':
      return (
        <div className="flex gap-2">
          <Button disabled={true}>Invite</Button>
          <Button disabled={false}>View</Button>
        </div>
      );
    default:
      return null;
  }
};
```

#### Naming Complex Conditions

**Rule:** Assign complex boolean conditions to named variables.

```typescript
const matchedProducts = products.filter((product) => {
  // Check if product belongs to the target category
  const isSameCategory = product.categories.some(
    (category) => category.id === targetCategory.id,
  );

  // Check if any product price falls within the desired range
  const isPriceInRange = product.prices.some(
    (price) => price >= minPrice && price <= maxPrice,
  );

  // The overall condition is now much clearer
  return isSameCategory && isPriceInRange;
});
```

### Predictability

Ensuring code behaves as expected based on its name, parameters, and context.

#### Standardizing Return Types

**Rule:** Use consistent return types for similar functions/hooks.

```typescript
// Always return the Query object
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const useUser = (): UseQueryResult<UserType, Error> => {
  return useQuery({ queryKey: ['user'], queryFn: fetchUser });
};

const useServerTime = (): UseQueryResult<Date, Error> => {
  return useQuery({
    queryKey: ['serverTime'],
    queryFn: fetchServerTime,
  });
};
```

#### Revealing Hidden Logic (Single Responsibility)

**Rule:** Avoid hidden side effects; functions should only perform actions implied by their signature (SRP).

```typescript
// Function *only* fetches balance
const fetchBalance = async (): Promise<number> => {
  const response = await fetch('/api/balance');
  const balance = await response.json();
  return balance;
};

// Caller explicitly performs logging where needed
const handleUpdateClick = async () => {
  const balance = await fetchBalance(); // Fetch
  console.log('Balance fetched:', balance); // Log (explicit action)
  await syncBalance(balance); // Another action
};
```

#### Using Unique and Descriptive Names

**Rule:** Use unique, descriptive names for custom wrappers/functions to avoid ambiguity.

```typescript
// In httpService.ts - Clearer module name
export const httpService = {
  // Unique module name
  async getWithAuth(url: string) {
    // Descriptive function name
    const token = await fetchToken();
    return fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// Usage clearly indicates auth
export const fetchUser = async () => {
  // Name 'getWithAuth' makes the behavior explicit
  return await httpService.getWithAuth('/api/user');
};
```

### Cohesion

Keeping related code together and ensuring modules have a well-defined, single purpose.

#### Considering Form Cohesion

**Rule:** Choose field-level or form-level cohesion based on form requirements.

```tsx
// Field-level example - each field uses its own validate function
export const FieldLevelForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { name: '', email: '' },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          {...register('name', {
            validate: (value) =>
              value.trim() === '' ? 'Please enter your name.' : true,
          })}
          placeholder="Name"
        />
        {errors.name && (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input
          {...register('email', {
            validate: (value) =>
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ? true
                : 'Invalid email address.',
          })}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-destructive text-sm">{errors.email.message}</p>
        )}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

### Coupling

Minimizing dependencies between different parts of the codebase.

#### Balancing Abstraction and Coupling

**Rule:** Avoid premature abstraction of duplicates if use cases might diverge; prefer lower coupling.

**Guidance:** Before abstracting, consider if the logic is truly identical and likely to stay identical across all use cases. If divergence is possible, keeping the logic separate initially can lead to more maintainable, decoupled code.

#### Scoping State Management

**Rule:** Break down broad state management into smaller, focused hooks/contexts.

```typescript
// Hook specifically for cardId query param
export const useCardIdQueryParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cardIdParam = searchParams.get('cardId');
  const cardId = cardIdParam ? parseInt(cardIdParam, 10) : undefined;

  const setCardId = useCallback(
    (newCardId: number | undefined) => {
      const params = new URLSearchParams(searchParams);
      if (newCardId !== undefined) {
        params.set('cardId', newCardId.toString());
      } else {
        params.delete('cardId');
      }
      router.replace(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  return [cardId, setCardId] as const;
};
```

#### Eliminating Props Drilling with Composition

**Rule:** Use Component Composition instead of Props Drilling.

```tsx
const ItemEditModal = ({
  open,
  items,
  recommendedItems,
  onConfirm,
  onClose,
}) => {
  const [keyword, setKeyword] = useState('');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Items</DialogTitle>
        </DialogHeader>

        {/* Input and Button rendered directly */}
        <div className="mb-4 flex justify-between">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // State managed here
            placeholder="Search items..."
          />
          <Button onClick={onClose}>Close</Button>
        </div>

        {/* ItemEditList rendered directly, gets props it needs */}
        <ItemEditList
          keyword={keyword} // Passed directly
          items={items} // Passed directly
          recommendedItems={recommendedItems} // Passed directly
          onConfirm={onConfirm} // Passed directly
        />
      </DialogContent>
    </Dialog>
  );
};
```
