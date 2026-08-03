import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { VdIcon } from '../vd-icon/vd-icon.component';
import { VdDivider } from '../vd-divider/vd-divider.component';
import { filter, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type VdSidebarRouteMatchMode = 'exact' | 'prefix';

export interface VdSidebarNavItem {
  label: string;
  route?: string;
  matchMode?: VdSidebarRouteMatchMode;
  icon?: string; // icon name (optional)
  children?: VdSidebarNavItem[]; // nested items
}

export interface VdSidebarNavSection {
  title?: string;
  items: VdSidebarNavItem[];
  showTitle?: boolean; // Optional: defaults to true if not specified
}

@Component({
  standalone: true,
  selector: 'vd-sidebar',
  templateUrl: './vd-sidebar.component.html',
  styleUrl: './vd-sidebar.component.scss',
  imports: [CommonModule, RouterModule, VdIcon, VdDivider],
})
export class VdSidebar implements OnInit, OnDestroy {
  @Input() sections: VdSidebarNavSection[] = [];
  @Input() showBrand: boolean = false;

  expandedItems = new Set<string>(); // Track which items are expanded
  currentRoute: string = '';
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set initial route
    this.currentRoute = this.router.url;
    this.updateExpandedState();

    // Listen to route changes
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
        this.updateExpandedState();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleExpand(label: string, event?: Event): void {
    // Prevent default link behavior if event is passed
    if (event) {
      event.stopPropagation();
    }
    if (this.expandedItems.has(label)) {
      this.expandedItems.delete(label);
    } else {
      this.expandedItems.add(label);
    }
  }

  isExpanded(label: string): boolean {
    return this.expandedItems.has(label);
  }

  isRouteActive(
    route: string | undefined,
    matchMode: VdSidebarRouteMatchMode = 'exact',
  ): boolean {
    if (!route) {
      return false;
    }

    const currentRoute = this.normalizeRoute(this.currentRoute);
    const targetRoute = this.normalizeRoute(route);

    if (matchMode === 'prefix') {
      return (
        currentRoute === targetRoute ||
        currentRoute.startsWith(`${targetRoute}/`) ||
        currentRoute.startsWith(`${targetRoute}?`)
      );
    }

    return currentRoute === targetRoute;
  }

  isItemActive(item: VdSidebarNavItem): boolean {
    return this.isRouteActive(item.route, item.matchMode);
  }

  trackBySection = (_: number, section: VdSidebarNavSection): string =>
    section.title ?? String(_);

  trackByItem = (_: number, item: VdSidebarNavItem): string => item.label;

  isChildActive(item: VdSidebarNavItem): boolean {
    if (!item.children || item.children.length === 0) {
      return false;
    }
    return item.children.some((child: VdSidebarNavItem) => this.isItemActive(child));
  }

  private updateExpandedState(): void {
    // Collapse all items first
    this.expandedItems.clear();

    // Expand items that have active children or active parent route
    this.sections.forEach((section) => {
      section.items.forEach((item) => {
        if (this.isItemActive(item) || this.isChildActive(item)) {
          this.expandedItems.add(item.label);
        }
      });
    });
  }

  private normalizeRoute(route: string): string {
    const [routeWithoutFragment] = route.split('#');
    const [path, query] = routeWithoutFragment.split('?');
    const normalizedPath = this.normalizePath(path);

    return query ? `${normalizedPath}?${query}` : normalizedPath;
  }

  private normalizePath(path: string): string {
    if (!path || path === '/') {
      return '/';
    }

    const pathWithLeadingSlash = path.startsWith('/') ? path : `/${path}`;
    return pathWithLeadingSlash.replace(/\/+$/, '');
  }
}
