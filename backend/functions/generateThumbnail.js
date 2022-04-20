exports.generateThumbnail = async (event, context) => {
  const { Storage } = require('@google-cloud/storage');
  const sharp = require('sharp');

  const storage = new Storage();
  const size = [
    ['L', 320],
    ['M', 640],
    ['S', 1280],
  ];

  // console.log('파일명', event.name);

  if (event.name.includes('thumb')) return;

  await Promise.all(
    size.forEach((e) => {
      return new Promise((resolve, reject) => {
        storage
          .bucket('yanolja')
          .file(event.name)
          .createReadStream()
          .pipe(sharp().resize({ width: e[1] }))
          .pipe(
            storage
              .bucket('yanolja')
              .file(`thumb/${e[0]}/${event.name}`)
              .createWriteStream(),
          )
          .on('finish', () => resolve(`yanolja/thumb/${e[0]}/${event.name}`))
          .on('error', (error) => reject('error: ' + error));
      });

      //   console.log('commit');
    }),
  );
};

/////////////////////////////////////////
// 성주
// exports.generateThumbnail = async (event, context) => {
//   const { Storage } = require('@google-cloud/storage');
//   const sharp = require('sharp');
//   const size = [
//     ['s', 320],
//     ['m', 640],
//     ['l', 1280],
//   ];
//   if (event.name.includes('thumb')) return;
//   const storage = new Storage();

//   await Promise.all(
//     size.forEach((el) => {
//       return new Promise(() => {
//         storage
//           .bucket('yanolja')
//           .file(event.name)
//           .createReadStream()
//           .pipe(sharp().resize({ width: el[1] }))
//           .pipe(
//             storage
//               .bucket('yanolja')
//               .file(`thumb/${el[0]}/${event.name}`)
//               .createWriteStream(),
//           )
//           .on('finish', () => console.log('성공'));
//       });
//     }),
//   );
// };
/////////////////////////////////////////

// backup
// exports.generateThumbnail = (event, context) => {
//   const { Storage } = require('@google-cloud/storage');
//   const sharp = require('sharp');

//   const storage = new Storage();
//   const size = [
//     ['L', 320],
//     ['M', 640],
//     ['S', 1280],
//   ];

//   console.log('파일명', event.name);

//       size.forEach((e) => {
//         return storage
//           .bucket('yanolja')
//           .file(event.name)
//           .createReadStream()
//           .pipe(sharp().resize({ width: e[1] }))
//           .pipe(
//             storage
//               .bucket('yanolja')
//               .file(`thumb/${e[0]}/${event.name}`)
//               .createWriteStream(),
//           )
//           .on('finish', () => console.log('성공!'));
//       });

//       console.log('commit');

// };
