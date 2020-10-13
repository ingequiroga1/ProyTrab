import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../services/toolbar.service';


@Component({
  selector: 'kt-custom-page3',
  templateUrl: './custom-page3.component.html',
  styleUrls: ['./custom-page3.component.scss']
})
export class CustomPage3Component implements OnInit , AfterViewChecked{

  constructor(private toolbarService:ToolbarService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.toolbarService.emit(
      {
        parent:{name:'Community info', url:'/community'},
        children : [
          {name:'Alta de Usuarios', url: '/page2'},
          {name:'Permisos',url:'/page3' }
        ]
      });
  }

}
