import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-part-dialog',
  templateUrl: './new-part-dialog.component.html',
  styleUrls: ['./new-part-dialog.component.scss']
})
export class NewPartDialogComponent implements OnInit {

  partForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    timeRequired: [null, Validators.required],
    img: [null, Validators.required],
    resultImg: [null, Validators.required],
    resultPart: [null]
  })

  constructor(
    public dialogRef: MatDialogRef<NewPartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isResultPart: boolean },
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  addAvailablePart(event: Event, isResultPart: boolean): void {
    if (event !== null) {
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          this.partForm.get(isResultPart ? 'resultImg' : 'img')?.setValue(reader.result);
        }
      };
    }
  }

  addPart(): void {
    if (this.partForm.valid) {
      this.dialogRef.close(this.partForm.value);
    }
  }

}
