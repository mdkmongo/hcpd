import Listing from '../models/listing';

/**
 * Load listing and append listing to req.
 */
// function load(req, res, next, id) {
//   Listing.get(id).then((listing) => {
//     req.listing = listing;    // eslint-disable-line no-param-reassign
//     return next();
//   }).error((e) => next(e));
// }

/**
 * Get listings
 * @returns {Listing}
 */
// function get(req, res) {
//   return res.json(req.listings);
// }

/**
* Create new listing
* @returns {Listing}
*/
function create(req, res, next) {
  const {
    siteId = '',
    firstName = '',
    lastName = '',
    paymentMethods = [],
    languagesSpoken = [],
    typeOfPractice = '',
    officeManagersName = '',
    practiceWebsite = '',
    practicePhone = '',
    zipCode = '',
    state = '',
    city = '',
    addressOne = '',
    addressTwo = '',
    country = '',
    practiceName = '',
    takingPatients = '',
    sex = '',
    email = '',
    designation = '',
    lat = null,
    long = null } = req.body;
  const listing = new Listing({
    site_id: siteId,
    first_name: firstName,
    last_name: lastName,
    payment_methods: paymentMethods,
    languages_spoken: languagesSpoken,
    type_of_practice: typeOfPractice,
    office_managers_name: officeManagersName,
    practice_website: practiceWebsite,
    practice_phone: practicePhone,
    zip_code: zipCode,
    state: state, // eslint-disable-line object-shorthand
    city: city, // eslint-disable-line object-shorthand
    address_1: addressOne,
    address_2: addressTwo,
    country: country, // eslint-disable-line object-shorthand
    practice_name: practiceName,
    taking_patients: takingPatients,
    sex: sex, // eslint-disable-line object-shorthand
    email: email, // eslint-disable-line object-shorthand
    designation: designation, // eslint-disable-line object-shorthand
    lat: lat, // eslint-disable-line object-shorthand
    long: long, // eslint-disable-line object-shorthand
  });
  listing.saveAsync()
    .then((savedListing) => res.json(savedListing))
    .error((e) => next(e));
}

/**
 * Get listing list.
 * @property {number} req.query.skip - Number of listings to be skipped.
 * @property {number} req.query.limit - Limit number of listings to be returned.
 * @returns {Listing[]}
 */
function list(req, res, next) {
  const { limit = 1000, skip = 0, siteId = '' } = req.query;
  Listing.list({ limit, skip, siteId }).then((listings) => res.json(listings))
    .error((e) => next(e));
}

export default { list, create };
