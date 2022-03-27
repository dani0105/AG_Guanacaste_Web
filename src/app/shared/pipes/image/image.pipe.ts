import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@enviroment/environment';



@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(url:string,optional?:string): string {
    if(optional){
      return `${environment.api}/${optional}`;
    }
    return `${environment.api}/${url}`;
  }

}
