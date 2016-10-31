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
  site_id: {
    type: String
  },
  listing_options: [
    {
      label: {
        type: String,
        required: true
      },
      field_type: {
        type: String,
        required: true,
        enum: ['textarea', 'text', 'select', 'checkbox', 'bullet']
      },
      field_values: {
        type: Array
      }
    }
  ],
  listings: {
    type: Array
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
SiteSchema.methods = {
};

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
    return this.findOne({ site_id: id })
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
   * @param {number} skip - Number of sites to be skipped.
   * @param {number} limit - Limit number of sites to be returned.
   * @returns {Promise<Site[]>}
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
