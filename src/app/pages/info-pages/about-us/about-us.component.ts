import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VacancyService } from "../../../shared/services/vacancy/vacancy.service";
import { FilesService } from "../../../shared/services/files/files.service";
import { IVacancyPost } from "../../../shared/interfaces/vacancy/vacancy.interface";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

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
