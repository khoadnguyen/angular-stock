import {Injectable} from '@angular/core';
import {ZingChartOptions} from './zing-chart-options.interface';
import {ZING_CHART_DEFAULTS, ZING_CHART_OPTIONS_CONFIGURATION, ZING_CHART_TYPE_DEFAULTS} from './zing-chart-defaults';

/**
 * Service for compiling theme / configuration of zing-charts
 */
@Injectable()
export class ZingChartService {

  static chartCounter = 0;

  constructor() {
    // window.ZC.BUILDCODE = ['f694df894685712d50111dfd7e43c9af1ae12d28', 'Raiffeisen Schweiz'];
  }

  generateChartId() {
    return 'chart-' + (++ZingChartService.chartCounter).toString();
  }

  /**
   * Returns the default chart theme for the chart type given.
   * @param {string} chartType
   * @param {string} additionalOptions
   * @returns {object}
   */
  getDefaults(chartType: string, additionalOptions?: ZingChartOptions): object {
    let chartTheme = {};

    // copy default configuration
    this.recursivelyCopyObject(ZING_CHART_DEFAULTS.theme, chartTheme);

    // copy type-specific configuration
    if (chartType && ZING_CHART_TYPE_DEFAULTS[chartType] && ZING_CHART_TYPE_DEFAULTS[chartType].theme) {
      this.recursivelyCopyObject(ZING_CHART_TYPE_DEFAULTS[chartType].theme, chartTheme, true);
    }

    // apply additional options
    this.applyAdditionalOptionsToTheme(chartTheme, chartType, additionalOptions);

    return chartTheme;
  }

  /**
   * Recursively copies default chart config to all 'graphset' elements.
   * Does not overwrite existing properties.
   * @param chartConfig
   * @param {string} chartType
   * @param {ZingChartOptions} additionalOptions
   */
  public applyDefaultChartConfig(chartConfig: any, chartType: string, additionalOptions?: ZingChartOptions): void {

    // copy type-specific config
    // do it before copying the default config in order to give type-specific config
    // priority, since overwrite=false
    if (chartType && ZING_CHART_TYPE_DEFAULTS[chartType]
        && ZING_CHART_TYPE_DEFAULTS[chartType].config
    ) {
      if (ZING_CHART_TYPE_DEFAULTS[chartType].config.graphset
          && chartConfig['graphset']) {
        chartConfig['graphset'].forEach(graphset => {
          this.recursivelyCopyObject(ZING_CHART_TYPE_DEFAULTS[chartType].config.graphset, graphset, false);
        });
      }
      if (ZING_CHART_TYPE_DEFAULTS[chartType].config.gui) {
        chartConfig.gui = chartConfig.gui || {};
        this.recursivelyCopyObject(ZING_CHART_TYPE_DEFAULTS[chartType].config.gui, chartConfig.gui, false);
      }
      if (ZING_CHART_TYPE_DEFAULTS[chartType].config.globals) {
        chartConfig.globals = chartConfig.globals || {};
        this.recursivelyCopyObject(ZING_CHART_TYPE_DEFAULTS[chartType].config.globals, chartConfig.globals, false);
      }
    }

    // copy default config
    chartConfig['graphset'].forEach(graphset => {
      this.recursivelyCopyObject(ZING_CHART_DEFAULTS.config.graphset, graphset, false);
    });
    if (ZING_CHART_DEFAULTS.config.gui) {
      chartConfig.gui = chartConfig.gui || {};
      this.recursivelyCopyObject(ZING_CHART_DEFAULTS.config.gui, chartConfig.gui, false);
    }
    if (ZING_CHART_DEFAULTS.config.globals) {
      chartConfig.globals = chartConfig.globals || {};
      this.recursivelyCopyObject(ZING_CHART_DEFAULTS.config.globals, chartConfig.globals, false);
    }

    this.applyAdditionalOptionsToConfig(chartConfig, chartType, additionalOptions);
  }

  /**
   * Merges  configuration parametrized by additional options to the chart configuration.
   *
   * @param theme theme config
   * @param {string} chartType
   * @param {ZingChartOptions} additionalOptions
   */
  private applyAdditionalOptionsToTheme(theme, chartType: string, additionalOptions: ZingChartOptions) {
    if (!additionalOptions) {
      return;
    }

    for (let i in additionalOptions) {
      if (additionalOptions.hasOwnProperty(i)) {
        if (additionalOptions[i] === true
            && ZING_CHART_OPTIONS_CONFIGURATION[i]
            && ZING_CHART_OPTIONS_CONFIGURATION[i].theme
        ) {
          this.recursivelyCopyObject(ZING_CHART_OPTIONS_CONFIGURATION[i].theme, theme, true);
        }
      }
    }
  }


  /**
   * Merges  configuration parametrized by additional options to the chart configuration.
   *
   * @param chartConfig chart config
   * @param {string} chartType
   * @param {ZingChartOptions} additionalOptions
   */
  private applyAdditionalOptionsToConfig(chartConfig, chartType: string, additionalOptions: ZingChartOptions) {
    if (!additionalOptions) {
      return;
    }

    for (let i in additionalOptions) {
      if (additionalOptions.hasOwnProperty(i)) {
        if (additionalOptions[i] === true
            && ZING_CHART_OPTIONS_CONFIGURATION[i]
            && ZING_CHART_OPTIONS_CONFIGURATION[i].config
        ) {
          if (ZING_CHART_OPTIONS_CONFIGURATION[i].config.graphset && chartConfig['graphset']) {
            chartConfig['graphset'].forEach(graphset => {
              this.recursivelyCopyObject(ZING_CHART_OPTIONS_CONFIGURATION[i].config.graphset, graphset, false);
            });
          }
          if (ZING_CHART_OPTIONS_CONFIGURATION[i].config.gui) {
            chartConfig.gui = chartConfig.gui || {};
            this.recursivelyCopyObject(ZING_CHART_OPTIONS_CONFIGURATION[i].config.gui, chartConfig, false);
          }
          if (ZING_CHART_OPTIONS_CONFIGURATION[i].config.globals) {
            chartConfig.globals = chartConfig.globals || {};
            this.recursivelyCopyObject(ZING_CHART_OPTIONS_CONFIGURATION[i].config.globals, chartConfig, false);
          }
        }
      }
    }
  }

  /**
   * Recursively copies properties of an source object to a target object
   * @param source object
   * @param target object
   * @param overwrite whether a property should be overwritten if it exists on the target
   */
  private recursivelyCopyObject(source: any, target: any, overwrite = false): void {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        // if we want to overwrite an already existing key or the key does not exist yet
        if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target.hasOwnProperty(key)) {
            target[key] = {};
          }
          this.recursivelyCopyObject(source[key], target[key], overwrite);
        } else if (overwrite || !target.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }
  }

}
