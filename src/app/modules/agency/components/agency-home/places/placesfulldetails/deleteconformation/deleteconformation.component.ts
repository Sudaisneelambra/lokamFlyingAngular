import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { agencyService } from "src/app/modules/agency/services/agency.service";

@Component({
    selector:'app-deleteconformation',
    templateUrl:'./deleteconformation.component.html',
    styleUrls:['./deleteconformation.component.css']
})

export class DeleteConformation implements OnInit{

    constructor(private service:agencyService, private router:Router){}
    @Input() id!:any
    ngOnInit(): void {
        console.log(this.id);
        
    }

    @Output() daleteconformationdelete= new EventEmitter()
    @Output() msg= new EventEmitter()



    cancel(){
        this.daleteconformationdelete.emit(false)
    }
    confirmboolean(){
        //deleting place from database
            this.service.deletingPlace(this.id).subscribe({
                next:(res)=>{
                    if(res.success){
                        this.msg.emit(res.message)
                        this.daleteconformationdelete.emit(false)
                        setTimeout(() => {
                            this.msg.emit('')
                            this.router.navigate(['/agency/home'])
                        }, 2000);
                    }
                },
                error:(err)=>{
                console.log(err);   
                }
            })
    }
}


