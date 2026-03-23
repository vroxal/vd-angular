import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdDatatable, VdDatatableColumn, VdAlert } from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

interface FontFamily {
  brand: string;
  name: string;
}

interface TypeScale {
  name: string;
  size: string;
  lineHeight: string;
  weight: string;
  letterSpacing: string;
}

interface SemanticMapping {
  element: string;
  typographyLevel: string;
  purpose: string;
}

interface TypeScaleItem {
  label: string;
  className: string;
  specs: string;
}

interface UtilityClassGroup {
  name: string;
  classes: string[];
}

@Component({
  selector: 'app-typography-page',
  standalone: true,
  templateUrl: './typography.page.html',
  styleUrls: ['./typography.page.css'],
  imports: [CommonModule, VdDatatable, DocPageHeader, CodeContainer, VdAlert],
})
export default class TypographyPage {
  // Semantic HTML Mapping
  semanticMappings: SemanticMapping[] = [
    { element: 'h1', typographyLevel: 'display-large', purpose: 'Page hero heading' },
    { element: 'h2', typographyLevel: 'display-medium', purpose: 'Section hero' },
    { element: 'h3', typographyLevel: 'display-small', purpose: 'Section heading' },
    { element: 'h4', typographyLevel: 'headline-large', purpose: 'Major subsection' },
    { element: 'h5', typographyLevel: 'headline-medium', purpose: 'Subsection' },
    { element: 'h6', typographyLevel: 'headline-small', purpose: 'Minor heading' },
    { element: 'p', typographyLevel: 'body-medium', purpose: 'Default reading text' },
    { element: 'a', typographyLevel: 'label-medium', purpose: 'Interactive text' },
    { element: 'button', typographyLevel: 'label-medium', purpose: 'Action text' },
    { element: 'label', typographyLevel: 'label-medium', purpose: 'Form labels' },
  ];

  semanticMappingColumns: VdDatatableColumn<SemanticMapping>[] = [
    { key: 'element', title: 'Element' },
    { key: 'typographyLevel', title: 'Typography Level' },
    { key: 'purpose', title: 'Purpose' },
  ];

  // Type Scale Items
  typeScale: TypeScaleItem[] = [
    {
      label: 'Display Large (60px)',
      className: 'display-large',
      specs: 'Weight: 600 | Line: 72px | Letter: -1.5px',
    },
    {
      label: 'Display Medium (48px)',
      className: 'display-medium',
      specs: 'Weight: 600 | Line: 56px | Letter: -1px',
    },
    {
      label: 'Display Small (40px)',
      className: 'display-small',
      specs: 'Weight: 600 | Line: 48px | Letter: -0.5px',
    },
    {
      label: 'Headline Large (34px)',
      className: 'headline-large',
      specs: 'Weight: 600 | Line: 40px | Letter: -0.3px',
    },
    {
      label: 'Headline Medium (28px)',
      className: 'headline-medium',
      specs: 'Weight: 600 | Line: 36px | Letter: -0.3px',
    },
    {
      label: 'Headline Small (24px)',
      className: 'headline-small',
      specs: 'Weight: 600 | Line: 32px | Letter: -0.3px',
    },
    {
      label: 'Title Large (20px)',
      className: 'title-large',
      specs: 'Weight: 600 | Line: 28px | Letter: 0px',
    },
    {
      label: 'Title Medium (16px)',
      className: 'title-medium',
      specs: 'Weight: 600 | Line: 24px | Letter: 0px',
    },
    {
      label: 'Title Small (14px)',
      className: 'title-small',
      specs: 'Weight: 600 | Line: 20px | Letter: 0px',
    },
    {
      label: 'Body Extra Large — The quick brown fox jumps over the lazy dog',
      className: 'body-extra-large',
      specs: 'Weight: 400 | Emphasis reading',
    },
    {
      label:
        'Body Large — The quick brown fox jumps over the lazy dog and runs away into the forest',
      className: 'body-large',
      specs: 'Weight: 400 | Line: 24px | Letter: 0px',
    },
    {
      label:
        'Body Medium — The quick brown fox jumps over the lazy dog and runs away into the forest where it lives',
      className: 'body-medium',
      specs: 'Weight: 400 | Line: 24px | Letter: 0px',
    },
    {
      label:
        'Body Small — The quick brown fox jumps over the lazy dog and runs away into the forest where it lives happily',
      className: 'body-small',
      specs: 'Weight: 400 | Line: 16px | Letter: 0px',
    },
    {
      label: 'Body Extra Small — The quick brown fox jumps over the lazy dog',
      className: 'body-extra-small',
      specs: 'Weight: 400 | Metadata',
    },
    {
      label: 'Label Large (16px)',
      className: 'label-large',
      specs: 'Weight: 500 | Line: 24px | Letter: 0.2px',
    },
    {
      label: 'Label Medium (14px)',
      className: 'label-medium',
      specs: 'Weight: 500 | Line: 24px | Letter: 0.2px',
    },
    {
      label: 'Label Small (12px)',
      className: 'label-small',
      specs: 'Weight: 500 | Line: 16px | Letter: 0.2px',
    },
    {
      label: 'Label Extra Small',
      className: 'label-extra-small',
      specs: 'Weight: 500 | Dense UI',
    },
  ];

