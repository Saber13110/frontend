import { Injectable } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  private reader = new BrowserMultiFormatReader();

  isSupported(): boolean {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  async scan(previewElem: HTMLVideoElement): Promise<string> {
    if (!this.isSupported()) {
      throw new Error('Camera API not supported');
    }

    return new Promise<string>((resolve, reject) => {
      this.reader
        .decodeFromVideoDevice(undefined, previewElem, (
          result,
          error,
          controls
        ) => {
          if (result) {
            controls.stop();
            resolve(result.getText());
          }
          if (error) {
            console.error(error);
          }
        })
        .catch(err => reject(err));
    });
  }
}
