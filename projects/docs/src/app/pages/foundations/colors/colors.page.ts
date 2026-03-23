import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';
import { VdAlert } from 'vd-angular';
import { M } from '@angular/cdk/keycodes';

// interface ColorToken {
//   name: string;
//   variable: string;
//   light: string;
//   dark?: string;
//   description: string;
// }

interface ColorPalette {
  name: string;
  colors: Array<{
    name: string;
    variable?: string;
    hex?: string;
    token?: string;
  }>;
}
interface NestedColorPalette {
  name: string;
  paletteType: ColorPalette[];
}

@Component({
  selector: 'app-colors-page',
  standalone: true,
  templateUrl: './colors.page.html',
  styleUrls: ['./colors.page.css'],
  imports: [CommonModule, DocPageHeader, CodeContainer, VdAlert],
})
export default class ColorsPage {
  @ViewChild('semanticBadge', { static: true }) semanticBadge!: TemplateRef<any>;
  @ViewChild('lightBadge', { static: true }) lightBadge!: TemplateRef<any>;
  @ViewChild('darkBadge', { static: true }) darkBadge!: TemplateRef<any>;

  // Color Palettes
  rootPalette: ColorPalette[] = [
    {
      name: 'BlueGlow',
      colors: [
        { name: '50', hex: '#EBE9FE' },
        { name: '100', hex: '#DEDBFD' },
        { name: '200', hex: '#BEB7FB' },
        { name: '300', hex: '#9C92F8' },
        { name: '400', hex: '#7B6EF6' },
        { name: '500', hex: '#5A4AF4' },
        { name: '600', hex: '#483BC3' },
        { name: '700', hex: '#362C92' },
        { name: '800', hex: '#251E62' },
        { name: '900', hex: '#120F31' },
      ],
    },
    {
      name: 'Grey',
      colors: [
        { name: '50', hex: '#F6F5FF' },
        { name: '100', hex: '#E7E6F5' },
        { name: '200', hex: '#D7D5E5' },
        { name: '300', hex: '#9F9CBA' },
        { name: '400', hex: '#797791' },
        { name: '500', hex: '#5A5870' },
        { name: '600', hex: '#47455A' },
        { name: '700', hex: '#353443' },
        { name: '800', hex: '#19172B' },
        { name: '900', hex: '#04021A' },
      ],
    },
    {
      name: 'Green',
      colors: [
        { name: '50', hex: '#e7f3ee' },
        { name: '100', hex: '#cfe7dd' },
        { name: '200', hex: '#9fcfbb' },
        { name: '300', hex: '#6eb799' },
        { name: '400', hex: '#3e9f77' },
        { name: '500', hex: '#0e8755' },
        { name: '600', hex: '#0b6c44' },
        { name: '700', hex: '#085133' },
        { name: '800', hex: '#063622' },
        { name: '900', hex: '#031b11' },
      ],
    },
    {
      name: 'Red',
      colors: [
        { name: '50', hex: '#fbe9ea' },
        { name: '100', hex: '#f8d2d4' },
        { name: '200', hex: '#f0a5a9' },
        { name: '300', hex: '#e9787e' },
        { name: '400', hex: '#e14b53' },
        { name: '500', hex: '#da1e28' },
        { name: '600', hex: '#ae1820' },
        { name: '700', hex: '#831218' },
        { name: '800', hex: '#570c10' },
        { name: '900', hex: '#2c0608' },
      ],
    },
    {
      name: 'Orange',
      colors: [
        { name: '50', hex: '#fcf0e6' },
        { name: '100', hex: '#f8e0cc' },
        { name: '200', hex: '#f1c299' },
        { name: '300', hex: '#eaa366' },
        { name: '400', hex: '#e38533' },
        { name: '500', hex: '#dc6600' },
        { name: '600', hex: '#b05200' },
        { name: '700', hex: '#843d00' },
        { name: '800', hex: '#582900' },
        { name: '900', hex: '#2c1400' },
      ],
    },
    {
      name: 'Blue',
      colors: [
        { name: '50', hex: '#eaf1fb' },
        { name: '100', hex: '#d6e3f6' },
        { name: '200', hex: '#adc7ee' },
        { name: '300', hex: '#83aae5' },
        { name: '400', hex: '#5a8edd' },
        { name: '500', hex: '#3172d4' },
        { name: '600', hex: '#275baa' },
        { name: '700', hex: '#1d447f' },
        { name: '800', hex: '#142e55' },
        { name: '900', hex: '#0a172a' },
      ],
    },
    {
      name: 'Opaque White',
      colors: [
        { name: '100', hex: 'rgba(255, 255, 255, 0.1)' },
        { name: '200', hex: 'rgba(255, 255, 255, 0.2)' },
        { name: '300', hex: 'rgba(255, 255, 255, 0.3)' },
        { name: '400', hex: 'rgba(255, 255, 255, 0.4)' },
        { name: '500', hex: 'rgba(255, 255, 255, 0.5)' },
        { name: '600', hex: 'rgba(255, 255, 255, 0.6)' },
        { name: '700', hex: 'rgba(255, 255, 255, 0.7)' },
        { name: '800', hex: 'rgba(255, 255, 255, 0.8)' },
        { name: '900', hex: 'rgba(255, 255, 255, 0.9)' },
        { name: '1000', hex: '#ffffff' },
      ],
    },
    {
      name: 'Opaque Black',
      colors: [
        { name: '100', hex: 'rgba(0, 0, 0, 0.1)' },
        { name: '200', hex: 'rgba(0, 0, 0, 0.2)' },
        { name: '300', hex: 'rgba(0, 0, 0, 0.3)' },
        { name: '400', hex: 'rgba(0, 0, 0, 0.4)' },
        { name: '500', hex: 'rgba(0, 0, 0, 0.5)' },
        { name: '600', hex: 'rgba(0, 0, 0, 0.6)' },
        { name: '700', hex: 'rgba(0, 0, 0, 0.7)' },
        { name: '800', hex: 'rgba(0, 0, 0, 0.8)' },
        { name: '900', hex: 'rgba(0, 0, 0, 0.9)' },
        { name: '1000', hex: '#000000' },
      ],
    },

    {
      name: 'Opaque Neutral',
      colors: [{ name: 'Overlay', hex: 'rgba(4, 2, 26, 0.4)' }],
    },
  ];

