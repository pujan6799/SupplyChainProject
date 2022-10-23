import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-car-color',
  templateUrl: './car-color.component.html',
  styleUrls: ['./car-color.component.scss']
})
export class CarColorComponent implements OnInit {

  @Output() carColorSelected = new EventEmitter<string>();
  colors = ['celestite', 'pearlWhite', 'black'];
  selectedCar = 'assets/stage3/resultOfExterior.jpg';
  colorSelected = false;
  constructor() { }

  ngOnInit(): void {
  }

  selectColor(color: string): void {
    this.colorSelected = true;
    this.selectedCar = `assets/stage4/${color}.jpg`
    this.carColorSelected.emit(this.selectedCar);
  }

}
