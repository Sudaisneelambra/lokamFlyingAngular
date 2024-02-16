import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit{


  @Input() guide:any
  aboutguide:any

  ngOnInit(): void {

      this.aboutguide =this.slittedDiscription(this.guide.aboutguide)
  }

  onMouseEnter(){
    this.aboutguide=this.fulldetails(this.guide.aboutguide)
  }
  onMouseLeave(){
    this.aboutguide=this.slittedDiscription(this.guide.aboutguide)
  }

  private slittedDiscription(value:string){
    return value.length>55 ? `${value.substring(0,55)}...` :value;
  }

  private fulldetails(value:string){
    return value
  }
}