  // Utility Class Groups
  utilityClassGroups: UtilityClassGroup[] = [
    {
      name: 'Display',
      classes: ['.display-large', '.display-medium', '.display-small'],
    },
    {
      name: 'Headline',
      classes: ['.headline-large', '.headline-medium', '.headline-small'],
    },
    {
      name: 'Title',
      classes: ['.title-large', '.title-medium', '.title-small'],
    },
    {
      name: 'Body',
      classes: [
        '.body-extra-large',
        '.body-large',
        '.body-medium',
        '.body-small',
        '.body-extra-small',
      ],
    },
    {
      name: 'Label',
      classes: ['.label-large', '.label-medium', '.label-small', '.label-extra-small'],
    },
  ];

  fontFamilies: FontFamily[] = [
    {
      brand: 'Consumer',
      name: 'Poppins',
    },
    {
      brand: 'Business',
      name: 'Avenir Next',
    },
    {
      brand: 'Corporate',
      name: 'Inter',
    },
  ];

  fontFamilyColumns: VdDatatableColumn<FontFamily>[] = [
    { key: 'brand', title: 'Brand Variant' },
    { key: 'name', title: 'Font Family' },
  ];

  typeScales: TypeScale[] = [
    {
      name: 'Display Large',
      size: '60px',
      lineHeight: '72px',
      weight: '600',
      letterSpacing: '-1.5px',
    },
    {
      name: 'Display Medium',
      size: '48px',
      lineHeight: '56px',
      weight: '600',
      letterSpacing: '-1px',
    },
    {
      name: 'Display Small',
      size: '40px',
      lineHeight: '48px',
      weight: '600',
      letterSpacing: '-0.5px',
    },
    {
      name: 'Headline Large',
      size: '34px',
      lineHeight: '40px',
      weight: '600',
      letterSpacing: '-0.3px',
    },
    {
      name: 'Headline Medium',
      size: '28px',
      lineHeight: '36px',
      weight: '600',
      letterSpacing: '-0.3px',
    },
    {
      name: 'Headline Small',
      size: '24px',
      lineHeight: '32px',
      weight: '600',
      letterSpacing: '-0.3px',
    },
    {
      name: 'Title Large',
      size: '20px',
      lineHeight: '28px',
      weight: '600',
      letterSpacing: '0px',
    },
    {
      name: 'Title Medium',
      size: '16px',
      lineHeight: '24px',
      weight: '600',
      letterSpacing: '0px',
    },
    {
      name: 'Title Small',
      size: '14px',
      lineHeight: '20px',
      weight: '600',
      letterSpacing: '0px',
    },
    {
      name: 'Body Extra Large',
      size: '18px',
      lineHeight: '28px',
      weight: '400',
      letterSpacing: '0px',
    },
    {
      name: 'Body Large',
      size: '16px',
      lineHeight: '24px',
      weight: '400',
      letterSpacing: '0px',
    },
    {
      name: 'Body Medium',
      size: '14px',
      lineHeight: '24px',
      weight: '400',
      letterSpacing: '0px',
    },
    {
      name: 'Body Small',
      size: '12px',
      lineHeight: '16px',
      weight: '400',
      letterSpacing: '0px',
    },
    {
      name: 'Body Extra Small',
      size: '10px',
      lineHeight: '14px',
      weight: '400',
      letterSpacing: '0px',
    },
    {
      name: 'Label Large',
      size: '16px',
      lineHeight: '24px',
      weight: '500',
      letterSpacing: '0.2px',
    },
    {
      name: 'Label Medium',
      size: '14px',
      lineHeight: '24px',
      weight: '500',
      letterSpacing: '0.2px',
    },
    {
      name: 'Label Small',
      size: '12px',
      lineHeight: '16px',
      weight: '500',
      letterSpacing: '0.2px',
    },
    {
      name: 'Label Extra Small',
      size: '10px',
      lineHeight: '14px',
      weight: '500',
      letterSpacing: '0.2px',
    },
  ];

