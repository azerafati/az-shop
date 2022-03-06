import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  snack(msg: string, action: string): void {
    this.snackBar.open(msg, action, {duration: 1500});
  }
}
