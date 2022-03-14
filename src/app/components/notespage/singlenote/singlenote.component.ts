import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NotesdataService } from 'src/app/services/notesdata.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-singlenote',
  templateUrl: './singlenote.component.html',
  styleUrls: ['./singlenote.component.scss'],
})
export class SinglenoteComponent
  implements OnInit, AfterContentInit, AfterViewInit
{
  constructor(private _noteData: NotesdataService) {}
  @Input() title: any;
  @Input() tagline: any;
  @Input() noteText: any;
  @Input() pinnedNote: any;
  @Input() deleteNote: any;
  @Input() bgcolor: any;
  @Input() noteID: string = '';
  pinned: boolean = false;
  delete: boolean = false;
  editor: boolean = false;
  @Output() pinEvent = new EventEmitter<boolean>();
  @Output() binEvent = new EventEmitter<boolean>();
  @Output() editEvent = new EventEmitter<boolean>();
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    console.log(this.noteID, document.getElementById(this.noteID));
    (document.getElementById(this.noteID) as HTMLDivElement).style.background =
      this.bgcolor;
  }
  ngAfterContentInit(): void {}
  pin() {
    this.pinned = !this.pinned;
    this.pinEvent.emit(this.pinned);
  }
  bin() {
    this.delete = !this.delete;
    this.binEvent.emit(this.delete);
  }
  edit() {
    this.editor = true;
    this.editEvent.emit(this.editor);
  }
}
