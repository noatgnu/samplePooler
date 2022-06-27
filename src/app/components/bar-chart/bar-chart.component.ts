import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  graphData: any[] = []
  graphLayout: any = {
    height: 700,
    margin: {l: 50, r: 50, t:50, b:100},
    xaxis: {
      tickfont: {
        size: 17,
        color: "black",
      },
      tickvals: [],
      ticktext: []
    },
    yaxis: {
      tickfont: {
        size: 17,
        color: "black",
      },
    },
  }

  private _data: any = {}

  @Input() set data(value: any) {
    this._data = value
    const graphData: any = {
      x: [],
      y: [],
      type: "bar"
    }
    const tickVals: string[] = []
    const tickTexts: string[] = []
    for (const c in value) {
      graphData.x.push(c)
      graphData.y.push(value[c])
      tickVals.push(c)
      tickTexts.push(c)
    }
    this.graphLayout.xaxis.ticktext = tickTexts
    this.graphLayout.xaxis.tickvals = tickVals
    this.graphData = [graphData]
  }

  get data(): any {
    return this._data
  }

  constructor() { }

  ngOnInit(): void {
  }


}
