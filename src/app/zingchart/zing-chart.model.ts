export class ZingChartModel {
  public id: String;
  public data: Object;
  public height: any;
  public width: any;
  public defaults: any;
  public customprogresslogo: string;
  public events: any;

  constructor(config: Object) {
    this.id = config['id'];
    this.data = config['data'];
    this.height = config['height'] || '100%';
    this.width = config['width'] || '100%';
    if (config['defaults']) {
      this.defaults = config['defaults'];
    }
  }
}
