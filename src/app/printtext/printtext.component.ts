import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printtext',
  templateUrl: './printtext.component.html',
  styleUrls: ['./printtext.component.less']
})
export class PrinttextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formatText(inputText : string) : string {
    return ("Formatted String" + " " + inputText)
  }

}
