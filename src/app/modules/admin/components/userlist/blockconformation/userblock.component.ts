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

@Component({
  selector: 'app-userblock',
  templateUrl: './userblock.component.html',
  styleUrls: ['./userblock.component.css'],
})
export class userblockconformation implements OnDestroy {
  @Output() cancelview = new EventEmitter();
  blockinguser$ = new Subscription();
  @Input() id: any;
  message!: any;

  constructor(
    private adminuserlist: userlist,
    private router: Router,
    private service: admincommon
  ) {}

  cancel() {
    this.cancelview.emit(false);
  }

  block() {
    this.blockinguser$ = this.adminuserlist.userblock(this.id).subscribe({
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
    this.blockinguser$?.unsubscribe();
  }
}
