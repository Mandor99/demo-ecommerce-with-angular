import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
export class SelectBoxComponent {

  @Input() selectedValue: String= '';
  @Input() title: String= '';
  @Input() data: any[]= [];
  @Output() selectedOption = new EventEmitter<String>()

  fireEvent($event: any) {
    this.selectedOption.emit($event)
  }

  // log(ele:any) {console.log(ele)}
}
