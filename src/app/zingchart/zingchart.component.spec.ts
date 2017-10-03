import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZingchartComponent } from './zingchart.component';
import { MainTestingModule } from '../../../main-testing.module';
import { ZingChartModel } from './zing-chart.model';

describe('ZingchartComponent', () => {
  let component: ZingchartComponent;
  let fixture: ComponentFixture<ZingchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MainTestingModule
      ],
      // declarations: [ ZingchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZingchartComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render a zingchart', (done) => {
    let chartRendered = false;
    component.chart = new ZingChartModel({
      width: 400,
      height: 300,
      data: {
        'graphset': [{
          'type': 'bar',
          'title': { 'text': 'Chart Title' },
          'series': [{
            'values': [ 0.4, 0.6 ],
          }]
        }]
      }
    });
    component.chartType = 'bar';
    component.chartRendered.subscribe(() => {
      chartRendered = true;
      const svgImage = fixture.nativeElement.querySelector('svg');
      expect(svgImage).toBeTruthy();
      done();
    });
    fixture.detectChanges();
  });

});
