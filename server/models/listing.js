import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import filterInt from '../helpers/filterInt';
import geocoder from 'geocoder';

/**
* Listing Schema
*/
const ListingSchema = new mongoose.Schema({
  site_id: String,
  first_name: String,
  last_name: String,
  payment_methods: [],
  languages_spoken: [],
  type_of_practice: String,
  office_managers_name: String,
  practice_website: String,
  practice_phone: String,
  zip_code: Number,
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address_1: {
    type: String,
    required: true
  },
  address_2: String,
  country: String,
  practice_name: String,
  taking_patients: String,
  sex: String,
  email: String,
  designation: String,
  lat: Number,
  long: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
* Add your
* - pre-save hooks
* - validations
* - virtuals
*/
ListingSchema.pre('save', function (next) { // eslint-disable-line func-names
  const listing = this;
  geocoder.geocode(`${listing.address_1},${listing.city},${listing.state}`, (err, data) => {
    if (err) {
      const message = 'There was an error searching for location, check the location';
      const aperr = new APIError(message, httpStatus.NOT_FOUND);
      return Promise.reject(aperr);
    }
    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      listing.lat = lat;
      listing.long = lng;
      return next();
    }
    const errs = new APIError('No such location exists, check your entry!', httpStatus.NOT_FOUND);
    return Promise.reject(errs);
  });
});


/**
* Methods
*/
// ListingSchema.methods = {
//   validStreetAddress(address) {
//     return ',#-/ !@$%^*(){}|[]\\'.indexOf(address) >= 0;
//   }
// };

/**
* Statics
*/
ListingSchema.statics = {
  /**
   * Get listing
   * @param {ObjectId} id - The objectId of listing.
   * @returns {Promise<Listing, APIError>}
   */
  get(id) {
    return this.findOne({ _id: id })
      .execAsync().then((site) => {
        if (site) {
          return site;
        }
        const err = new APIError('No such listing exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List sites in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of listings to be skipped.
   * @param {number} limit - Limit number of listings to be returned.
   * @returns {Promise<Listing[]>}
   */
  list({ skip = 0, limit = 1000, siteId = false } = {}) {
    skip = filterInt(skip); // eslint-disable-line no-param-reassign
    limit = filterInt(limit); // eslint-disable-line no-param-reassign
    if (siteId) {
      return this.find({ site_id: siteId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .execAsync();
    }
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .execAsync();
  }
};

/**
* @typedef Listing
*/
export default mongoose.model('Listing', ListingSchema);
