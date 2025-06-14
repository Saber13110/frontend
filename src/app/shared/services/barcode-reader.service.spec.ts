import { TestBed } from '@angular/core/testing';
import { BarcodeReaderService } from './barcode-reader.service';
import { BrowserBarcodeReader, Result } from '@zxing/library';

describe('BarcodeReaderService', () => {
  let service: BarcodeReaderService;
  let mockReader: jasmine.SpyObj<BrowserBarcodeReader>;

  beforeEach(() => {
    mockReader = jasmine.createSpyObj('BrowserBarcodeReader', ['decodeFromImageUrl']);
    TestBed.configureTestingModule({
      providers: [BarcodeReaderService, { provide: BrowserBarcodeReader, useValue: mockReader }]
    });
    service = TestBed.inject(BarcodeReaderService);
    (service as any).reader = mockReader;
  });

  it('should decode barcode from file', async () => {
    const fakeResult = { getText: () => 'CODE123' } as Result;
    mockReader.decodeFromImageUrl.and.returnValue(Promise.resolve(fakeResult));
    const file = new File(['dummy'], 'code.png');
    await expectAsync(service.decodeBarcode(file)).toBeResolvedTo('CODE123');
  });
});
