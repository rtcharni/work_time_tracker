import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule],
})
export class MaterialModule {}
