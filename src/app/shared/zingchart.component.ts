import {Directive, Input, NgZone, AfterViewInit, OnDestroy, HostBinding} from '@angular/core';
import {ZingChartModel} from "./chart.element"

declare let zingchart: any;

@Directive({
	selector : 'zing-chart'
})
export class ZingChartDirective implements AfterViewInit, OnDestroy {
	@Input()
	chart : ZingChartModel;

	@HostBinding('id')
	get something() {
		return this.chart.id;
	}

	constructor(private zone: NgZone) {}

	ngAfterViewInit() {
		this.zone.runOutsideAngular(() => {
			zingchart.render({
				id : this.chart.id,
				data : this.chart.data,
				width : this.chart.width,
				height: this.chart.height
			});
		});
	}

	ngOnDestroy() {
		zingchart.exec(this.chart.id, 'destroy');
	}
}