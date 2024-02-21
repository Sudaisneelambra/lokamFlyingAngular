import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-conformation',
  templateUrl: './editconformation.component.html',
  styleUrls: ['./editconformation.component.css'],
})
export class EditConformation implements OnInit {
  @Output() cancelvalue = new EventEmitter();
  @Input() id!: any;

  constructor(private router: Router) {}

//  ng on init 
  ngOnInit(): void {
  }

//   cancel emtting event to parent
  cancel() {
    this.cancelvalue.emit(false);
  }

// edit butoon triggered and navigate to place add
  confirmboolean() {
    this.router.navigate([`/agency/placeadd`], {
      queryParams: { id: this.id },
    });
  }
}
