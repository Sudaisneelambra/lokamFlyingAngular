import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { admincommon } from '../../../services/admincommon.service';
import { agencylist } from '../../../services/agencylist.service';

@Component({
  selector: 'app-agencyblock',
  templateUrl: './agencyblockconformation.component.html',
  styleUrls: ['./agencyblockconformation.component.css'],
})
export class agencyblockconformation implements OnDestroy {

  @Output() cancelview = new EventEmitter();
  blockingagency$ = new Subscription();
  @Input() id: any;
  message!: any;

  constructor(
    private adminagencylist: agencylist,
    private router: Router,
    private service: admincommon
  ) {}

  cancel() {
    this.cancelview.emit(false);
  }

  block() {
    this.blockingagency$ = this.adminagencylist.agencyblock(this.id).subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired or internal error please login');
          this.service.agencylogout();
        } else {

          if (res.success) {
            this.message = res.message;
            setTimeout(() => {
              this.cancelview.emit(false);
              this.router.navigate(['/admin']);
            }, 1000);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.blockingagency$?.unsubscribe();
  }
}
