import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/roles.enum';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { FavouriteService } from 'src/app/shared/services/favourite/favourite.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  public registerCheck = false;
  public registerForm !: FormGroup;
  public loginForm !: FormGroup;


  public checkPassword = false;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private favouriteService: FavouriteService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initRegisterForm();
    this.initLoginForm();
  }

  // Логінування

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  };

  loginUser(): void {
    const { email, password } = this.loginForm.value;
    
    this.login(email, password).then(() => {
      this.showSuccess('User successfully logined');
      this.closeDialog();
    }).catch(e => {
      this.showError(e);
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);

    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('favourites', JSON.stringify(user['favourites']));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/user-cabinet']);
      } else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin']);
      }
      this.accountService.isUserLogin$.next(true);
      window.location.reload();
      
    }, (e) => {
      console.log('error', e);
    })
  }

  // Реєстрація

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordCheck: [null, [Validators.required]],
      check: [false, [Validators.requiredTrue]]
    })
  };

  registerUser(): void {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    this.emailSignUp(email, password).then(() => {
      this.login(email, password);
      
      this.registerForm.reset();
      this.showSuccess("Зареєстровано");
      this.closeDialog();
    }).catch(e => {
      this.showError(e);
    })
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      birthDate: this.registerForm.value.birthDate,
      phone: this.registerForm.value.phone,
      role: 'USER',
      orders: [],
      favourites: [],
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if (this.password.value !== this.confirmed.value) {
      this.registerForm.controls['passwordCheck'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
    }
  }

  get password(): AbstractControl {
    return this.registerForm.controls['password'];
  };

  get confirmed(): AbstractControl {
    return this.registerForm.controls['passwordCheck'];
  };

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.registerForm.controls[control].errors?.[name]
  };

  // Інше

  closeDialog(): void {
    this.dialogRef.close();
  }

  registerCheckToggle(): void {
    this.registerCheck = !this.registerCheck
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

}
