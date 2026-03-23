import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VdNavbar, VdIconButton, VdDatatableColumn } from 'vd-angular';
import DocPageHeader from '../../../components/doc-page-header/doc-page-header.component';
import CodeContainer from '../../../components/code-container/code-container.component';

@Component({
  selector: 'app-navbar-page',
  standalone: true,
  imports: [CommonModule, FormsModule, VdNavbar, VdIconButton, DocPageHeader, CodeContainer],
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export default class NavbarPage {
  importCodeSnippet = 'import { VdNavbarComponent } from "vd-angular";';

  basicImplementationTemplateSnippet = `<vd-navbar>
  <div class="brand">My App</div>
  <div class="controls">
    <vd-icon name="vd-icon-sun" size="md"></vd-icon>
  </div>
</vd-navbar>`;

  apiData: any[] = [];
  outputData: any[] = [];

  apiColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'default', title: 'Default' },
    { key: 'required', title: 'Required' },
    { key: 'description', title: 'Description' },
  ];

  outputColumns: VdDatatableColumn[] = [
    { key: 'property', title: 'Property' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
  ];

  get codeSnippet(): string {
    return `<vd-navbar>
  <div style="font-weight: bold;">App Name</div>
  <div style="display: flex; gap: 16px;">
    <vd-icon name="vd-icon-menu" size="md"></vd-icon>
  </div>
</vd-navbar>`;
  }
}
