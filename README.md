# Vroxal Design Angular

Monorepo for the Vroxal Design Angular library and its documentation app.

## Workspace Contents

- `projects/angular-components`: publishable Angular component library exposed as `@vroxal/vd-angular`
- `projects/docs`: Angular application used to develop and preview the library

## Requirements

- Node.js 20+
- npm 10+

## Getting Started

Install dependencies:

```bash
npm install
```

Start the docs application locally:

```bash
npm run start:docs
```

The docs app runs on `http://localhost:4200/` with live reload enabled by Angular CLI.

## Common Commands

Build the component library:

```bash
npm run build:lib
```

Build the docs application:

```bash
npm run build:docs
```

Run unit tests:

```bash
npm test
```

## Library Workflow

The library source lives in `projects/angular-components/src`, and the packaged output is written to `dist/angular-components`.

Useful library references:

- Component registry: `projects/angular-components/guidelines/COMPONENT_REGISTRY.md`
- Usage guidance: `projects/angular-components/guidelines/USAGE_GUIDELINES.md`
- Public exports: `projects/angular-components/src/public-api.ts`

## Publishing

Build the library first:

```bash
npm run build:lib
```

Then publish from the generated package directory:

```bash
cd dist/angular-components
npm publish
```

## Tech Stack

- Angular 21
- `ng-packagr` for library packaging
- Vitest via Angular's unit-test builder

