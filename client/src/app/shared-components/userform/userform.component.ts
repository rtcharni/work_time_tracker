import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAndCompany, User } from '@models';
import { Utils } from '../../utils/utils';
import { UserFormEvent } from '../../frontend-models/frontend.models';
import { UserService } from '@services';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css'],
})
export class UserformComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Output() userFormEvent = new EventEmitter<UserFormEvent>();

  loggedUser: UserAndCompany;
  userForm: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loggedUser = this.userService.getUser();
    if (this.user) {
      this.userForm = this.initForm({ ...this.user });
    }
    console.log('in init', this.userForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.user.firstChange && this.user) {
      this.userForm = this.initForm({ ...this.user });
    }
  }

  private initForm(user: User | UserAndCompany): FormGroup {
    const userForm = new FormGroup({
      userId: new FormControl(user.userId),
      companyId: new FormControl(user.companyId),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
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
        .setValidators([Validators.required, Validators.minLength(8), Utils.passwordValidator(userForm, 'control')]);
      userForm
        .get('verifyPassword')
        .setValidators([Validators.required, Validators.minLength(8), Utils.passwordValidator(userForm, 'control')]);
    }

    userForm.get('password').valueChanges.subscribe(value => {
      userForm.get('password').updateValueAndValidity({ emitEvent: false });
      userForm.get('verifyPassword').updateValueAndValidity({ emitEvent: false });
    });
    userForm.get('verifyPassword').valueChanges.subscribe(value => {
      userForm.get('password').updateValueAndValidity({ emitEvent: false });
      userForm.get('verifyPassword').updateValueAndValidity({ emitEvent: false });
    });

    return userForm;
  }

  handleSaveButtonClick(): void {
    const newUser: any = { ...this.userForm.getRawValue() };
    delete newUser.verifyPassword;
    this.userFormEvent.emit({
      user: newUser as User,
      action: newUser.userId ? 'edit' : 'create',
    });
    this.userForm = this.initForm(newUser.userId ? { ...this.userForm.getRawValue() } : this.user);
    console.log('in handle save button', this.userForm);
  }

  handleClearButtonClick(): void {
    this.userForm = this.initForm(this.user);
  }

  handleDeleteButtonClick(): void {
    if (confirm(`Delete user: #${this.user.userId} - ${this.user.firstName} ${this.user.lastName}`)) {
      this.userFormEvent.emit({
        user: this.user,
        action: 'delete',
      });
    }
  }

  isOriginalValue(newValue: string | boolean, oldValue: string | boolean, controlName: string): void {
    if (newValue === oldValue) {
      this.userForm.get(controlName).markAsPristine();
    }
  }
}
