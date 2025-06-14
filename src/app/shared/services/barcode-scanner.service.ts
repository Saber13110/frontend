import { Injectable } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import type { Result } from '@zxing/library';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {
  private reader = new BrowserMultiFormatReader();

  /**
   * Start scanning a barcode using the provided video element.
   * Resolves with the decoded text once a barcode is detected.
   * @param video HTML video element used to display the camera stream
   */
  async startScanning(video: HTMLVideoElement): Promise<string> {
    const result: Result = await this.reader.decodeOnceFromVideoDevice(undefined, video);
    return result.getText();
  }

  /** Stop any ongoing scan and release the camera. */
  stopScanning(): void {
    try {
      (this.reader as any).reset?.();
    } catch {
      /* noop */
    }
  }
}
