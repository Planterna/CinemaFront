import { Component, inject, input, output } from '@angular/core';
import { AssignmentResponseDTO } from '../../../../shared/models/assignment.model';
import { DatePipe } from '@angular/common';
import { NoDataComponent } from '../../../../shared/components/no-data/no-data.component';

@Component({
  selector: 'app-assignment-table',
  imports: [DatePipe, NoDataComponent],
  templateUrl: './assignment-table.component.html',
})
export class AssignmentTableComponent {
  assignments = input.required<AssignmentResponseDTO[]>();
  edit = output<any>();
  delete = output<any>();
  dashboard = input<boolean>();
}
