import { Component, OnInit } from '@angular/core';

import { GifsService } from 'src/app/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private gifService: GifsService,
  ) { }

  ngOnInit(): void {
  }



  get historial(){
    return this.gifService.historial;
    
  }

  buscar(value: string){
    this.gifService.buscarGifs(value);
  }

}
