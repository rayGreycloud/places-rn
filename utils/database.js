import * as SQLite from 'expo-sqlite';

import { Place } from '../models/place';

const db = SQLite.openDatabase('places.db');

export function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL, 
          title TEXT NOT NULL, 
          imageUri TEXT NOT NULL, 
          address TEXT NOT NULL, 
          lat REAL NOT NULL, 
          lng REAL NOT NULL
        );`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}

export function insertPlace({ title, imageUri, address, location }) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [title, imageUri, address, location.lat, location.lng],
        (_, result) => {
          console.log('insertPlace result: ', result);
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          let places = [];

          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng
                },
                dp.id
              )
            );
          }

          resolve(places);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          const dp = result.rows._array[0];

          resolve(
            new Place(
              dp.title,
              dp.imageUri,
              {
                address: dp.address,
                lat: dp.lat,
                lng: dp.lng
              },
              dp.id
            )
          );
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}
