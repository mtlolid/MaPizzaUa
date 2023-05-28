import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IVacancyPost } from 'src/app/shared/interfaces/vacancy/vacancy.interface';
import { FilesService } from 'src/app/shared/services/files/files.service';
import { VacancyService } from 'src/app/shared/services/vacancy/vacancy.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  public items = [
    { header: 'Куди вказувати промокод?', main: 'Промокод ви можете вказати у коментарі до замовлення або безпосередньо менеджеру кол-центру.' },

    { header: 'Що робити, якщо я хочу розповісти про проблему або залишити відгук?', main: 'Ми завжди раді комунікації. Залиште, будь ласка, своє повідомлення у форму «Зв’язатися з нами» або зателефонуйте нам. Також залюбки поспілкуємося з Вами в Instagram @pizza.mammaitaliana' },

    { header: 'Хочу зробити замовлення, а ніхто не бере слухавку, що робити?', main: 'Так відбувається через завантаженість лінії дзвінками. Не хвилюйтеся, ми приймемо Ваше замовлення! Номер телефону, з якого Ви здійснюєте дзвінок, фіксується, отже, наш оператор перетелефонує Вам як най скоріше' },

    { header: 'Чи можна зробити замовлення заздалегідь?', main: 'Так, звісно! Це стосується доставки та самовиносу. Зателефонуйте до нашого кол-центру та попередьте менеджера, коли Ви б хотіли отримати/забрати замовлення.' },

    { header: 'Чому моя адреса не входить до зон доставки?', main: 'Мамма хоче бути впевненою, що піца доїде до Вас гаряченькою, смачною та красивою. Якщо Ваша адреса розташовується далеко від наших пекарень, ми не зможемо гарантувати Вам якісний сервіс доставки та піцу у тому вигляді, якою вона має потрапити до клієнта. Тим не менше, ми не стоїмо на місці і відкриваємо нові кухні, тим самим збільшуємо зони покриття доставок.' }
  ];

  public expandedIndex = 0;

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
