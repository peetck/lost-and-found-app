class Post {
  constructor(
    id,
    title,
    description,
    categoryId,
    imageUrl,
    mapUrl,
    lat,
    long,
    expirationDate,
    uid,
    distance
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.mapUrl = mapUrl;
    this.lat = lat;
    this.long = long;
    this.expirationDate = expirationDate;
    this.uid = uid;
    this.distance = distance;
  }
}

export default Post;
