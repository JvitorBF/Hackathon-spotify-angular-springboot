import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Music } from 'src/app/models/music';

@Component({
  selector: 'app-music-dialog',
  templateUrl: './music-dialog.component.html',
  styleUrls: ['./music-dialog.component.css'],
})
export class MusicDialogComponent implements OnInit {
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Music,
    public dialogRef: MatDialogRef<MusicDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.id != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
