import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IVacancyPost } from 'src/app/shared/interfaces/vacancy/vacancy.interface';
import { FilesService } from 'src/app/shared/services/files/files.service';
import { VacancyService } from 'src/app/shared/services/vacancy/vacancy.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  public vacancyForm!: FormGroup;

  public fileUploaded = false;
  public vacancyPosted = false;

  constructor(
    private fb: FormBuilder,
    private vacancyService: VacancyService,
    private filesService: FilesService,
  ) { };

  ngOnInit(): void {
    this.initActionForm()
  }

  initActionForm(): void {
    this.vacancyForm = this.fb.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      about: [null, Validators.required],
      file: [null],
      fileHiden: [null]
    })
  };

  createVacancy(): void {

    const vacancy: IVacancyPost = {
      name: this.vacancyForm.value.name,
      phone: this.vacancyForm.value.phone,
      email: this.vacancyForm.value.email,
      about: this.vacancyForm.value.about,
      file: this.vacancyForm.value.fileHiden,
    }

    this.vacancyService.createFirebase(vacancy).then(
      () => {
        this.vacancyPosted = true;
        this.fileUploaded = false;
      })

    this.vacancyForm.reset();

  };

  upload(event: any): void {
    const file = event.target.files[0];
    this.filesService.uploadFile('feedbackAndVacancyFiles', file.name, file)
      .then(data => {
        this.vacancyForm.patchValue({
          fileHiden: data
        });
        this.fileUploaded = true
      })
      .catch(err => {
        console.log(err)
      })
  }

}
