import {
  Component, OnInit, ChangeDetectionStrategy, HostBinding, Input, NgZone, AfterViewInit,
  OnDestroy, EventEmitter, Output, ChangeDetectorRef
} from '@angular/core';
import {ZingChartService} from "../services/zing-chart/zing-chart.service"
import {ZingChartModel} from './zing-chart.model';
import {ZingChartOptions} from "../services/zing-chart/zing-chart-options.interface"

declare var zingchart: any;

/**
 * Component for rendering a zingchart.
 */
@Component({
  selector: 'rbtool-zingchart',
  templateUrl: './zingchart.component.html',
  styleUrls: ['./zingchart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZingchartComponent implements OnInit, AfterViewInit, OnDestroy {

  /** Chart configuration for the chart to be rendered */
  @Input() chart: ZingChartModel;

  /** Type of the zinghart. Used for retrieving the default configuration. */
  @Input() chartType: string;

  /** Options for customizing the chart default options */
  @Input() chartOptions: ZingChartOptions;

  /** Whether to disable the zooming functionality. Defaults to false. */
  @Input() disableZoom: boolean = false;

  /** Aspect ratio of the chart. Defaults to 16/10 */
  @Input() aspectRatio: number = 16 / 10;

  /** Event that emits when the chart rendering is done */
  @Output() chartRendered: EventEmitter<void> = new EventEmitter<void>();


  /** Id of the chart. Will be generated automatically */
  public id;

  /** Whether zingchart is currently rendering a chart or data has not been received yet. Used to show a loading indicator. */
  public loading: boolean = true;


  constructor(private zingChartService: ZingChartService, private zone: NgZone, private ref: ChangeDetectorRef) {
    this.id = this.zingChartService.generateChartId();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  ngOnDestroy() {
    if (!this.chart) {
      return;
    }
    this.zone.runOutsideAngular(() => {
      zingchart.exec(this.chart.id, 'destroy');
    });
  }

  /**
   * Renders the zingchart according to the configuration in this.chart
   */
  public renderChart() {
    this.loading = true;
    this.ref.markForCheck();

    // wait a tick in order to update the data bindings
    setTimeout(() => {
      if (!this.chart) {
        return;
      }
      this.chart.id = this.id;


      // apply default theme
      if (!this.chart.defaults) {
        if (!this.chartType) {
          throw new Error('Chart type needs to be set!');
        }
        this.chart.defaults = this.zingChartService.getDefaults(this.chartType, this.chartOptions);
      }

      // apply default config
      this.zingChartService.applyDefaultChartConfig(this.chart.data, this.chartType, this.chartOptions);

      this.chart.customprogresslogo = 'https://www.raiffeisen.ch/content/dam/www/rch/logo/rch-logo-lg-2x.png';
      this.chart.events = this.chart.events || {};
      this.chart.events.complete = () => {
        this.loading = false;
        this.chartRendered.emit();
        this.ref.markForCheck();
      };

      this.zone.runOutsideAngular(() => {
        zingchart.render(this.chart);
      });
    });

  }

  setLoading() {
    this.loading = true;
    this.ref.markForCheck();
  }

  /**
   * TODO: remove me as soon as https://github.com/angular/angular/pull/19279 is merged and released
   * @returns {string}
   */
  getNotLoading(): string {
    return (!this.loading).toString();
  }


}
