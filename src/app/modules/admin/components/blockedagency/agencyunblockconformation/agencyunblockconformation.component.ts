import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { userlist } from '../../../services/userlist.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { admincommon } from '../../../services/admincommon.service';
import { agencylist } from '../../../services/agencylist.service';

@Component({
  selector: 'app-agencyunblock',
  templateUrl: './agencyunblockconformation.component.html',
  styleUrls: ['./agencyunblockconformation.component.css'],
})
export class agencyunblockconformation implements OnDestroy {

  @Output() cancelview = new EventEmitter();
  unblockingagency$ = new Subscription();
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

  unblock() {
    this.unblockingagency$ = this.adminagencylist.agencyunblock(this.id).subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired or internal error please login');
          this.service.agencylogout();
        } else {
          console.log(res);

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
    this.unblockingagency$?.unsubscribe();
  }
}
