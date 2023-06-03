import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mobile-dialog',
  templateUrl: './mobile-dialog.component.html',
  styleUrls: ['./mobile-dialog.component.scss']
})
export class MobileDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MobileDialogComponent>,
  ){}

  closeDialog(): void {
    this.dialogRef.close();
  }

} 
