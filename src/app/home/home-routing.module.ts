import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { PoseDetectorComponent } from '../pose-detector/pose-detector.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePage,
  // },
  {
    path: '',
    component: PoseDetectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
