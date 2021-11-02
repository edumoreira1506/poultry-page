export default function imageFormatter(imageUrl: string, folder = 'images') {
  return {
    original: `https://cig-maketplace.s3.sa-east-1.amazonaws.com/poultries/${folder}/${imageUrl}`,
    thumbnail: `https://cig-maketplace.s3.sa-east-1.amazonaws.com/poultries/${folder}/${imageUrl}`,
  }
}