  brandPalette: ColorPalette[] = [
    {
      name: 'Primary',
      colors: [
        { name: '50', hex: '#faf0f0', variable: '--vd-color-primary-50' },
        { name: '100', hex: '#f5d2d4', variable: '--vd-color-primary-100' },
        { name: '200', hex: '#eca6a9', variable: '--vd-color-primary-200' },
        { name: '300', hex: '#e2797d', variable: '--vd-color-primary-300' },
        { name: '400', hex: '#d94d52', variable: '--vd-color-primary-400' },
        { name: '500', hex: '#ce2027', variable: '--vd-color-primary-500' },
        { name: '600', hex: '#a61a1f', variable: '--vd-color-primary-600' },
        { name: '700', hex: '#7c1317', variable: '--vd-color-primary-700' },
        { name: '800', hex: '#530d10', variable: '--vd-color-primary-800' },
        { name: '900', hex: '#290608', variable: '--vd-color-primary-900' },
      ],
    },
    {
      name: 'Error',
      colors: [
        { name: '50', hex: '#fbe9ea', variable: '--vd-color-red-50' },
        { name: '100', hex: '#f8d2d4', variable: '--vd-color-red-100' },
        { name: '200', hex: '#f0a5a9', variable: '--vd-color-red-200' },
        { name: '300', hex: '#e9787e', variable: '--vd-color-red-300' },
        { name: '400', hex: '#e14b53', variable: '--vd-color-red-400' },
        { name: '500', hex: '#da1e28', variable: '--vd-color-red-500' },
        { name: '600', hex: '#ae1820', variable: '--vd-color-red-600' },
        { name: '700', hex: '#831218', variable: '--vd-color-red-700' },
        { name: '800', hex: '#570c10', variable: '--vd-color-red-800' },
        { name: '900', hex: '#2c0608', variable: '--vd-color-red-900' },
      ],
    },
    {
      name: 'Success',
      colors: [
        { name: '50', hex: '#e7f3ee', variable: '--vd-color-green-50' },
        { name: '100', hex: '#cfe7dd', variable: '--vd-color-green-100' },
        { name: '200', hex: '#9fcfbb', variable: '--vd-color-green-200' },
        { name: '300', hex: '#6eb799', variable: '--vd-color-green-300' },
        { name: '400', hex: '#3e9f77', variable: '--vd-color-green-400' },
        { name: '500', hex: '#0e8755', variable: '--vd-color-green-500' },
        { name: '600', hex: '#0b6c44', variable: '--vd-color-green-600' },
        { name: '700', hex: '#085133', variable: '--vd-color-green-700' },
        { name: '800', hex: '#063622', variable: '--vd-color-green-800' },
        { name: '900', hex: '#031b11', variable: '--vd-color-green-900' },
      ],
    },
    {
      name: 'Warning',
      colors: [
        { name: '50', hex: '#fcf0e6', variable: '--vd-color-orange-50' },
        { name: '100', hex: '#f8e0cc', variable: '--vd-color-orange-100' },
        { name: '200', hex: '#f1c299', variable: '--vd-color-orange-200' },
        { name: '300', hex: '#eaa366', variable: '--vd-color-orange-300' },
        { name: '400', hex: '#e38533', variable: '--vd-color-orange-400' },
        { name: '500', hex: '#dc6600', variable: '--vd-color-orange-500' },
        { name: '600', hex: '#b05200', variable: '--vd-color-orange-600' },
        { name: '700', hex: '#843d00', variable: '--vd-color-orange-700' },
        { name: '800', hex: '#582900', variable: '--vd-color-orange-800' },
        { name: '900', hex: '#2c1400', variable: '--vd-color-orange-900' },
      ],
    },
    {
      name: 'Info',
      colors: [
        { name: '50', hex: '#eaf1fb', variable: '--vd-color-blue-50' },
        { name: '100', hex: '#d6e3f6', variable: '--vd-color-blue-100' },
        { name: '200', hex: '#adc7ee', variable: '--vd-color-blue-200' },
        { name: '300', hex: '#83aae5', variable: '--vd-color-blue-300' },
        { name: '400', hex: '#5a8edd', variable: '--vd-color-blue-400' },
        { name: '500', hex: '#3172d4', variable: '--vd-color-blue-500' },
        { name: '600', hex: '#275baa', variable: '--vd-color-blue-600' },
        { name: '700', hex: '#1d447f', variable: '--vd-color-blue-700' },
        { name: '800', hex: '#142e55', variable: '--vd-color-blue-800' },
        { name: '900', hex: '#0a172a', variable: '--vd-color-blue-900' },
      ],
    },
    {
      name: 'Neutral',
      colors: [
        { name: '50', hex: '#fbfdff', variable: '--vd-color-grey-50' },
        { name: '100', hex: '#f1f5f9', variable: '--vd-color-grey-100' },
        { name: '200', hex: '#e2e8f0', variable: '--vd-color-grey-200' },
        { name: '300', hex: '#cbd5e1', variable: '--vd-color-grey-300' },
        { name: '400', hex: '#94a3b8', variable: '--vd-color-grey-400' },
        { name: '500', hex: '#64748b', variable: '--vd-color-grey-500' },
        { name: '600', hex: '#475569', variable: '--vd-color-grey-600' },
        { name: '700', hex: '#334155', variable: '--vd-color-grey-700' },
        { name: '800', hex: '#1e293b', variable: '--vd-color-grey-800' },
        { name: '900', hex: '#0f172a', variable: '--vd-color-grey-900' },
      ],
    },
    {
      name: 'White',
      colors: [
        { name: '100', hex: 'rgba(255, 255, 255, 0.1)', variable: '--vd-color-opaque-white-100' },
        { name: '200', hex: 'rgba(255, 255, 255, 0.2)', variable: '--vd-color-opaque-white-200' },
        { name: '300', hex: 'rgba(255, 255, 255, 0.3)', variable: '--vd-color-opaque-white-300' },
        { name: '400', hex: 'rgba(255, 255, 255, 0.4)', variable: '--vd-color-opaque-white-400' },
        { name: '500', hex: 'rgba(255, 255, 255, 0.5)', variable: '--vd-color-opaque-white-500' },
        { name: '600', hex: 'rgba(255, 255, 255, 0.6)', variable: '--vd-color-opaque-white-600' },
        { name: '700', hex: 'rgba(255, 255, 255, 0.7)', variable: '--vd-color-opaque-white-700' },
        { name: '800', hex: 'rgba(255, 255, 255, 0.8)', variable: '--vd-color-opaque-white-800' },
        { name: '900', hex: 'rgba(255, 255, 255, 0.9)', variable: '--vd-color-opaque-white-900' },
        { name: '1000', hex: '#ffffff', variable: '--vd-color-opaque-white-1000' },
      ],
    },
    {
      name: 'Black',
      colors: [
        { name: '100', hex: 'rgba(0, 0, 0, 0.1)', variable: '--vd-color-opaque-black-100' },
        { name: '200', hex: 'rgba(0, 0, 0, 0.2)', variable: '--vd-color-opaque-black-200' },
        { name: '300', hex: 'rgba(0, 0, 0, 0.3)', variable: '--vd-color-opaque-black-300' },
        { name: '400', hex: 'rgba(0, 0, 0, 0.4)', variable: '--vd-color-opaque-black-400' },
        { name: '500', hex: 'rgba(0, 0, 0, 0.5)', variable: '--vd-color-opaque-black-500' },
        { name: '600', hex: 'rgba(0, 0, 0, 0.6)', variable: '--vd-color-opaque-black-600' },
        { name: '700', hex: 'rgba(0, 0, 0, 0.7)', variable: '--vd-color-opaque-black-700' },
        { name: '800', hex: 'rgba(0, 0, 0, 0.8)', variable: '--vd-color-opaque-black-800' },
        { name: '900', hex: 'rgba(0, 0, 0, 0.9)', variable: '--vd-color-opaque-black-900' },
        { name: '1000', hex: '#000000', variable: '--vd-color-opaque-black-1000' },
      ],
    },
    {
      name: 'Utilities',
      colors: [
        {
          name: 'Overlay',
          hex: 'rgba(255, 255, 255, 0.4)',
          variable: '--vd-color-utilities-overlay-corporate',
        },
      ],
    },
  ];
  mappedPalette: NestedColorPalette[] = [
    {
      name: 'Content (Text + Icon)',
      paletteType: [
        {
          name: 'Default',
          colors: [
            { name: 'Base', variable: '--vd-color-content-default-base', hex: '#0f172a' },
            { name: 'Secondary', variable: '--vd-color-content-default-secondary', hex: '#334155' },
            { name: 'Tertiary', variable: '--vd-color-content-default-tertiary', hex: '#475569' },
            { name: 'Disabled', variable: '--vd-color-content-default-disabled', hex: '#64748b' },
            {
              name: 'AlwaysLight',
              variable: '--vd-color-content-default-always-light',
              hex: '#fbfdff',
            },
            {
              name: 'AlwaysDark',
              variable: '--vd-color-content-default-always-dark',
              hex: '#0f172a',
            },
          ],
        },
        {
          name: 'Primary',
          colors: [
            { name: 'Base', variable: '--vd-color-content-primary-base', hex: '#ce2027' },
            { name: 'Secondary', variable: '--vd-color-content-primary-secondary', hex: '#a61a1f' },
            { name: 'Tertiary', variable: '--vd-color-content-primary-tertiary', hex: '#7c1317' },
            { name: 'OnBase', variable: '--vd-color-content-primary-on-base', hex: '#faf0f0' },
            {
              name: 'OnSecondary',
              variable: '--vd-color-content-primary-on-secondary',
              hex: '#7c1317',
            },
            {
              name: 'OnTertiary',
              variable: '--vd-color-content-primary-on-tertiary',
              hex: '#eca6a9',
            },
          ],
        },
        {
          name: 'Success',
          colors: [
            { name: 'Base', variable: '--vd-color-content-success-base', hex: '#0e8755' },
            { name: 'Secondary', variable: '--vd-color-content-success-secondary', hex: '#0b6c44' },
            { name: 'Tertiary', variable: '--vd-color-content-success-tertiary', hex: '#085133' },
            { name: 'OnBase', variable: '--vd-color-content-success-on-base', hex: '#e7f3ee' },
            {
              name: 'OnSecondary',
              variable: '--vd-color-content-success-on-secondary',
              hex: '#085133',
            },
            {
              name: 'OnTertiary',
              variable: '--vd-color-content-success-on-tertiary',
              hex: '#9fcfbb',
            },
          ],
        },
        {
          name: 'Error',
          colors: [
            { name: 'Base', variable: '--vd-color-content-error-base', hex: '#da1e28' },
            { name: 'Secondary', variable: '--vd-color-content-error-secondary', hex: '#ae1820' },
            { name: 'Tertiary', variable: '--vd-color-content-error-tertiary', hex: '#831218' },
            { name: 'OnBase', variable: '--vd-color-content-error-on-base', hex: '#fbe9ea' },
            {
              name: 'OnSecondary',
              variable: '--vd-color-content-error-on-secondary',
              hex: '#831218',
            },
            {
              name: 'OnTertiary',
              variable: '--vd-color-content-error-on-tertiary',
              hex: '#f0a5a9',
            },
          ],
        },
        {
          name: 'Warning',
          colors: [
            { name: 'Base', variable: '--vd-color-content-warning-base', hex: '#dc6600' },
            { name: 'Secondary', variable: '--vd-color-content-warning-secondary', hex: '#b05200' },
            { name: 'Tertiary', variable: '--vd-color-content-warning-tertiary', hex: '#843d00' },
            { name: 'OnBase', variable: '--vd-color-content-warning-on-base', hex: '#fcf0e6' },
            {
              name: 'OnSecondary',
              variable: '--vd-color-content-warning-on-secondary',
              hex: '#843d00',
            },
            {
              name: 'OnTertiary',
              variable: '--vd-color-content-warning-on-tertiary',
              hex: '#f1c299',
            },
          ],
        },
        {
          name: 'Info',
          colors: [
            { name: 'Base', variable: '--vd-color-content-info-base', hex: '#3172d4' },
            { name: 'Secondary', variable: '--vd-color-content-info-secondary', hex: '#275baa' },
            { name: 'Tertiary', variable: '--vd-color-content-info-tertiary', hex: '#1d447f' },
            { name: 'OnBase', variable: '--vd-color-content-info-on-base', hex: '#eaf1fb' },
            {
              name: 'OnSecondary',
              variable: '--vd-color-content-info-on-secondary',
              hex: '#1d447f',
            },
            { name: 'OnTertiary', variable: '--vd-color-content-info-on-tertiary', hex: '#adc7ee' },
          ],
        },
        {
          name: 'Neutral',
          colors: [
            { name: 'Base', variable: '--vd-color-content-neutral-base', hex: '#475569' },
            { name: 'Secondary', variable: '--vd-color-content-neutral-secondary', hex: '#334155' },
            { name: 'Tertiary', variable: '--vd-color-content-neutral-tertiary', hex: '#1e293b' },
            { name: 'OnBase', variable: '--vd-color-content-neutral-on-base', hex: '#fbfdff' },
            {
              name: 'OnSecondary',
              variable: '--vd-color-content-neutral-on-secondary',
              hex: '#334155',
            },
            {
              name: 'OnTertiary',
              variable: '--vd-color-content-neutral-on-tertiary',
              hex: '#f1f5f9',
            },
          ],
        },
      ],
    },
    {
      name: 'Background',
      paletteType: [
        {
          name: 'Default',
          colors: [
            { name: 'Base', variable: '--vd-color-background-default-base', hex: '#f1f5f9' },
            {
              name: 'Secondary',
              variable: '--vd-color-background-default-secondary',
              hex: '#ffffff',
            },
            {
              name: 'Tertiary',
              variable: '--vd-color-background-default-tertiary',
              hex: '#e2e8f0',
            },
            {
              name: 'AlwaysLight',
              variable: '--vd-color-background-default-always-light',
              hex: '#ffffff',
            },
            {
              name: 'AlwaysDark',
              variable: '--vd-color-background-default-always-dark',
              hex: '#0f172a',
            },
            {
              name: 'Disabled',
              variable: '--vd-color-background-default-disabled',
              hex: '#e2e8f0',
            },
          ],
        },
        {
          name: 'Primary',
          colors: [
            { name: 'Base', variable: '--vd-color-background-primary-base', hex: '#ce2027' },
            {
              name: 'BaseHover',
              variable: '--vd-color-background-primary-base-hover',
              hex: '#a61a1f',
            },
            {
              name: 'Secondary',
              variable: '--vd-color-background-primary-secondary',
              hex: '#f5d2d4',
            },
            {
              name: 'SecondaryHover',
              variable: '--vd-color-background-primary-secondary-hover',
              hex: '#eca6a9',
            },
            {
              name: 'Tertiary',
              variable: '--vd-color-background-primary-tertiary',
              hex: '#530d10',
            },

            {
              name: 'TertiaryHover',
              variable: '--vd-color-background-primary-tertiary-hover',
              hex: '#7c1317',
            },
          ],
        },
        {
          name: 'Success',
          colors: [
            { name: 'Base', variable: '--vd-color-background-success-base', hex: '#0e8755' },
            {
              name: 'BaseHover',
              variable: '--vd-color-background-success-base-hover',
              hex: '#0b6c44',
            },
            {
              name: 'Secondary',
              variable: '--vd-color-background-success-secondary',
              hex: '#cfe7dd',
            },
            {
              name: 'SecondaryHover',
              variable: '--vd-color-background-success-secondary-hover',
              hex: '#9fcfbb',
            },
            {
              name: 'Tertiary',
              variable: '--vd-color-background-success-tertiary',
              hex: '#063622',
            },
            {
              name: 'TertiaryHover',
              variable: '--vd-color-background-success-tertiary-hover',
              hex: '#085133',
            },
          ],
        },
        {
          name: 'Error',
          colors: [
            { name: 'Base', variable: '--vd-color-background-error-base', hex: '#da1e28' },
            {
              name: 'BaseHover',
              variable: '--vd-color-background-error-base-hover',
              hex: '#ae1820',
            },
            {
              name: 'Secondary',
              variable: '--vd-color-background-error-secondary',
              hex: '#f8d2d4',
            },
            {
              name: 'SecondaryHover',
              variable: '--vd-color-background-error-secondary-hover',
              hex: '#f0a5a9',
            },
            { name: 'Tertiary', variable: '--vd-color-background-error-tertiary', hex: '#570c10' },
            {
              name: 'TertiaryHover',
              variable: '--vd-color-background-error-tertiary-hover',
              hex: '#831218',
            },
          ],
        },
        {
          name: 'Warning',
          colors: [
            { name: 'Base', variable: '--vd-color-background-warning-base', hex: '#dc6600' },
            {
              name: 'BaseHover',
              variable: '--vd-color-background-warning-base-hover',
              hex: '#b05200',
            },
            {
              name: 'Secondary',
              variable: '--vd-color-background-warning-secondary',
              hex: '#f8e0cc',
            },
            {
              name: 'SecondaryHover',
              variable: '--vd-color-background-warning-secondary-hover',
              hex: '#f1c299',
            },
            {
              name: 'Tertiary',
              variable: '--vd-color-background-warning-tertiary',
              hex: '#582900',
            },
            {
              name: 'TertiaryHover',
              variable: '--vd-color-background-warning-tertiary-hover',
              hex: '#843d00',
            },
          ],
        },
        {
          name: 'Info',
          colors: [
            { name: 'Base', variable: '--vd-color-background-info-base', hex: '#3172d4' },
            {
              name: 'BaseHover',
              variable: '--vd-color-background-info-base-hover',
              hex: '#275baa',
            },
            {
              name: 'Secondary',
              variable: '--vd-color-background-info-secondary',
              hex: '#d6e3f6',
            },
            {
              name: 'SecondaryHover',
              variable: '--vd-color-background-info-secondary-hover',
              hex: '#adc7ee',
            },
            { name: 'Tertiary', variable: '--vd-color-background-info-tertiary', hex: '#142e55' },
            {
              name: 'TertiaryHover',
              variable: '--vd-color-background-info-tertiary-hover',
              hex: '#1d447f',
            },
          ],
        },
        {
          name: 'Neutral',
          colors: [
            { name: 'Base', variable: '--vd-color-background-neutral-base', hex: '#64748b' },
            {
              name: 'BaseHover',
              variable: '--vd-color-background-neutral-base-hover',
              hex: '#475569',
            },
            {
              name: 'Secondary',
              variable: '--vd-color-background-neutral-secondary',
              hex: '#e2e8f0',
            },
            {
              name: 'SecondaryHover',
              variable: '--vd-color-background-neutral-secondary-hover',
              hex: '#cbd5e1',
            },
            {
              name: 'Tertiary',
              variable: '--vd-color-background-neutral-tertiary',
              hex: '#1e293b',
            },
            {
              name: 'TertiaryHover',
              variable: '--vd-color-background-neutral-tertiary-hover',
              hex: '#334155',
            },
          ],
        },
        {
          name: 'Overlay',
          colors: [
            {
              name: 'Default',
              variable: '--vd-color-background-overlay-default',
              hex: 'rgba(255, 255, 255, 0.4)',
            },
          ],
        },
      ],
    },
    {
      name: 'Border',
      paletteType: [
        {
          name: 'Default',
          colors: [
            { name: 'Base', variable: '--vd-color-border-default-base', hex: '#64748b' },
            { name: 'Secondary', variable: '--vd-color-border-default-secondary', hex: '#94a3b8' },
            { name: 'Tertiary', variable: '--vd-color-border-default-tertiary', hex: '#cbd5e1' },
            { name: 'Disabled', variable: '--vd-color-border-default-disabled', hex: '#cbd5e1' },
          ],
        },
        {
          name: 'Primary',
          colors: [
            { name: 'Base', variable: '--vd-color-border-primary-base', hex: '#ce2027' },
            { name: 'Secondary', variable: '--vd-color-border-primary-secondary', hex: '#7c1317' },
            { name: 'Tertiary', variable: '--vd-color-border-primary-tertiary', hex: '#e2797d' },
          ],
        },
        {
          name: 'Success',
          colors: [
            { name: 'Base', variable: '--vd-color-border-success-base', hex: '#0e8755' },
            { name: 'Secondary', variable: '--vd-color-border-success-secondary', hex: '#085133' },
            { name: 'Tertiary', variable: '--vd-color-border-success-tertiary', hex: '#6eb799' },
          ],
        },
        {
          name: 'Neutral',
          colors: [
            { name: 'Base', variable: '--vd-color-border-neutral-base', hex: '#64748b' },
            { name: 'Secondary', variable: '--vd-color-border-neutral-secondary', hex: '#334155' },
            { name: 'Tertiary', variable: '--vd-color-border-neutral-tertiary', hex: '#94a3b8' },
          ],
        },
        {
          name: 'Error',
          colors: [
            { name: 'Base', variable: '--vd-color-border-error-base', hex: '#da1e28' },
            { name: 'Secondary', variable: '--vd-color-border-error-secondary', hex: '#831218' },
            { name: 'Tertiary', variable: '--vd-color-border-error-tertiary', hex: '#e9787e' },
          ],
        },
        {
          name: 'Warning',
          colors: [
            { name: 'Base', variable: '--vd-color-border-warning-base', hex: '#dc6600' },
            { name: 'Secondary', variable: '--vd-color-border-warning-secondary', hex: '#843d00' },
            { name: 'Tertiary', variable: '--vd-color-border-warning-tertiary', hex: '#eaa366' },
          ],
        },
        {
          name: 'Info',
          colors: [
            { name: 'Base', variable: '--vd-color-border-info-base', hex: '#3172d4' },
            { name: 'Secondary', variable: '--vd-color-border-info-secondary', hex: '#1d447f' },
            { name: 'Tertiary', variable: '--vd-color-border-info-tertiary', hex: '#83aae5' },
          ],
        },
      ],
    },
  ];

