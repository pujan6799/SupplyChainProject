import { FABRIC_TYPES } from './../../../shared/constants/car.constants';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-interior-dialog',
  templateUrl: './interior-dialog.component.html',
  styleUrls: ['./interior-dialog.component.scss'],
})
export class InteriorDialogComponent implements OnInit {
  fabrics = FABRIC_TYPES;
  constructor(public dialogRef: MatDialogRef<InteriorDialogComponent>) {}

  ngOnInit(): void {}
}
