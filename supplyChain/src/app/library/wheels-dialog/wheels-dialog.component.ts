import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wheels-dialog',
  templateUrl: './wheels-dialog.component.html',
  styleUrls: ['./wheels-dialog.component.scss']
})
export class WheelsDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WheelsDialogComponent>
  ) { }

  ngOnInit(): void {
  }

}
