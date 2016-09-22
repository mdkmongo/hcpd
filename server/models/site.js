import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
* Site Schema
*/
const SiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  themeOptions: [{
    font: {
      type: String
    },
    color: {
      type: String
    },
    bodyColor: {
      type: String
    },
    featuredListingImage: {
      type: String
    },
    header: {
      type: String
    }
  }],
  listingOptions: [{
    optionName: {
      type: String,
      required: true
    },
    optionType: {
      type: String,
      required: true,
      enum: ['checkbox', 'text', 'select', 'textarea']
    },
    optionValues: {
      type: Array
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
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

/**
* Methods
*/
SiteSchema.method({
});

/**
* Statics
*/
SiteSchema.statics = {
  /**
   * Get site
   * @param {ObjectId} id - The objectId of site.
   * @returns {Promise<Site, APIError>}
   */
  get(id) {
    return this.findById(id)
      .execAsync().then((site) => {
        if (site) {
          return site;
        }
        const err = new APIError('No such site exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List sites in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .execAsync();
  }
};

/**
* @typedef Site
*/
export default mongoose.model('Site', SiteSchema);
