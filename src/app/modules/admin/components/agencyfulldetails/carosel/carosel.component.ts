import { Component, Input } from "@angular/core";

@Component({
    selector:'app-carosel',
    templateUrl:'./carosel.component.html',
    styleUrls:['./carosel.component.css']
})

export class CaroselComponet{
    @Input() image:any
    
      selectedIndex=0
      bool=true
      control=true
      val=true
    
      selectimge(index:number){
        this.selectedIndex=index
      }
      onprevclick(){
        if(this.selectedIndex === 0){
          this.selectedIndex =this.image.length-1
        } else{
          this.selectedIndex --;
        }
      }
      onnextclick(){
        if(this.selectedIndex === this.image.length-1){
          this.selectedIndex =0
        } else{
          this.selectedIndex ++;
        }
      }
    
      ngOnInit(): void {
        if(this.val){
          this.auto()
        }
        console.log(this.image);
        
      }
    
      auto(){
        setInterval(()=>{
          this.onnextclick()
        },3000)
      }
}