  typeScaleColumns: VdDatatableColumn<TypeScale>[] = [
    { key: 'name', title: 'Name' },
    { key: 'size', title: 'Size' },
    { key: 'lineHeight', title: 'Line Height' },
    { key: 'weight', title: 'Weight' },
    { key: 'letterSpacing', title: 'Letter Spacing' },
  ];

  fontFamilySnippet = `/* Set font family based on brand */
body {
  font-family: var(--vd-font-style-primary);
  /* Automatically switches between:
     - Poppins (Consumer - default)
     - Avenir Next (Business - data-brand="business")
     - Inter (Corporate - data-brand="corporate")
  */
}`;

  typeScaleSnippet = `/* Use utility classes to apply typography */
<div class="title-large">Account Summary</div>

<label class="label-medium">Email</label>

<span class="body-small">Last updated 2 hours ago</span>

<p class="body-medium">
  Your balance is <span class="body-medium-italic">pending review</span>.
</p>`;

  brandVariantSnippet = `<!-- Consumer brand (default - Poppins) -->
<html>
  <body>Poppins font is used</body>
</html>

<!-- Business brand (Avenir Next) -->
<html data-brand="business">
  <body>Avenir Next font is used</body>
</html>

<!-- Corporate brand (Inter) -->
<html data-brand="corporate">
  <body>Inter font is used</body>
</html>`;

  colorRuleSnippet = `/* ✅ Always use semantic color tokens for text */
.heading {
  color: var(--vd-color-content-default-base);
}

.secondary-text {
  color: var(--vd-color-content-default-secondary);
}

/* ❌ Do NOT hardcode text colors */
.heading {
  color: #0f172a; /* Wrong */
}`;

  bestPracticeDoSnippet = `/* ✅ DO: Use VD typography classes and tokens */
.page-title {
  /* Use the display-large class or CSS tokens */
  font-size: var(--vd-font-size-display-large);
  font-weight: var(--vd-font-weight-display-large);
  line-height: var(--vd-font-line-height-display-large);
  color: var(--vd-color-content-default-base);
}

/* Or simply apply the class: class="display-large" */`;

  bestPracticeDontSnippet = `/* ❌ DON'T: Hardcode typography values */
.page-title {
  font-size: 60px;
  font-weight: bold;
  line-height: 1.2;
  color: #333333;
}

/* ❌ DON'T: Create custom text classes */
.my-custom-heading {
  font-size: 42px;
  font-weight: 700;
}`;
}
