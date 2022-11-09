import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';

import { GifsService } from 'src/app/services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  @ViewChild('txtBuscar') text_buscar!: ElementRef<HTMLInputElement>;

  constructor(
    private gifService: GifsService,
  ) { }

  ngOnInit(): void {
  }


  buscar() {
    let valor = this.text_buscar?.nativeElement.value;
    if (valor.trim().length === 0) {
      return;
    }
    this.gifService.buscarGifs(valor);
    this.text_buscar.nativeElement.value="";
  }
}
