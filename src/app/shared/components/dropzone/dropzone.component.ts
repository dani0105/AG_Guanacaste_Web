import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileService } from '@core/services';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropzoneComponent),
      multi: true
    }
  ]
})
export class DropzoneComponent implements AfterViewInit, ControlValueAccessor {

  public value: Image[];

  public onChange: any = () => { };
  public onTouched: any = () => { };
  private toUpload: number;

  public uploading: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fileService: FileService
  ) {
    this.value = [];
    this.toUpload = 0;
  }

  ngAfterViewInit(): void {
    
  }

  writeValue(obj: Image[]): void {
    if(obj){
      this.value = obj;
    }else{
      this.value = [];
    }
  }

  registerOnChange(fn: any): void {

    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw ('Not Implemented')
  }

  public fileBrowseHandler(event: any) {
    let files: FileList = event.target.files;
    this.uploading.emit(true);
    this.toUpload = files.length;

    for (let i = 0; i < files.length; i++) {
      const element = files.item(i);
      if (element) {

        if (!this.isValidFile(element)) {
          continue;
        }

        let image: Image = { name: element.name, is_active: true, is_new: true, url: '', filename:'',progress: 0 };
        this.value.push(image);
        this.fileService.upload(element).subscribe(request => {

          if (request.type === HttpEventType.UploadProgress) {
            image.progress = Math.round(100 * request.loaded / request.total);
          } else if (request instanceof HttpResponse) {
            let body = request.body;
            
            image.url = body.data.temp;
            image.filename = body.data.filename;
            this.finishUpload();
          }
        });
        
      }

    }
  }

  private isValidFile(file: File): boolean {
    const re = new RegExp('image\/.*');
    return re.test(file.type);
  }

  private finishUpload() {
    this.toUpload--;
    if (this.toUpload == 0) {
      this.uploading.emit(false);
    }
    this.onChange(this.value);
  }

  public removeImage(image){
    image.is_active = !image.is_active ;
    this.onChange(this.value);
  }

}

interface Image {
  url: string,
  name: string,
  is_new: boolean,
  is_active: boolean,
  filename?:string,
  progress?: number
}