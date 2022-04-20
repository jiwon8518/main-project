import { Storage } from '@google-cloud/storage';
import { resolve } from 'path/posix';
const sharp = require('sharp');

exports.generateThumbnail = async (event, context) => {
  // 1. event 와 context의 데이터를 간단히 로그로 확인하기
  console.log('hello world!!!');
  console.log('=========================');
  console.log('context:', context);
  console.log('event:', event);
  console.log('=========================');

  // // 2. event 안에 있는 file을 활용하여 썸네일 생성
  // sharp().resize({ width: 320 }); // 가로 길이에 맞게 세로 비율에 맞게 조정가능

  // 2. 이미 썸네일이 있는 경우 종료( 즉, 썸네일로 트리거된 경우)
  if (event.name.includes('thumb/')) {
    return;
  }
  // 3. 썸네일 프로세스
  const storage = new Storage().bucket(event.bucket);

  await new Promise((resolve, reject) => {
    storage
      .file(event.name)
      .createReadStream() // 4. 기존의 파일을 읽어오기
      .pipe(sharp().resize({ width: 320 })) // 5. event 안에 있는 file 을 활용하여 썸네일 생성
      .pipe(storage.file(`thumb/${event.name}`).createWriteStream()) // 6. 생성된 썸네일 재업로드
      .on('finish', () => resolve())
      .on('error', () => reject());
  });

  await new Promise((resolve, reject) => {
    storage
      .file(event.name)
      .createReadStream() // 4. 기존의 파일을 읽어오기
      .pipe(sharp().resize({ width: 640 })) // 5. event 안에 있는 file 을 활용하여 썸네일 생성
      .pipe(storage.file(`thumb/${event.name}`).createWriteStream()) // 6. 생성된 썸네일 재업로드
      .on('finish', () => resolve())
      .on('error', () => reject());
  });

  await new Promise((resolve, reject) => {
    storage
      .file(event.name)
      .createReadStream() // 4. 기존의 파일을 읽어오기
      .pipe(sharp().resize({ width: 1280 })) // 5. event 안에 있는 file 을 활용하여 썸네일 생성
      .pipe(storage.file(`thumb/${event.name}`).createWriteStream()) // 6. 생성된 썸네일 재업로드
      .on('finish', () => resolve())
      .on('error', () => reject());
  });
};
