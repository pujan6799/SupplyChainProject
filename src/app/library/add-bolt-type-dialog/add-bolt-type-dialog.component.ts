import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bolt-type-dialog',
  templateUrl: './add-bolt-type-dialog.component.html',
  styleUrls: ['./add-bolt-type-dialog.component.scss'],
})
export class AddBoltTypeDialogComponent implements OnInit {
  boltForm = this.fb.group({
    name: [null, Validators.required],
    available: [true],
  });
  constructor(
    public dialogRef: MatDialogRef<AddBoltTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  addBoltType(): void {
    if (this.boltForm.valid) {
      this.dialogRef.close(this.boltForm.value);
    }
  }
}