  colorUsageSnippet = `/* Using color tokens in CSS */
.button {
  background-color: var(--vd-color-background-primary-base);
  color: var(--vd-color-content-primary-on-base);
  border: var(--vd-scale-border-width-sm) solid var(--vd-color-border-primary-base);
}
.button i.vd-icon{
  color: var(--vd-color-content-primary-on-base);
}

.button:hover {
  background-color: var(--vd-color-background-primary-base-hover);
}`;

  themeSnippet = `<!-- Light theme (default) -->
<html>
  <!-- Uses light theme colors -->
</html>

<!-- Dark theme -->
<html data-theme="dark">
  <!-- Automatically uses dark theme colors -->
</html>`;

  brandSnippet = `<!-- Default brand -->
<html data-brand="consumer">
  <!-- Uses Vroxal Design brand colors -->
</html>

<!-- Other brand -->
<html data-brand="corporate">
  <!-- Uses other corporate brand colors -->
</html>`;

  tokenNamingSnippet = `--vd-color-{category}-{semantic}-{variant}

Examples:
  --vd-color-content-default-base
  --vd-color-background-error-secondary
  --vd-color-border-success-tertiary
  --vd-color-content-primary-on-base`;

  bestPracticeDoSnippet = `/* ✅ DO: Use semantic VD tokens */
.card {
  color: var(--vd-color-content-default-base);
  background-color: var(--vd-color-background-default-secondary);
  border: 1px solid var(--vd-color-border-default-tertiary);
}

.error-message {
  color: var(--vd-color-content-error-on-secondary);
  background-color: var(--vd-color-background-error-secondary);
}`;

  bestPracticeDontSnippet = `/* ❌ DON'T: Hardcode color values */
.card {
  color: #0f172a;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
}

.error-message {
  color: red;
  background-color: #fbe9ea;
}`;

  getTextColor(hexCode: string): string {
    let r = 255,
      g = 255,
      b = 255,
      a = 1;

    if (hexCode.startsWith('rgba') || hexCode.startsWith('rgb')) {
      const match = hexCode.match(/[\d.]+/g);
      if (match && match.length >= 3) {
        r = parseInt(match[0], 10);
        g = parseInt(match[1], 10);
        b = parseInt(match[2], 10);
        if (match.length >= 4) {
          a = parseFloat(match[3]);
        }
      }
    } else {
      const hex = hexCode.replace('#', '');
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }

    // Blend with white background (assuming light theme background)
    const bgR = 255,
      bgG = 255,
      bgB = 255;
    const blendedR = Math.round((1 - a) * bgR + a * r);
    const blendedG = Math.round((1 - a) * bgG + a * g);
    const blendedB = Math.round((1 - a) * bgB + a * b);

    const luminance = (0.299 * blendedR + 0.587 * blendedG + 0.114 * blendedB) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }
}
