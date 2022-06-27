import {Component, OnInit} from '@angular/core';
import {InputFile} from "../../classes/input-file";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  inputFile: InputFile = new InputFile()
  minGoodSamples: number = 10
  sampleLists: string[] = []
  sampleSum: any = {}
  ratios: any = {}
  finished: boolean = false
  based_on: string = ""
  constructor() { }

  ngOnInit(): void {
  }

  handleOutput(f: InputFile) {
    this.inputFile = f
  }

  calculateSum() {
    this.finished = false
    const sampleSum: any = {}
    for (const c of this.sampleLists) {
      sampleSum[c] = 0
    }
    for (const r of this.inputFile.df) {
      let goodSampleCount = 0
      let total = 0
      const row: any = {}
      for (const c of this.sampleLists) {
        if (r[c] !== "") {
          row[c] = parseFloat(r[c])
          total = total + row[c]
          goodSampleCount ++
        }
      }
      if (goodSampleCount > this.minGoodSamples) {
        const average = total/goodSampleCount
        for (const c in row) {
          sampleSum[c] = sampleSum[c] + row[c]/average
        }
      }
    }
    this.sampleSum = sampleSum
    const values: number[] = Object.values(this.sampleSum)
    const highestSample: string = Object.keys(this.sampleSum)[values.indexOf(Math.max(...values))]
    this.based_on = highestSample
    this.calculateRatio(highestSample)

  }

  calculateRatio(based_on: string) {
    const ratios: any = {}
    for (const c of this.sampleLists) {
      ratios[c] = this.sampleSum[based_on]/this.sampleSum[c]
    }
    this.ratios = ratios
    this.finished = true
  }

  setAsBase(based_on: string) {
    this.based_on = based_on
    this.calculateRatio(based_on)
  }
}
