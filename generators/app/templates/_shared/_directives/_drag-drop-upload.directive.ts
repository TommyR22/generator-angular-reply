import {Directive, Output, EventEmitter, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDragDropUpload]'
})
export class DragDropUploadDirective {

  @Output() fileDropped = new EventEmitter<any>();
  @Output() errors = new EventEmitter<any>();
  @HostBinding('style.background-color') private background = 'rgba(22, 219, 147, 0.2)';
  // Dragover Event
  @HostListener('dragover', ['$event']) dragOver(event: any) {
    console.log('dragover');
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    event.stopPropagation(); // do not propagate event
    this.background = '#e2eefd';
  }
  // Dragleave Event
  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    console.log('dragleave');
    event.preventDefault();
    event.stopPropagation();
    this.background = 'rgba(22, 219, 147, 0.2)';
  }
  // Drop Event
  @HostListener('drop', ['$event']) public drop(event: any) {
    console.log('files dragged:', event.dataTransfer.files);
    this.errors.emit(null);
    event.preventDefault();
    event.stopPropagation();
    this.background = 'rgba(22, 219, 147, 0.2)';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      for (const file of files) {
        if (!this.validateFile(file.name)) {
          this.errors.emit('Selected files format is not supported');
          return;
        }
      }
      this.fileDropped.emit(files);
    }
  }

  validateFile(name: String) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    return ext.toLowerCase() === 'pdf';
  }

}
