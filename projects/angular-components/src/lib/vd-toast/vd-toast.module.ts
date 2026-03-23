//toatst module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VdToast } from './vd-toast.component';

@NgModule({
  imports: [CommonModule, VdToast],
  exports: [VdToast],
})
export class ToastModule {}
