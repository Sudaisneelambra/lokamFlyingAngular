import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { agencyService } from 'src/app/modules/agency/services/agency.service';
import { GuideService } from 'src/app/modules/agency/services/guid.service';

@Component({
  selector: 'app-guidedelete',
  templateUrl: './guidedeleteconformation.component.html',
  styleUrls: ['./guidedeleteconformation.component.css'],
})
export class GuideDeleteConformation implements OnInit  ,OnDestroy{
    
      @Input() id!: any;
      @Output() canceldelete = new EventEmitter();
      @Output() msg = new EventEmitter();
      strictness!: boolean;
      strictid: any;
      deleteconfirmation$ =new Subscription()

  constructor(private router: Router ,private guideservices:GuideService, private agencyservice:agencyService) {}
  
  
  ngOnInit(): void {}
  
// confirm delete and call delete api
  confirmboolean() {
    // deleting place from database
    console.log('sudais');
    
    this.deleteconfirmation$ = this.guideservices.confirmation(this.id).subscribe({
      next:(res)=>{
        if(res.strict){
          console.log(res);
          this.strictness=true
          this.strictid=this.id
        } else{
          this.guideservices.deletingGuide(this.id).subscribe({
            next: (res) => {
              if (res.expiry) {
                alert('session expired please login');
                this.agencyservice.agencylogout();
              } else {
                if (res.success) {
                  this.msg.emit(res.message);
                  this.canceldelete.emit(false);
                  setTimeout(() => {
                    this.msg.emit('');
                    this.router.navigate(['/agency/home']);
                  }, 2000);
                }
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }
  
  //   delete cancellation
  cancel() {
    this.canceldelete.emit(false);
  }

  // strict modal cancel
  cancelling(event:any){
    this.strictness=event
  }

  ngOnDestroy(): void {
    this.deleteconfirmation$?.unsubscribe()
  }
}
