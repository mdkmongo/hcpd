import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/sites
  createSite: {
    body: {
      name: Joi.string().required()
    }
  },

  // UPDATE /api/sites/:siteId
  updateSite: {
    body: {
      name: Joi.string().required()
    },
    params: {
      siteId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/listings/
  createListing: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      addressOne: Joi.string().required()
    }
  },

  updateListing: {
    body: {
      siteId: Joi.string().hex().required()
    }
  }
};
