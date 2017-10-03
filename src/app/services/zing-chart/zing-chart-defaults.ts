/* tslint:disable:quotemark */


/**
 * Container of various zingchart config / theme stuff
 */
export interface ZingChartDefaults {
  /**
   * theme defaults, to be set as .defaults input of zingchart.render()
   * See https://www.zingchart.com/docs/tutorials/design-and-styling/javascript-chart-themes/
   */
  theme?: {
    /** palettes*/
    palette?: any;

    /**
     * any styling (and only styling!) properties of any graphset child.
     * should reflect the hierarchy of graphset as described in
     * https://www.zingchart.com/docs/api/json-configuration/graphset
     * If a property has no effect, try adding it to the .config.graphset property described below.
     */
    graph?: any;
  };

  /**
   * default chart config.
   * to be merged with the .data input of zingchart.render()
   * See https://www.zingchart.com/docs/api/json-configuration/
   * and http://cdn.zingchart.io/docs/reference/zingchart-defaults/
   */
  config?: {
    globals?: any;
    gui?: any;
    graphset?: any;
  }
};


/** Zing-Chart default configuration for all chart types */
export const ZING_CHART_DEFAULTS: ZingChartDefaults = {
  theme: {
    palette: {
      line: [
        ['#FBFCFE', '#00BAF2', '#00BAF2', '#00a7d9'], /* light blue */
        ['#FBFCFE', '#E80C60', '#E80C60', '#d00a56'], /* light pink */
        ['#FBFCFE', '#9B26AF', '#9B26AF', '#8b229d'], /* light purple */
        ['#FBFCFE', '#E2D51A', '#E2D51A', '#E2D51A'], /* med yellow */
        ['#FBFCFE', '#FB301E', '#FB301E', '#e12b1b'], /* med red */
        ['#FBFCFE', '#00AE4D', '#00AE4D', '#00AE4D'], /* med green */
      ]
    },
    graph: {
      // do not put anything in here, it is unpredictable whether it has an effect or not!
    }
  },
  config: {
    globals: {
      'font-family': 'FrutigerNext'
    },
    graphset: {
      backgroundColor: 'white',
      crosshairX: {
        visible: true,
      },
      legend: {
        visible: true,
        toggleAction: 'disabled',
        draggable: true,
        dragHandler: 'icon',
      },
      plot: {
        'animation': {
          'effect': 'ANIMATION_SLIDE_BOTTOM',
          'sequence': 0,
          'speed': 800,
          'delay': 800
        },
        decimals: 3,
        decimalsSeparator: '.',
        legendItem: {},
        thousandsSeparator: "'",
        tooltip: {
          'visible': true,
          'text': '%scale-key-label: %v',
          decimals: 3,
        },
      },
      plotarea: {
        'margin': 'dynamic'
      },
      scaleX: {
        'item': {
          'offsetY': -2
        },
        'label': {
          'bold': true,
          'font-size': '15px',
          'font-color': '#7E7E7E',
        },
      },
      scaleY: {
        'guide': {
          'visible': true
        },
        'label': {
          'bold': true,
          'font-size': '15px',
          'font-color': '#7E7E7E',
        },
      },
      series: {
        'alpha': 0.95,
        'background-color': '#8993c7',
      },
      title: {
        'font-color': '#7E7E7E',
        'font-weight': 'normal',
        'backgroundColor': 'none',
        'font-size': '24px',
        'alpha': 1,
        'adjust-layout': true,
      },
    },
    gui: {
      contextMenu: {}
    },
  }
};


/** Zing-chart default theme configuration specific to chart types */
export const ZING_CHART_TYPE_DEFAULTS: { [type: string]: ZingChartDefaults } = {
  bar: {
    config: {
      graphset: {
        crosshairX: {
          visible: false,
        },
      }
    }
  }
};


export const ZING_CHART_OPTIONS_CONFIGURATION: { [type: string]: ZingChartDefaults } = {
  scaleXDate: {
    theme: {
      graph: {
        scaleX: {
          transform: {
            type: 'date',
            all: '%dd.%mm.%Y'
          }
        }
      }
    }
  }
};
