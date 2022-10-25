import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-part-dialog',
  templateUrl: './new-part-dialog.component.html',
  styleUrls: ['./new-part-dialog.component.scss'],
})
export class NewPartDialogComponent implements OnInit {
  partForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    timeRequired: [null, Validators.required],
    img: [null, Validators.required],
    resultImg: [null, Validators.required],
    resultPart: [null],
  });

  constructor(
    public dialogRef: MatDialogRef<NewPartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isResultPart: boolean },
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  /**
   * @description Whenever user selects an Part image this method will get invoked
   * @param event event will hold file related data
   * @param isResultPart To identify if user has selected Result Part
   */
  addAvailablePart(event: Event, isResultPart: boolean): void {
    if (event !== null) {
      // Casting event.target as HTMLInputElement
      const target = event.target as HTMLInputElement;
      // Fetching user selected FIle
      const file: File = (target.files as FileList)[0];
      // Creating new FileReader
      const reader = new FileReader();
      // Converting Image Data to string
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          // After image to string conversion is complete, setting string value in partForm
          this.partForm
            .get(isResultPart ? 'resultImg' : 'img')
            ?.setValue(reader.result);
        }
      };
    }
  }

  /**
   * @description IF part form is valid (User has entered all necessary data) then sending that data back to parent component
   */
  addPart(): void {
    if (this.partForm.valid) {
      this.dialogRef.close(this.partForm.value);
    }
  }
}
