import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { VdToast, VdSidebar, VdNavbar, VdIcon } from 'vd-angular';
import { SIDEBAR_SECTIONS } from '../../shared/navigation/navigation.config';

type Brand = 'consumer' | 'business' | 'corporate';
type Theme = 'light' | 'dark';

@Component({
  standalone: true,
  selector: 'app-root', // MUST match index.html
  templateUrl: './docs-layout.component.html',
  styleUrls: ['./docs-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, VdNavbar, VdSidebar, VdToast, VdIcon],
})
export default class DocsLayoutComponent implements OnInit {
  protected readonly hasNavbar = true;
  protected readonly hasSidebar = true;
  protected readonly sections = SIDEBAR_SECTIONS;
  protected readonly brands: readonly Brand[] = ['consumer', 'business', 'corporate'];
  protected readonly themes: readonly Theme[] = ['light', 'dark'];

  protected selectedBrand: Brand = this.brands[0];
  protected selectedTheme: Theme = this.themes[0];

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    document.documentElement.setAttribute('data-brand', this.selectedBrand);
    document.documentElement.setAttribute('data-theme', this.selectedTheme);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => window.scrollTo(0, 0));
  }

  protected selectBrand(brand: Brand): void {
    this.selectedBrand = brand;
    document.documentElement.setAttribute('data-brand', brand);
  }

  protected selectTheme(theme: Theme): void {
    this.selectedTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }
}
