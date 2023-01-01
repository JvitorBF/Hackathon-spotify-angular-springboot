import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ArtistDialogAlbumComponent } from 'src/app/components/artist-dialog-album/artist-dialog-album.component';
import { ArtistDialogComponent } from 'src/app/components/artist-dialog/artist-dialog.component';
import { Album } from 'src/app/models/album';
import { Artist } from 'src/app/models/artist';

import { AlbumService } from './../../services/album.service';
import { ArtistService } from './../../services/artist.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css'],
  providers: [ArtistService, AlbumService],
})
export class ArtistaComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nome', 'acoes'];
  dataSource!: Artist[];

  constructor(
    public dialog: MatDialog,
    public artistService: ArtistService,
    public albumService: AlbumService
  ) {
    this.artistService.getArtists().subscribe((data: Artist[]) => {
      this.dataSource = data;
    });
  }

  ngOnInit(): void {}

  openDialog(artist: Artist | null): void {
    const dialogRef = this.dialog.open(ArtistDialogComponent, {
      width: '250px',
      data:
        artist === null
          ? {
              nome_artista: '',
              album: [],
            }
          : {
              id: artist.id,
              nome_artista: artist.nome_artista,
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (this.dataSource.map((a) => a.id).includes(result.id)) {
          this.artistService
            .putArtist(result.id, result)
            .subscribe((data: Artist) => {
              const index = this.dataSource.findIndex((a) => a.id === data.id);
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.artistService.postArtist(result).subscribe((data: Artist) => {
            this.dataSource.push(data);
            this.table.renderRows();
          });
        }
      }
    });
  }

  openDialogAlbum(artist: Artist): void {
    const dialogRef = this.dialog.open(ArtistDialogAlbumComponent, {
      width: '250px',
      data: {
        id: artist.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.albumService.getAlbum(result.album).subscribe((data: Album) => {
          console.log(data);
          this.artistService.putArtistAlbum(result.id, data.id).subscribe();
        });
      }
    });
  }

  editElement(artist: Artist): void {
    this.openDialog(artist);
  }

  deleteElement(id: number): void {
    this.artistService.deleteArtist(id).subscribe(() => {
      this.dataSource = this.dataSource.filter((a) => a.id !== id);
    });
  }
}
