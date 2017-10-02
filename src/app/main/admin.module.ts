import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ClarityModule} from 'clarity-angular';

import {AdminRoutingModule} from './admin-routing.module';
import {MainPageComponent} from './main-page/main-page.component';
import {AboutPageComponent} from "./about-page/about-page.component";
import {HelperModule} from '../helper/helper.module';
import {AuthModule} from '../auth/auth.module';

import {MainService} from './main.service';
import {AlertService} from '../alert.service';
import {StockService} from "../services/stock.service";
import {NewsService} from "../services/news.service";
import {LayoutComponent} from './layout/layout.component';

@NgModule({
	imports: [
		CommonModule,
		AdminRoutingModule,
		HelperModule,
		FormsModule,
		ClarityModule,
		AuthModule
	],
	declarations: [MainPageComponent, LayoutComponent, AboutPageComponent],
	providers: [
		MainService,
		AlertService,
		StockService,
		NewsService,
	]
})
export class AdminModule {
}
