// Central place for test data (credentials are public demo credentials from saucedemo.com)
const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  invalid: { username: 'standard_user', password: 'wrong_password' },
};

const products = {
  backpack: { id: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' },
  bikeLight: { id: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light' },
  boltTShirt: { id: 'sauce-labs-bolt-t-shirt', name: 'Sauce Labs Bolt T-Shirt' },
};

const checkoutInfo = {
  firstName: 'Satyam',
  lastName: 'Tiwari',
  postalCode: '400001',
};

module.exports = { users, products, checkoutInfo };
