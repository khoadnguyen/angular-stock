import {TestBed, inject} from '@angular/core/testing';

import {ZingChartService} from './zing-chart.service';
import {ZING_CHART_DEFAULTS, ZING_CHART_TYPE_DEFAULTS} from './zing-chart-defaults';

describe('ZingChartService', () => {

  let zingChartService: ZingChartService;

  // define config that will be checked
  ZING_CHART_DEFAULTS.config['graphset']['legend2'] = {
    visible: true,
  }
  ZING_CHART_TYPE_DEFAULTS['test'] = {
    theme: {
      graph: {
        backgroundColor: 'blue',
      }
    },
    config: {
      graphset: {
        legend2: {
          visible: false,
          shadow: true,
          toggleAction: 'remove'
        },
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZingChartService]
    });
    zingChartService = TestBed.get(ZingChartService);
  });

  it('should be created', inject([ZingChartService], (service: ZingChartService) => {
    expect(service).toBeTruthy();
  }));

  it('should generate unique chart ids', () => {
    const id1 = zingChartService.generateChartId();
    const id2 = zingChartService.generateChartId();
    const id3 = zingChartService.generateChartId();

    expect(id1.length).toBeGreaterThan(0);
    expect(id2.length).toBeGreaterThan(0);
    expect(id3.length).toBeGreaterThan(0);
    expect(id1).not.toBe(id2);
    expect(id1).not.toBe(id3);
    expect(id2).not.toBe(id3);
  });

  it('should return default chart theme', () => {
    const defaultChartConfiguration = zingChartService.getDefaults(null);
    expect(defaultChartConfiguration).toBeTruthy();
    expect(defaultChartConfiguration['graph']).toBeDefined();
    expect(defaultChartConfiguration['palette']).toBeDefined();
  });

  it('should return default chart theme for chart type test', () => {
    const defaultChartConfiguration = zingChartService.getDefaults('test');
    expect(defaultChartConfiguration).toBeTruthy();
    expect(defaultChartConfiguration['graph']).toBeDefined();
    expect(defaultChartConfiguration['palette']).toBeDefined();
    expect(defaultChartConfiguration['graph']['backgroundColor']).toBe('blue',
        'should overwrite existing value');
  });

  it('should apply additional theme for scaleXDate', () => {
    const defaultChartConfiguration = zingChartService.getDefaults('line', {
      scaleXDate: false
    });
    const defaultChartConfigurationScale = zingChartService.getDefaults('line', {
      scaleXDate: true
    });
    expect(defaultChartConfiguration).toBeTruthy();
    expect(defaultChartConfigurationScale).toBeTruthy();
    if (defaultChartConfiguration['graph']
        && defaultChartConfiguration['graph']['scaleX']
        && defaultChartConfiguration['graph']['scaleX']['transform']
        && defaultChartConfiguration['graph']['scaleX']['transform']['type']
    ) {
      expect(defaultChartConfiguration['graph']['scaleX']['transform']['type']).not.toBe('date');
    }
    expect(defaultChartConfigurationScale['graph']['scaleX']['transform']['type']).toBe('date');
  });

  it('should apply the default configuration for a chart', () => {
    let myConfig = {
      'graphset': [
        {
          'type': 'bar',
          'title': {
            'text': 'label X',
          },
          'scale-y': {
            'label': {
              'text': 'label Y',
            }
          },
          'series': [],
        },
        {
          'type': 'line',
          'title': {
            'text': 'label X1',
          },
          'scale-y': {
            'label': {
              'text': 'label Y1',
            }
          },
          'series': [],
        }
      ]
    };

    zingChartService.applyDefaultChartConfig(myConfig, 'bar');

    expect(myConfig.graphset[0]['legend2']['visible']).toBe(true);
    expect(myConfig.graphset[1]['legend2']['visible']).toBe(true);

  });

  it('should apply the default configuration for a chart of type test', () => {
    let myConfig = {
      'graphset': [
        {
          'type': 'bar',
          'title': {
            'text': 'label X',
          },
          'scale-y': {
            'label': {
              'text': 'label Y',
            }
          },
          'series': [],
        },
        {
          'type': 'line',
          'title': {
            'text': 'label X1',
          },
          'scale-y': {
            'label': {
              'text': 'label Y1',
            }
          },
          'series': [],
        }
      ]
    };
    let myConfig2 = {
      'graphset': [
        {
          'type': 'bar',
          'title': {
            'text': 'label X',
          },
          'scale-y': {
            'label': {
              'text': 'label Y',
            }
          },
          'series': [],
          'legend2': {
            toggleAction: 'hide'
          }
        },
        {
          'type': 'line',
          'title': {
            'text': 'label X1',
          },
          'scale-y': {
            'label': {
              'text': 'label Y1',
            }
          },
          'series': [],
        }
      ]
    };

    zingChartService.applyDefaultChartConfig(myConfig, 'othertest');
    zingChartService.applyDefaultChartConfig(myConfig2, 'test');

    expect(myConfig.graphset[0]['legend2']['shadow']).toBeUndefined();
    expect(myConfig.graphset[1]['legend2']['shadow']).toBeUndefined();

    expect(myConfig2.graphset[0]['legend2']['shadow']).toBe(true);
    expect(myConfig2.graphset[1]['legend2']['shadow']).toBe(true);

    expect(myConfig.graphset[0]['legend2']['visible']).toBe(true);
    expect(myConfig2.graphset[0]['legend2']['visible']).toBe(false);
    expect(myConfig2.graphset[1]['legend2']['visible']).toBe(false,
        'type-specific config should take precedence');

    expect(myConfig2.graphset[0]['legend2']['toggleAction']).toBe('hide',
        'should not overwrite config already set!');

  });

});
