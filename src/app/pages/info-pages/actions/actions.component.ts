import { Component } from '@angular/core';
import { IActionsRequest } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  public actionsArray!: Array<IActionsRequest>;

  constructor(
    private actionsService: ActionsService,
  ) { };

  ngOnInit(): void {
    this.getActions()
  }

  getActions(): void {
    this.actionsService.getAllFirebase().subscribe(
      data => { this.actionsArray = data as IActionsRequest[] }
    )
  };

}
