// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'dynamic-components';
// }
//our root app component
import {
  OnInit,
  AfterViewInit,
  Component,
  Directive,
  NgModule,
  ElementRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ComponentFactoryResolver,
  QueryList
} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  wizardData = [
    {
      completed: false,
      optional: false,
      label: 'STEP1',
      cmpname: 'card-body',
      component: DynamicComponent,
      selectedIndex: 0,
      canProceed: false
    },
    {
      completed: false,
      optional: false,
      label: 'STEP2',
      component: StepperComponent,
      selectedIndex: 1,
      canProceed: true
    },
    {
      completed: false,
      optional: false,
      label: 'STEP3',
      component: DynamicComponentTwo,
      selectedIndex: 2,
      canProceed: true
    }

  ];
  items: Array<any> = [
    {
      name: 'StepperComponent',
      component: StepperComponent

    },
    {
      name: 'DynamicComponent',
      component: DynamicComponent

    },
    {
      name: 'DynamicComponentTwo',
      component: DynamicComponentTwo

    }

  ]
  name: string;
  constructor() {
    this.name = 'Angular!'
  }


}


@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.style.backgroundColor = 'yellow';
  }
}

@Component({
  selector: 'stepper-component',
  templateUrl: './stepper-components.html',
})
export class StepperComponent implements OnInit, AfterViewInit {
  @ViewChildren(HighlightDirective) private highlights: QueryList<HighlightDirective>;
  @ViewChild('contentProjection', { read: ViewContainerRef }) private contentProjection: ViewContainerRef;
  viewerComponent;


  constructor(
    private resolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    //  this.createDynamicComponent();
  }

  ngAfterViewInit() {
    console.log(this.highlights.length);

    // Should update with any DOM changes
    this.highlights.changes.subscribe(x => {
      console.log(this.highlights.length);
    });
  }

  private createDynamicComponent() {
    const componentFactory = this.resolver.resolveComponentFactory(DynamicComponent);
    this.viewerComponent = this.contentProjection.createComponent(componentFactory);

  }
}

@Component({
  selector: 'dynamic-component',
  template: `
<div>TEST</div>
`,
})
export class DynamicComponent {
  test() {
    console.log("test");
  }
}

@Component({
  selector: 'dynamic-component-1',
  template: `
<div>DynamicSFSDFSDFSDF!</div>
`,
})
export class DynamicComponentTwo {
  test() {
    console.log("test");
  }
}