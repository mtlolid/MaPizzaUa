import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {

  constructor(
    private router: Router,
    private accountService: AccountService
  ){}

  logout(): void{
    window.location.reload();
    this.router.navigate(['/']);
    localStorage.clear();
    this.accountService.isUserLogin$.next(true);
  }

}
