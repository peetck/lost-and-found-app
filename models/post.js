class Post {
  constructor(
    id,
    title,
    description,
    categoryId,
    imageUrl,
    lat,
    long,
    expirationDate
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.lat = lat;
    this.long = long;
    this.expirationDate = expirationDate;
  }
}

export default Post;
