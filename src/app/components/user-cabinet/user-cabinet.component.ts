import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.scss']
})
export class UserCabinetComponent {

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
