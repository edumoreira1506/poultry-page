export default function imageFormatter(imageUrl: string) {
  return {
    original: `https://cig-maketplace.s3.sa-east-1.amazonaws.com/poultries/images/${imageUrl}`,
    thumbnail: `https://cig-maketplace.s3.sa-east-1.amazonaws.com/poultries/images/${imageUrl}`,
  }
}
