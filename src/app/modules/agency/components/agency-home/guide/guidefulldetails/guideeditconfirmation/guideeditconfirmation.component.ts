import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editconfirmation',
  templateUrl: './guideeditconfirmation.component.html',
  styleUrls: ['./guideeditconfirmation.component.css'],
})
export class GuideEditConfirmationComponent implements OnInit {
  @Input() id!: any;
  @Output() editcancel = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

//   edit confirmation and navigate to guid add page
  confirmboolean() {
    this.router.navigate([`/agency/guideadd`], {
      queryParams: { id: this.id },
    });
  }

//   guid edit cancelation boolean value emit to parent
  cancel() {
    this.editcancel.emit(false);
  }
}
