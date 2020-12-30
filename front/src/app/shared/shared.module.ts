import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, SideNavComponent],
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
  ]
})
export class SharedModule { }
