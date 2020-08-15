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
import { IonSlides } from '@ionic/angular';
import { combineLatest } from 'rxjs';
import { IonContent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {

  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  @ViewChild(IonContent,{read:ElementRef,static:true}) contenArea:ElementRef;
  @ViewChild("triggerElement",{read:ElementRef,static:true}) triggerElement:ElementRef;
  @ViewChild("gg",{read:ElementRef,static:true}) gg:ElementRef;
  private observer:IntersectionObserver;
  sliderOne: any;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    loop:true
  };
  constructor(private renderer:Renderer2,
    private http: HttpClient
    ) {  this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 995
          },
          {
            id: 925
          },
          {
            id: 940
          },
          {
            id: 943
          },
          {
            id: 944
          }
        ]
      };}
  ngOnInit() {
   
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
  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

}
