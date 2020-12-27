import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule } from 'angularx-qrcode';
import { JobsBadgeStatusComponent } from './jobs-badge-status/jobs-badge-status.component';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, SideNavComponent, JobsBadgeStatusComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    QRCodeModule
  ],
  providers: [

  ],
  exports: [
    CommonModule,
    TranslateModule,
    QRCodeModule,
    NavBarComponent,
    FooterComponent,
    SideNavComponent,
    JobsBadgeStatusComponent
  ]
})
export class SharedModule { }
