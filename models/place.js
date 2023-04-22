export class Place {
  constructor(title, imageUri, location, id) {
    const { address, lat, lng } = location;

    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = { lat, lng }; // { lat: 0.141241, lng: 127.121 }
    this.id = id;
  }
}
