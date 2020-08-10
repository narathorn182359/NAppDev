import {
  Component,
  Directive,
  ContentChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  Renderer2,
  OnInit,
  ViewChild,
} from "@angular/core";
import { combineLatest } from 'rxjs';
import { IonContent } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent,{read:ElementRef,static:true}) contenArea:ElementRef;
  @ViewChild("triggerElement",{read:ElementRef,static:true}) triggerElement:ElementRef;
  @ViewChild("gg",{read:ElementRef,static:true}) gg:ElementRef;
  private observer:IntersectionObserver;
  
  constructor(private renderer:Renderer2) {}
  ngOnInit() {
    console.log(this.triggerElement);
    this.observer = new IntersectionObserver((entries) => {

      entries.forEach((entry: any) => {

        if(entry.isIntersecting){
         console.log("trigger animation")
         this.renderer.addClass(this.contenArea.nativeElement,"no-transform")
         this.renderer.removeClass(this.gg.nativeElement,"test")
        } else {
          console.log("trigger animation")
          this.renderer.removeClass(this.contenArea.nativeElement,"no-transform")
          this.renderer.addClass(this.gg.nativeElement,"test")
       
        }
      })

    });
    this.observer.observe(this.triggerElement.nativeElement);
  }
  handleScroll(ev){

  }
}
