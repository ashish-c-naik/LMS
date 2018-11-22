import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowseComponent } from './browse/browse.component';
import { IssueHistoryComponent } from './issue-history/issue-history.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { RegisterBookComponent } from './register-book/register-book.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardLogin } from './auth.guard.login';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardLogin],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'issue_history',
    component: IssueHistoryComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
  },
  {
    path: 'account_details',
    component: AccountDetailsComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
  },
  {
    path: 'register_book',
    component: RegisterBookComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
  },
  {
    path: 'browse/:id',
    component: BrowseComponent
  },
  {
    path: '**',
    component: BrowseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
