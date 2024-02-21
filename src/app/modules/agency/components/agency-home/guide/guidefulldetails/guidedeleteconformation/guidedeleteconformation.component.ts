import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { agencyService } from 'src/app/modules/agency/services/agency.service';
import { GuideService } from 'src/app/modules/agency/services/guid.service';

@Component({
  selector: 'app-guidedelete',
  templateUrl: './guidedeleteconformation.component.html',
  styleUrls: ['./guidedeleteconformation.component.css'],
})
export class GuideDeleteConformation implements OnInit {
    
      @Input() id!: any;
      @Output() canceldelete = new EventEmitter();
      @Output() msg = new EventEmitter();

  constructor(private router: Router ,private guideservices:GuideService) {}


  ngOnInit(): void {}

// confirm delete and call delete api
  confirmboolean() {
    // deleting place from database
    this.guideservices.deletingGuide(this.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.msg.emit(res.message);
          this.canceldelete.emit(false);
          setTimeout(() => {
            this.msg.emit('');
            this.router.navigate(['/agency/home']);
          }, 2000);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

//   delete cancellation
  cancel() {
    this.canceldelete.emit(false);
  }
}
