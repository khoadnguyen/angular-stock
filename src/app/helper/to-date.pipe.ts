import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

	transform(value: any, args?: any): any {
		if (moment(value, 'YYYY-MM-DD').isValid()) {
			const toDate = `${moment(value).format('DD/MM')}/ ${moment(value).get('year') + 543}`;
			return toDate;
		} else {
			return '-';
		}
	}

}
