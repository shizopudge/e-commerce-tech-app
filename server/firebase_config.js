const admin = require('firebase-admin');
const credentials = require('./serviceAccount.json');
const { FieldValue } = require('firebase-admin/firestore');

admin.initializeApp({credential: admin.credential.cert(credentials)});

const db = admin.firestore();

module.exports = {
  admin:  admin,
  db: db,
  fieldValue: FieldValue,
}