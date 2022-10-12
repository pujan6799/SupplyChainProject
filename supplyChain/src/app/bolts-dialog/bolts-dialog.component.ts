import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  title: string;
  bodyMessage: string;
  showBoltTypes: boolean;
  boltTypes: {
    name: string;
    isAvailable: boolean;
  }[];
}
@Component({
  selector: 'app-bolts-dialog',
  templateUrl: './bolts-dialog.component.html',
  styleUrls: ['./bolts-dialog.component.scss']
})
export class BoltsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BoltsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
  }

  selectBoltType(boltType: {
    name: string;
    isAvailable: boolean;
  }): void {
    this.dialogRef.close(boltType);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
