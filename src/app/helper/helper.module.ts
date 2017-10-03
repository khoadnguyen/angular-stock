import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToDatePipe} from './to-date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToDatePipe],
  exports: [ToDatePipe]
})
export class HelperModule {
}
