import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NotesdataService } from 'src/app/services/notesdata.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notespage',
  templateUrl: './notespage.component.html',
  styleUrls: ['./notespage.component.scss'],
})
export class NotespageComponent implements OnInit, AfterViewInit {
  constructor(
    private _noteService: NotesdataService,
    private _users: UserService
  ) {
    this._users.currentUser.subscribe((value) => {
      this.currentUser = value;
      if (this.currentUser != '') this.ngOnInit();
    });
  }
  noteText: any = '';
  editorNoteText: any = '';
  newNote: any[] = [];
  onNewAdd = 'Add note';
  allNotes: any[] = [];
  allPinnnedNotes: any[] = [];
  currentUser: any = '';
  newCurrent: any;
  askUser = 'Select a user';
  pinned: boolean = true;
  totalPins: any = 0;
  pinIndex: any[] = [];
  displayEditor: boolean = false;
  emptyFields: boolean = false;
  ngOnInit(): void {
    this.allNotes = [];
    if (this.currentUser != '') {
      this._noteService.getNewNote(this.currentUser).subscribe((data: any) => {
        if (data != null) {
          console.log(data);
          for (var each of data) this.allNotes.push(each);
        }
        this.allPinnnedNotes = [];
        this._noteService
          .getPinnedNotes(this.currentUser)
          .subscribe((data: any) => {
            if (data != null) {
              for (var each of data) {
                this.allPinnnedNotes.push(each);
              }
            }
            this.totalPins = this.allPinnnedNotes.length;
          });
      });
      console.log(this.allNotes);
    }
    // (document.querySelector('#colorpalette') as SVGElement).addEventListener(
    //   'click',
    //   () => {
    //     console.log('palette -> ', document.querySelector('.colors'));
    //     if (
    //       (
    //         document.querySelector('.colors') as HTMLDivElement
    //       ).classList.contains('paletteright')
    //     ) {
    //       (document.querySelector('.colors') as HTMLDivElement).classList.add(
    //         'paletteleft'
    //       );
    //       (
    //         document.querySelector('.colors') as HTMLDivElement
    //       ).classList.remove('paletteright');
    //     } else {
    //       (document.querySelector('.colors') as HTMLDivElement).classList.add(
    //         'paletteright'
    //       );
    //       (
    //         document.querySelector('.colors') as HTMLDivElement
    //       ).classList.remove('paletteleft');
    //     }
    //   }
    // );
  }
  noteBGcolor: any = 'none';
  setBG(bgcolor: any, event: any) {
    this.noteBGcolor = bgcolor;
  }
  editorIndex: any;
  changesType = '';
  editNote(index: any, event: any) {
    window.scroll({ top: 0, left: 0 });
    this.displayEditor = event;
    var tempData = this.allNotes[index];
    (document.querySelector('.edittitle > input') as HTMLInputElement).value =
      tempData.title;
    (document.querySelector('.edittagline > input') as HTMLInputElement).value =
      tempData.tagline;
    (document.querySelector('.editnotebody') as HTMLDivElement).innerText =
      tempData.noteText;
    this.editorIndex = index;
    this.changesType = 'other';
  }
  editPinnedNote(index: any, event: any) {
    window.scroll({ top: 0, left: 0 });
    this.displayEditor = event;
    var tempData = this.allPinnnedNotes[index];
    (document.querySelector('.edittitle > input') as HTMLInputElement).value =
      tempData.title;
    (document.querySelector('.edittagline > input') as HTMLInputElement).value =
      tempData.tagline;
    (document.querySelector('.editnotebody') as HTMLDivElement).innerText =
      tempData.noteText;
    this.editorIndex = index;
    this.changesType = 'pinned';
  }
  ngAfterViewInit(): void {}
  saveChanges() {
    if (this.changesType === 'other') {
      this.allNotes[this.editorIndex] = {
        title: (
          document.querySelector('.edittitle > input') as HTMLInputElement
        ).value,
        tagline: (
          document.querySelector('.edittagline > input') as HTMLInputElement
        ).value,
        noteText: (document.querySelector('.editnotebody') as HTMLDivElement)
          .innerText,
        bgcolor: this.allNotes[this.editorIndex].bgcolor,
      };
      this._noteService
        .addNewNote(this.currentUser, this.allNotes)
        .subscribe((res) => {
          this.ngOnInit();
        });
    } else if (this.changesType === 'pinned') {
      this.allPinnnedNotes[this.editorIndex] = {
        title: (
          document.querySelector('.edittitle > input') as HTMLInputElement
        ).value,
        tagline: (
          document.querySelector('.edittagline > input') as HTMLInputElement
        ).value,
        noteText: (document.querySelector('.editnotebody') as HTMLDivElement)
          .innerText,
        bgcolor:
          this.noteBGcolor === this.allPinnnedNotes[this.editorIndex]
            ? this.allPinnnedNotes[this.editorIndex]
            : this.noteBGcolor,
      };
      this._noteService
        .pinnedNotes(this.currentUser, this.allPinnnedNotes)
        .subscribe((res) => {
          this.ngOnInit();
        });
    }
  }

