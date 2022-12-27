import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Playlist } from 'src/app/models/playlist';

@Component({
  selector: 'app-playlist-dialog-music',
  templateUrl: './playlist-dialog-music.component.html',
  styleUrls: ['./playlist-dialog-music.component.css'],
})
export class PlaylistDialogMusicComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Playlist,
    public dialogRef: MatDialogRef<PlaylistDialogMusicComponent>
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
