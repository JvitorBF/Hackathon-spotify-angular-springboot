import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AlbumDialogComponent } from 'src/app/components/album-dialog/album-dialog.component';
import { Album } from 'src/app/models/album';

import { AlbumService } from './../../services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nome', 'data', 'acoes'];
  dataSource!: Album[];

  constructor(public dialog: MatDialog, public albumService: AlbumService) {
    this.albumService.getAlbums().subscribe((data: Album[]) => {
      this.dataSource = data;
    });
  }

  ngOnInit(): void {}

  openDialog(album: Album | null): void {
    const dialogRef = this.dialog.open(AlbumDialogComponent, {
      width: '250px',
      data:
        album === null
          ? {
              nome_album: '',
              data: '',
            }
          : {
              id: album.id,
              nome_album: album.nome_album,
              data: album.data,
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (this.dataSource.map((a) => a.id).includes(result.id)) {
          this.albumService
            .putAlbum(result.id, result)
            .subscribe((data: Album) => {
              const index = this.dataSource.findIndex((a) => a.id === data.id);
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.albumService.postAlbum(result).subscribe((data: Album) => {
            this.dataSource.push(data);
            this.table.renderRows();
          });
        }
      }
    });
  }

  editElement(album: Album): void {
    this.openDialog(album);
  }

  deleteElement(id: number): void {
    this.albumService.deleteAlbum(id).subscribe(() => {
      this.dataSource = this.dataSource.filter((a) => a.id !== id);
    });
  }
}
