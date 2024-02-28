import { Component, Input } from "@angular/core";

@Component({
    selector:'app-package',
    templateUrl:'./package.component.html',
    styleUrls:['./package.component.css']
})
export class PackageComponet{

    @Input() package:any

}