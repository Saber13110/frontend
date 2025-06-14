import { Injectable } from '@angular/core';
import { BrowserMultiFormatReader, BrowserCodeReader } from '@zxing/browser';
import { Result } from '@zxing/library';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  private reader = new BrowserMultiFormatReader();

  constructor() {}

  /**
   * Start scanning from the user's camera. A temporary video element
   * is added to the DOM while scanning.
   * @returns Promise resolved with the decoded barcode string or null if none.
   */
  async scan(): Promise<string | null> {
    const video = document.createElement('video');
    document.body.appendChild(video);
    try {
      const result: Result = await this.reader.decodeOnceFromVideoDevice(undefined, video);
      return result.getText();
    } catch (err) {
      console.error('Barcode scan failed:', err);
      return null;
    } finally {
      BrowserCodeReader.releaseAllStreams();
      video.remove();
    }
  }
}
