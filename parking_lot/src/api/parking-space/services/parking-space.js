'use strict';

/**
 * parking-space service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::parking-space.parking-space');
