import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBolt } from 'src/shared/interface/car.interface';
interface DialogData {
  boltTypes: IBolt[];
}
@Component({
  selector: 'app-bolt-types-dialog',
  templateUrl: './bolt-types-dialog.component.html',
  styleUrls: ['./bolt-types-dialog.component.scss']
})
export class BoltTypesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BoltTypesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
  }

  selectBolt(bolt: IBolt): void {
    this.dialogRef.close(bolt);
  }

}
