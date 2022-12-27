import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MusicDialogComponent } from 'src/app/components/music-dialog/music-dialog.component';
import { Music } from 'src/app/models/music';

import { MusicService } from './../../services/music.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css'],
  providers: [MusicService],
})
export class MusicaComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nome', 'duracao', 'album', 'acoes'];
  dataSource!: Music[];
  constructor(public dialog: MatDialog, public musicService: MusicService) {
    this.musicService.getMusics().subscribe((data: Music[]) => {
      this.dataSource = data;
    });
  }

  ngOnInit(): void {}

  openDialog(music: Music | null): void {
    const dialogRef = this.dialog.open(MusicDialogComponent, {
      width: '250px',
      data:
        music === null
          ? {
              id: null,
              nome_musica: '',
              duracao: '',
              album: null,
            }
          : {
              id: music.id,
              nome_musica: music.nome_musica,
              duracao: music.duracao,
              album: music.album,
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (this.dataSource.map((m) => m.id).includes(result.id)) {
          this.musicService
            .putMusic(result.id, result)
            .subscribe((data: Music) => {
              const index = this.dataSource.findIndex((m) => m.id === data.id);
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.musicService.postMusic(result).subscribe((data: Music) => {
            this.dataSource.push(data);
            this.table.renderRows();
          });
        }
      }
    });
  }
  editElement(music: Music): void {
    this.openDialog(music);
  }
  deleteElement(id: number): void {
    this.musicService.deleteMusic(id).subscribe(() => {
      this.dataSource = this.dataSource.filter((m) => m.id !== id);
    });
  }
}
