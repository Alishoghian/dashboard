import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
        import('./pages/dashboard/dashboard.module').then(
            m => m.DashboardModule,
        ),
  },
  {
    path: 'charts',
    loadChildren: () =>
        import('./pages/charts/charts.module').then(
            m => m.ChartsModule,
        ),
  },
  {
    path: 'Login',
    loadChildren: () =>
        import('./pages/login/login.module').then(
            m => m.LoginModule,
        ),
  },
  {
    path: 'dynamic',
    loadChildren: () =>
        import('./pages/dynamic/dynamic.module').then(
            m => m.DynamicModule,
        ),
  },
  {
    path:'',
    redirectTo:'Login',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'Login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,preloadingStrategy: PreloadAllModules}),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
