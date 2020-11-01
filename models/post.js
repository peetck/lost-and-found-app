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
    uid
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
  }
}

export default Post;
