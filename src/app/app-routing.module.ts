import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormationComponent } from './formation/formation.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
    {path:'formation',component:FormationComponent},
    {path:'login',component:LoginComponent},
    {path:'admin', component:AdminComponent },
    {path:'detail/:id', component:DetailComponent },

  {path:'**',component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
