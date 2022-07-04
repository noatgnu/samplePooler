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
      type: "bar",
      marker: {
        color: []
      }
    }
    const tickVals: string[] = []
    const tickTexts: string[] = []
    for (const c in value) {
      graphData.x.push(c)
      graphData.y.push(value[c])
      graphData.marker.color.push("#898AA6")
      tickVals.push(c)
      tickTexts.push(c)
    }
    const lowestInd = Math.min(...graphData.y)
    const maxInd = Math.max(...graphData.y)
    for (let i = 0; i < graphData.y.length; i++) {
      if (lowestInd === graphData.y[i]) {
        graphData.marker.color[i] = "#D6EFED"
      } else if (maxInd === graphData.y[i]) {
        graphData.marker.color[i] = "#F2D7D9"
      }
    }
    console.log(graphData)
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
