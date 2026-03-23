import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdDatatable, VdDatatableColumn } from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

interface ScaleToken {
  name: string;
  token: string;
  notes: string;
}

@Component({
  selector: 'app-scale-page',
  standalone: true,
  templateUrl: './scale.page.html',
  styleUrls: ['./scale.page.css'],
  imports: [CommonModule, VdDatatable, DocPageHeader, CodeContainer],
})
export default class ScalePage {
  // Spacing Scale Tokens
  spacingTokens: ScaleToken[] = [
    { name: '0', token: '--vd-scale-spacing-0', notes: 'No spacing' },
    { name: '50', token: '--vd-scale-spacing-50', notes: 'Extra-tight spacing' },
    { name: '100', token: '--vd-scale-spacing-100', notes: 'Very tight spacing' },
    { name: '200', token: '--vd-scale-spacing-200', notes: 'Tight spacing' },
    { name: '300', token: '--vd-scale-spacing-300', notes: 'Small spacing' },
    { name: '400', token: '--vd-scale-spacing-400', notes: 'Medium spacing' },
    { name: '600', token: '--vd-scale-spacing-600', notes: 'Large spacing' },
    { name: '800', token: '--vd-scale-spacing-800', notes: 'Extra-large spacing' },
    { name: '1000', token: '--vd-scale-spacing-1000', notes: 'Massive spacing' },
    { name: '1200', token: '--vd-scale-spacing-1200', notes: 'Layout padding' },
    { name: '1600', token: '--vd-scale-spacing-1600', notes: 'Section separation' },
    { name: '1800', token: '--vd-scale-spacing-1800', notes: 'Section/gutter spacing' },
    { name: '2400', token: '--vd-scale-spacing-2400', notes: 'Major layout spacing' },
    { name: '3000', token: '--vd-scale-spacing-3000', notes: 'Extreme spacing' },
  ];

  negativeSpacingTokens: ScaleToken[] = [
    { name: 'Negative 50', token: '--vd-scale-spacing-negative50', notes: 'Off-setting/margins' },
    {
      name: 'Negative 100',
      token: '--vd-scale-spacing-negative100',
      notes: 'Off-setting/margins',
    },
    {
      name: 'Negative 200',
      token: '--vd-scale-spacing-negative200',
      notes: 'Off-setting/margins',
    },
    {
      name: 'Negative 300',
      token: '--vd-scale-spacing-negative300',
      notes: 'Off-setting/margins',
    },
    {
      name: 'Negative 400',
      token: '--vd-scale-spacing-negative400',
      notes: 'Off-setting/margins',
    },
    {
      name: 'Negative 600',
      token: '--vd-scale-spacing-negative600',
      notes: 'Off-setting/margins',
    },
  ];

  // Border Width Tokens
  borderWidthTokens: ScaleToken[] = [
    { name: 'None', token: '--vd-scale-border-width-none', notes: 'No border' },
    { name: 'Small', token: '--vd-scale-border-width-sm', notes: 'Minor separators, outlines' },
    { name: 'Medium', token: '--vd-scale-border-width-md', notes: 'Standard component borders' },
    { name: 'Large', token: '--vd-scale-border-width-lg', notes: 'Emphasis borders' },
    {
      name: 'Extra Large',
      token: '--vd-scale-border-width-xl',
      notes: 'Strong emphasis, highlights',
    },
  ];

  // Border Radius Tokens
  borderRadiusTokens: ScaleToken[] = [
    { name: 'None', token: '--vd-scale-border-radius-none', notes: 'Sharp corners' },
    { name: 'XS', token: '--vd-scale-border-radius-xs', notes: 'Very subtle rounding' },
    { name: 'SM', token: '--vd-scale-border-radius-sm', notes: 'Slight rounding' },
    { name: 'MD', token: '--vd-scale-border-radius-md', notes: 'Standard rounding' },
    { name: 'LG', token: '--vd-scale-border-radius-lg', notes: 'Rounded components, cards' },
    { name: 'XL', token: '--vd-scale-border-radius-xl', notes: 'Prominent rounding' },
    {
      name: 'XXL',
      token: '--vd-scale-border-radius-xxl',
      notes: 'Larger rounding for modal/dialog',
    },
    {
      name: 'XXXL',
      token: '--vd-scale-border-radius-xxxl',
      notes: 'Very large rounding for hero/UI accent',
    },
    {
      name: 'Full',
      token: '--vd-scale-border-radius-full',
      notes: 'Fully circular elements (avatars, badges)',
    },
  ];

  // Icon Size Tokens
  iconSizeTokens: ScaleToken[] = [
    { name: 'XS', token: '--vd-scale-icon-size-xs', notes: 'Very small icons (inputs, badges)' },
    { name: 'SM', token: '--vd-scale-icon-size-sm', notes: 'Small icons (buttons, tabs)' },
    { name: 'MD', token: '--vd-scale-icon-size-md', notes: 'Standard icons' },
    { name: 'LG', token: '--vd-scale-icon-size-lg', notes: 'Emphasized icons' },
    { name: 'XL', token: '--vd-scale-icon-size-xl', notes: 'Large icons, hero elements' },
  ];

  // Column Definitions
  scaleColumns: VdDatatableColumn<ScaleToken>[] = [
    { key: 'name', title: 'Scale' },
    { key: 'token', title: 'Token' },
    { key: 'notes', title: 'Notes' },
  ];

  // Code Snippets
  spacingUsageSnippet = `/* Using spacing tokens for layout */
.card {
  padding: var(--vd-scale-spacing-400); /* Semantic purpose: Container padding */
  margin-bottom: var(--vd-scale-spacing-600);
  gap: var(--vd-scale-spacing-200);
}

.section {
  padding: var(--vd-scale-spacing-1200); /* Layout padding */
  margin-top: var(--vd-scale-spacing-1600); /* Section separation */
}`;

  borderUsageSnippet = `/* Applying border tokens */
.divider {
  border-bottom: var(--vd-scale-border-width-sm) solid var(--vd-color-border-default-tertiary);
}

.card-highlight {
  border: var(--vd-scale-border-width-lg) solid var(--vd-color-border-primary-base);
}`;

  borderRadiusSnippet = `/* Applying border radius tokens */
.avatar {
  border-radius: var(--vd-scale-border-radius-full);
}

.modal {
  border-radius: var(--vd-scale-border-radius-xxl);
}

.card {
  border-radius: var(--vd-scale-border-radius-lg);
}`;

  iconSizeSnippet = `<!-- Using icon size tokens -->
<vd-icon name="user" size="sm"></vd-icon> <!-- Small icons for buttons -->
<vd-icon name="settings" size="md"></vd-icon> <!-- Standard icons -->
<vd-icon name="warning" size="lg"></vd-icon> <!-- Emphasized icons -->`;

  bestPracticeDoSnippet = `/* ✅ DO: Always use scale tokens for sizing */
.container {
  padding: var(--vd-scale-spacing-400);
  border-radius: var(--vd-scale-border-radius-md);
  border: var(--vd-scale-border-width-sm) solid var(--vd-color-border-default-base);
}`;

  bestPracticeDontSnippet = `/* ❌ DON'T: Hardcode pixel or other unit values */
.container {
  padding: 15px; /* Wrong: Use --vd-scale-spacing-400 */
  border-radius: 10px; /* Wrong: Use --vd-scale-border-radius-md */
  border: 1px solid #ccc; /* Wrong: Use scale and color tokens */
}`;
}
