import { Component } from '@angular/core';
import { IVacancyRequest } from 'src/app/shared/interfaces/vacancy/vacancy.interface';
import { VacancyService } from 'src/app/shared/services/vacancy/vacancy.service';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss']
})
export class AdminFeedbackComponent {

  public feedbackArray: Array<IVacancyRequest> = [];

  constructor(
    private vacancyService: VacancyService
  ){}

  ngOnInit(): void {
    this.getVacancies();
  }

  getVacancies(): void {
    this.vacancyService.getAllFirebase().subscribe(
      data => { this.feedbackArray = data as IVacancyRequest[] }
    )
  };

  deleteVacancy(id: string): void {
    this.vacancyService.deleteFirebase(id).then(() => this.getVacancies())
  };

}
