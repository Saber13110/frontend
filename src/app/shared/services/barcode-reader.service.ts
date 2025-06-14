import { Injectable } from '@angular/core';
import { BrowserBarcodeReader } from '@zxing/library';

@Injectable({
  providedIn: 'root'
})
export class BarcodeReaderService {
  private reader = new BrowserBarcodeReader();

  async decodeBarcode(file: File): Promise<string> {
    const url = URL.createObjectURL(file);
    try {
      const result = await this.reader.decodeFromImageUrl(url);
      return result.getText();
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}
