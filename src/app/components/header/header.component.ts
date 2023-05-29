import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { ICategoriesRequest } from 'src/app/shared/interfaces/categories/categories.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public categoriesArray!: Array<ICategoriesRequest>;

  constructor(
    public dialog: MatDialog,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoginDialogComponent, {
      width: '560px',
      height: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  getCategories(): void {
    this.categoriesService.getAllFirebase().subscribe(
      data => { this.categoriesArray = data as ICategoriesRequest[] }
    )
  };

}
