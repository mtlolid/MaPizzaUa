import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { IActionsPost } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss']
})
export class ActionInfoComponent {

  public currentAction !: Data;

  constructor(
    private actionsService: ActionsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAction()
  }

  getAction(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.actionsService.getOneFirebase(id).subscribe(data => {
      this.currentAction = data;
    })
  }

}
