import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/data/data.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent {

  public currentUser!: any;
  public dataForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.initDataForm();
    this.getCurentUser();
  }

  initDataForm(): void {
    this.dataForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    })
  };

  getCurentUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
  
    this.dataForm.patchValue({
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      phone: this.currentUser.phone,
    })
  };

  dataChange(): void{
    this.currentUser.firstName = this.dataForm.value.firstName
    this.currentUser.lastName = this.dataForm.value.lastName
    this.currentUser.phone = this.dataForm.value.phone

    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    this.dataService.updateFirebase(this.dataForm.value.firstName, this.dataForm.value.lastName, this.dataForm.value.phone, this.currentUser.uid).then(() =>{
      this.showSuccess('Успішно')
    })

  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

}
