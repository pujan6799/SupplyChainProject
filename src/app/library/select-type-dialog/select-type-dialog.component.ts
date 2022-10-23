import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

interface ISelectTypeData {
  title: string;
  bodyMessage: string;
  types: any[];
}

@Component({
  selector: 'app-select-type-dialog',
  templateUrl: './select-type-dialog.component.html',
  styleUrls: ['./select-type-dialog.component.scss']
})
export class SelectTypeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISelectTypeData
  ) { }

  ngOnInit(): void {
  }

}
