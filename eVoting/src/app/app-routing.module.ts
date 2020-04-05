import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateVoteComponent } from './create-vote/create-vote.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
   {
    path: 'vote', children: [
      {
        path: 'create', component: CreateVoteComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
