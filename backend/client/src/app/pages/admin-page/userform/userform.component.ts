import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAndCompany, User } from '../../../../../../../models';
import { UserService } from 'src/app/services/user.service';
import { Utils } from '../../../utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserFormEvent } from 'src/app/frontend-models/frontend.models';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css'],
})
export class UserformComponent implements OnInit {
  @Input() user: User;
  @Output() userFormEvent = new EventEmitter<UserFormEvent>();

  loggedUser: UserAndCompany;
  userForm: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loggedUser = this.userService.getUser();
    this.userForm = this.initForm({ ...this.user });
    // console.log(`got user: `, this.user);
    console.log('in init', this.userForm);
  }

  private initForm(user: User | UserAndCompany): FormGroup {
    const userForm = new FormGroup({
      userId: new FormControl(user.userId),
      companyId: new FormControl(user.companyId),
      email: new FormControl(user.email, [
        Validators.required,
        Validators.email,
      ]),
      firstName: new FormControl(user.firstName, [Validators.required]),
      lastName: new FormControl(user.lastName, [Validators.required]),
      password: new FormControl(user.password),
      verifyPassword: new FormControl(user.password),
      admin: new FormControl(user.admin),
    });

    userForm.get('userId').disable();
    userForm.get('companyId').disable();

    if (!this.loggedUser.admin) {
      userForm.get('admin').disable();
    }

    if (user.userId && user.userId !== this.loggedUser.userId) {
      userForm.get('password').disable();
      userForm.get('verifyPassword').disable();
    } else {
      userForm.setValidators(Utils.passwordValidator(userForm, 'group'));
      userForm
        .get('password')
        .setValidators([
          Validators.required,
          Validators.minLength(8),
          Utils.passwordValidator(userForm, 'control'),
        ]);
      userForm
        .get('verifyPassword')
        .setValidators([
          Validators.required,
          Validators.minLength(8),
          Utils.passwordValidator(userForm, 'control'),
        ]);
    }

    userForm.get('password').valueChanges.subscribe((value) => {
      userForm.get('password').updateValueAndValidity({ emitEvent: false });
      userForm
        .get('verifyPassword')
        .updateValueAndValidity({ emitEvent: false });
    });
    userForm.get('verifyPassword').valueChanges.subscribe((value) => {
      userForm.get('password').updateValueAndValidity({ emitEvent: false });
      userForm
        .get('verifyPassword')
        .updateValueAndValidity({ emitEvent: false });
    });

    return userForm;
  }

  handleSaveButtonClick(): void {
    const newUser: User = this.userForm.getRawValue();
    // console.log(`In user form, saving user`, newUser);
    this.userFormEvent.emit({
      user: newUser,
      action: newUser.userId ? 'edit' : 'create',
    });
    this.userForm = this.initForm(newUser.userId ? newUser : this.user);
    // this.userForm.markAsPristine();
    // this.userForm.reset({
    //   userId: user.userId,
    //   companyId: user.companyId,
    //   email: user.email,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   password: user.password,
    //   verifyPassword: user.password,
    //   admin: user.admin,
    // });
    // this.userForm.updateValueAndValidity();
    // this.userForm.markAsPristine();
    // this.userForm.markAsUntouched();

    console.log('in handle save button', this.userForm);
  }

  handleClearButtonClick(): void {
    this.userForm = this.initForm(this.user);
  }

  handleDeleteButtonClick(): void {
    if (
      confirm(
        `Delete user: #${this.user.userId} - ${this.user.firstName} ${this.user.lastName}`
      )
    ) {
      this.userFormEvent.emit({
        user: this.user,
        action: 'delete',
      });
    }
  }

  isOriginalValue(
    newValue: string | boolean,
    oldValue: string | boolean,
    controlName: string
  ): void {
    if (newValue === oldValue) {
      this.userForm.get(controlName).markAsPristine();
    }
  }
}
