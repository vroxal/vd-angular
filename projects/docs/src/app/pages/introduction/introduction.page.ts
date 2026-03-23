import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import DocPageHeader from '../../components/doc-page-header/doc-page-header.component';
import { RouterModule } from '@angular/router';

import { INTRODUCTION_PAGE_SECTIONS } from '../../shared/navigation/navigation.config';

@Component({
  standalone: true,
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
  imports: [DocPageHeader, CommonModule, RouterModule],
})
export default class IntroductionPage {
  sections = INTRODUCTION_PAGE_SECTIONS as Array<{
    title?: string;
    showTitle?: boolean;
    items: Array<{
      label: string;
      route?: string;
      image?: string;
    }>;
  }>;
}
