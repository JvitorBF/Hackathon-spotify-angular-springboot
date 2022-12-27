import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Artist } from 'src/app/models/artist';

@Component({
  selector: 'app-artist-dialog-album',
  templateUrl: './artist-dialog-album.component.html',
  styleUrls: ['./artist-dialog-album.component.css'],
})
export class ArtistDialogAlbumComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Artist,
    public dialogRef: MatDialogRef<ArtistDialogAlbumComponent>
  ) {}

  ngOnInit(): void {}

  onCancel() {
    this.dialogRef.close();
  }
}
