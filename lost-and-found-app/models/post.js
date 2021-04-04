class Post {
  constructor(
    id,
    title,
    description,
    categoryId,
    imageUrl,
    mapUrl,
    lat,
    lng,
    expirationDate,
    uid,
    distance,
    address
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.mapUrl = mapUrl;
    this.lat = lat;
    this.lng = lng;
    this.expirationDate = expirationDate;
    this.uid = uid;
    this.distance = distance;
    this.address = address;
  }
}

export default Post;
