import { AlbumService } from './../../services/album.service';
import { MatDialog } from '@angular/material/dialog';
import { ArtistService } from './../../services/artist.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Artist } from 'src/app/models/artist';
import { ArtistDialogComponent } from 'src/app/components/artist-dialog/artist-dialog.component';
import { ArtistDialogAlbumComponent } from 'src/app/components/artist-dialog-album/artist-dialog-album.component';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css'],
  providers: [ArtistService, AlbumService],
})
export class ArtistaComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['posicao', 'nome', 'acoes'];
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
              posicao: null,
              nome_artista: '',
              album: [],
            }
          : {
              id: artist.id,
              posicao: artist.posicao,
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
        posicao: artist.posicao,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        let artist: Artist | undefined;

        artist = this.dataSource.find((x) => x.id == result.id);

        this.albumService.getAlbum(result.album).subscribe((data: Album) => {
          artist?.album.push(data);
          this.artistService.putArtistAlbum(result.id, artist).subscribe();
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
