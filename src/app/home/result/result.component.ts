import { Component, Input, OnInit } from '@angular/core';
import { IConfiguration } from 'src/shared/interface/car.interface';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input() selectedColor = ''; // Input from Parent component i.e, Home Component
  @Input() configuration!: IConfiguration; // Input from Parent component i.e, Home Component
  constructor() {}

  ngOnInit(): void {}
}
