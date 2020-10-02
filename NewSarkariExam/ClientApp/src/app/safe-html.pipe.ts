import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHTML'
})
export class SafeHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}
  transform(style: string): SafeHtml  {
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }

}
