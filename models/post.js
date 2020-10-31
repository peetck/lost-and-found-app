class Post {
  constructor(id, title, description, categoryId, imageUrl, lat, long) {
    this.id = id;
    this.categoryId = categoryId;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.lat = lat;
    this.long = long;
  }
}

export default Post;
