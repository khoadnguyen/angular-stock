import {Injectable} from '@angular/core';
import {default as swal, SweetAlertType, SweetAlertOptions} from 'sweetalert2';

@Injectable()
export class AlertService {

  constructor() {
  }

  error(text = 'Oh no something went wrong.') {

    const option: SweetAlertOptions = {
      title: 'Error',
      text: text,
      type: 'error',
      confirmButtonText: 'Ok'
    };
    swal(option);

  }

  success(title = 'Success', text = 'Great! This was successful.') {

    const option: SweetAlertOptions = {
      title: title,
      text: text,
      timer: 3000,
      type: 'success',
      confirmButtonText: 'Ok'
    };
    swal(option)
        .then(() => {
        });

  }

  serverError() {

    const option: SweetAlertOptions = {
      title: 'Error',
      text: 'Server Error',
      type: 'error',
      confirmButtonText: 'Ok'
    };
    swal(option);

  }

  confirm(text = 'Are you sure?') {
    const option: SweetAlertOptions = {
      title: 'Are you sure?',
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: 'Nope'
    };
    return swal(option);
  }
}
