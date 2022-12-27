import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { User } from 'src/app/models/user';

import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'aniversario',
    'pais',
    'acoes',
  ];
  dataSource!: User[];

  constructor(public dialog: MatDialog, public userService: UserService) {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.dataSource = data;
    });
  }

  ngOnInit(): void {}

  openDialog(user: User | null): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data:
        user === null
          ? {
              id: null,
              nome_usuario: '',
              email: '',
              aniversario: '',
              pais: '',
            }
          : {
              id: user.id,
              nome_usuario: user.nome_usuario,
              email: user.email,
              aniversario: user.aniversario,
              pais: user.pais,
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (this.dataSource.map((u) => u.id).includes(result.id)) {
          this.userService
            .putUser(result.id, result)
            .subscribe((data: User) => {
              const index = this.dataSource.findIndex((u) => u.id === data.id);
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.userService.postUser(result).subscribe((data: User) => {
            this.dataSource.push(data);
            this.table.renderRows();
          });
        }
      }
    });
  }

  editElement(user: User): void {
    this.openDialog(user);
  }

  deleteElement(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource = this.dataSource.filter((u) => u.id !== id);
    });
  }
}
