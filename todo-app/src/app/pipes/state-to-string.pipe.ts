import { Pipe, PipeTransform } from '@angular/core';
import { State } from '../tasks/task.model';

@Pipe({
  name: 'stateToString'
})
export class StateToStringPipe implements PipeTransform {

  transform(value: State): string {
    switch (value.toString()) {
        case 'PENDING':
            return 'Pending';
        case 'IN_PROGRESS':
            return 'In Progress';
        case 'COMPLETED':
            return 'Completed';
        default:
            return '';
    }
  }

}
