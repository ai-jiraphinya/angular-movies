import {Routes} from '@angular/router';
// import { RouteISRConfig } from 'ngx-isr';

export const ROUTES: Routes = [
  /**
   * **🚀 Perf Tip for TTI, TBT:**
   *
   * If you have routes with the same UI but different data implement it with 2 parameters instead of 2 different routes.
   * This saves creation-time and destruction-time of the component and also render work in the browser.
   *
   * E.g.:
   *
   * _Bad_
   *  {
   *  path: 'list-category/:category',
   *  loadComponent: import('list.component')
   *  },
   *  {
   *  path: 'list-genre/:genre',
   *  loadComponent: import('list.component')
   *  }
   *
   * _Good_
   * {
   *  path: 'list/:type/:identifier',
   *  loadComponent: import('list.component')
   *  }
   *
   */
  {
    path: 'list/:type/:identifier',
    loadComponent: () =>
      import('./pages/movie-list-page/movie-list-page.component'),
    // data: { revalidate: 10 } as RouteISRConfig
  },
  {
    path: 'detail/movie/:identifier',
    loadComponent: () =>
      import('./pages/movie-detail-page/movie-detail-page.component'),
  },
  {
    path: 'detail/list/:identifier',
    loadChildren: () =>
      import(
        './pages/account-feature/list-detail-page/list-detail-page.routes'
        ),
  },
  {
    path: 'detail/person/:identifier',
    loadComponent: () =>
      import('./pages/person-detail-page/person-detail-page.component'),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account-feature/account-feature-page.routes'),
  },
  {
    path: 'page-not-found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component'),
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];
