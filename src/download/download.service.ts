import { Injectable } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DownloadService {
  imageBuffer() {
    return readFileSync(join(process.cwd(), 'Karga press kit.docx'));
  }

  imageStream() {
    return createReadStream(join(process.cwd(), 'Karga press kit.docx'));
  }

  fileBuffer() {

    return readFileSync(join(process.cwd(), 'Karga press kit.docx'));
  }

  fileStream() {
    console.log(join(process.cwd(), 'test.txt'));
    return createReadStream(join(process.cwd(), 'Karga press kit.docx'));
  }
}
