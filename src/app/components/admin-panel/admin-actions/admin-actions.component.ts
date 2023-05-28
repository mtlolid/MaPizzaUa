import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActionsPost, IActionsRequest } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';
import { FilesService } from 'src/app/shared/services/files/files.service';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.scss']
})
export class AdminActionsComponent {

  public addCheck = false;

  public actionForm!: FormGroup;

  public fileUploaded = false;
  public actionPosted = false;

  public editStatus = false;
  private curentEditId!: string;

  public actionsArray!: Array<IActionsRequest>;

  constructor(
    private fb: FormBuilder,
    private actionsService: ActionsService,
    private filesService: FilesService
  ) { };

  ngOnInit(): void {
    this.initActionForm();
    this.getActions();
  }

  addCheckToggle(): void {
    this.addCheck = !this.addCheck;
    this.fileUploaded = false;
    this.editStatus = false;
    this.actionForm.reset();
  }

  initActionForm(): void {
    this.actionForm = this.fb.group({
      header: [null, Validators.required],
      text: [null, Validators.required],
      file: [null, Validators.required],
      fileHiden: [null, Validators.required]
    })
  };

  // Підгрузка акцій

  getActions(): void {
    this.actionsService.getAllFirebase().subscribe(
      data => { this.actionsArray = data as IActionsRequest[] }
    )
  };

  // Створення і редагування акцій

  createAction(): void {
    if (!this.editStatus) {
      const action: IActionsPost = {
        header: this.actionForm.value.header,
        text: this.actionForm.value.text,
        file: this.actionForm.value.fileHiden,
      }

      this.actionsService.createFirebase(action).then(
        () => {
          this.getActions()
          this.actionPosted = true;
        })

    }

    else {
      const action: IActionsRequest = {
        id: this.curentEditId,
        header: this.actionForm.value.header,
        text: this.actionForm.value.text,
        file: this.actionForm.value.fileHiden,
      }

      this.actionsService.updateFirebase(action, this.curentEditId).then(
        () => {
          this.getActions()
          this.getActions()
          this.actionPosted = true;
        }
      )
    }

    this.actionForm.reset();
    this.addCheckToggle();

  };

  // Видалення акції

  deleteAction(id: string): void {
    this.actionsService.deleteFirebase(id).then(() => this.getActions())
  };

  // Редагування

  editAction(action: IActionsRequest): void {

    this.actionForm.patchValue({
      header: action.header,
      text: action.text,
      hidenFile: action.file
    })
    this.editStatus = true;
    this.curentEditId = action.id;
    this.addCheck = true;
  };

  // Підгрузка фото

  upload(event: any): void {
    const file = event.target.files[0];
    this.filesService.uploadFile('images/actionsImages', file.name, file)
      .then(data => {
        this.actionForm.patchValue({
          fileHiden: data
        });
        this.fileUploaded = true
      })
      .catch(err => {
        console.log(err)
      })
  };

}