  pinnedNote(index: any, pinEvent: any) {
    this.allPinnnedNotes.push(this.allNotes[index]);
    this.allNotes.splice(index, 1);
    this._noteService
      .pinnedNotes(this.currentUser, this.allPinnnedNotes)
      .subscribe((res) => {
        this.totalPins = this.allPinnnedNotes.length;
        this._noteService
          .addNewNote(this.currentUser, this.allNotes)
          .subscribe((res) => {
            this.ngOnInit();
          });
      });
  }

  delNote(index: any, pinEvent: any) {
    this.allNotes.splice(index, 1);
    this._noteService
      .delNotes(this.currentUser, this.allNotes)
      .subscribe((res) => {
        this.ngOnInit();
      });
  }

  delPinnedNote(index: any, pinEvent: any) {
    this.allPinnnedNotes.splice(index, 1);
    this._noteService
      .delPinnedNotes(this.currentUser, this.allPinnnedNotes)
      .subscribe((res) => {
        this.totalPins = this.allPinnnedNotes.length;
        this.ngOnInit();
      });
  }

  unpinnedNote(index: any, pinEvent: any) {
    this.allNotes.push(this.allPinnnedNotes[index]);
    this.allPinnnedNotes.splice(index, 1);
    this._noteService
      .pinnedNotes(this.currentUser, this.allPinnnedNotes)
      .subscribe((res) => {
        this._noteService
          .addNewNote(this.currentUser, this.allNotes)
          .subscribe((res) => {
            this.ngOnInit();
          });
      });
  }
  showUserError: boolean = false;
  addData(title: any, tagline: any) {
    if (this.currentUser === '') this.showUserError = true;
    else this.showUserError = false;
    if (title === '' && tagline === '' && this.noteText === '') {
      if (this.showUserError == false) this.emptyFields = true;
    } else {
      this.emptyFields = false;
      this.showUserError = false;
      this.allNotes.push({
        title: title,
        tagline: tagline,
        noteText: this.noteText,
        bgcolor: this.noteBGcolor,
      });
      this._noteService
        .addNewNote(this.currentUser, this.allNotes)
        .subscribe((res) => {
          this.ngOnInit();
        });
    }
  }
  getNoteText(innerText: any) {
    this.noteText = innerText;
  }
  getEditorNoteText(innerText: any) {
    this.editorNoteText = innerText;
  }
  addnoteEditor() {
    var pText = document.querySelector('.pseudotext') as HTMLDivElement;
    pText.classList.toggle('shiftnoteEditor');
    var noteContainer = document.querySelector(
      '.addnoteContainer'
    ) as HTMLDivElement;
    noteContainer.classList.toggle('shiftnoteEditor');
  }
  discard() {
    var pText = document.querySelector('.pseudotext') as HTMLDivElement;
    pText.classList.toggle('shiftnoteEditor');
    var noteContainer = document.querySelector(
      '.addnoteContainer'
    ) as HTMLDivElement;
    noteContainer.classList.toggle('shiftnoteEditor');
    (document.querySelector('.title > input') as HTMLInputElement).value = '';
    (document.querySelector('.tagline > input') as HTMLInputElement).value = '';
    (document.querySelector('.notebody') as HTMLDivElement).innerText = '';
  }
}
