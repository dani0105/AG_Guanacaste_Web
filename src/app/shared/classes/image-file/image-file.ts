export class ImageFile {

  private fileObject: File;
  private is_active: boolean;
  private is_new: boolean;

  constructor(fileObject: File, is_active: boolean, is_new: boolean) {
    this.fileObject = fileObject;
    this.is_active = is_active;
    this.is_new = is_new;
  }


}
