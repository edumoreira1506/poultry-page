export default function imageFormatter(imageUrl: string, folder = 'images') {
  return {
    original: `https://cig-maketplace.s3.sa-east-1.amazonaws.com/poultries/${folder}/${imageUrl}`,
    thumbnail: `https://cig-maketplace.s3.sa-east-1.amazonaws.com/poultries/${folder}/${imageUrl}`,
    originalHeight: 300,
    originalWidth: 300,
    thumbnailHeight: 100,
    thumbnailWidth: 100,
  }
}
