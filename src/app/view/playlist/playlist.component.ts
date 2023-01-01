import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { PlaylistDialogMusicComponent } from 'src/app/components/playlist-dialog-music/playlist-dialog-music.component';
import { Music } from 'src/app/models/music';
import { Playlist } from 'src/app/models/playlist';

import { PlaylistDialogComponent } from './../../components/playlist-dialog/playlist-dialog.component';
import { MusicService } from './../../services/music.service';
import { PlaylistService } from './../../services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  providers: [PlaylistService, MusicService],
})
export class PlaylistComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'usuario', 'acoes'];
  dataSource!: Playlist[];

  constructor(
    public dialog: MatDialog,
    public playlistService: PlaylistService,
    public musicService: MusicService
  ) {
    this.playlistService.getPlaylists().subscribe((data: Playlist[]) => {
      this.dataSource = data;
    });
  }

  ngOnInit(): void {}

  openDialog(playlist: Playlist | null): void {
    const dialogRef = this.dialog.open(PlaylistDialogComponent, {
      width: '250px',
      data:
        playlist === null
          ? {
              nome_playlist: '',
              descricao: '',
              usuario: null,
              musica: [],
            }
          : {
              id: playlist.id,
              nome_playlist: playlist.nome_playlist,
              descricao: playlist.descricao,
              usuario: playlist.usuario,
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (this.dataSource.map((p) => p.id).includes(result.id)) {
          this.playlistService
            .putPlaylist(result.id, result)
            .subscribe((data: Playlist) => {
              const index = this.dataSource.findIndex(
                (p) => p.id === result.id
              );
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.playlistService
            .postPlaylist(result)
            .subscribe((data: Playlist) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
        }
      }
    });
  }

  openDialogMusic(playlist: Playlist): void {
    const dialogRef = this.dialog.open(PlaylistDialogMusicComponent, {
      width: '250px',
      data: {
        id: playlist.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
        this.musicService.getMusic(result.musica).subscribe((data: Music) => {
          this.playlistService.putPlaylistMusic(result.id, data.id).subscribe();
        });
      }
    });
  }

  editElement(playlist: Playlist): void {
    this.openDialog(playlist);
  }

  deleteElement(id: number): void {
    this.playlistService.deletePlaylist(id).subscribe(() => {
      this.dataSource = this.dataSource.filter((p) => p.id !== id);
    });
  }
}
