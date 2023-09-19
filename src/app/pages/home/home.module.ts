import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PagesSharedModule } from 'src/app/common/shared/pages-shared.module';
import { VideoListComponent } from 'src/app/components/video-list/video-list.component';
import { VideoPlayerComponent } from 'src/app/components/video-player/video-player.component';

@NgModule({
  declarations: [HomeComponent, VideoListComponent, VideoPlayerComponent],
  imports: [
    PagesSharedModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeModule {}
