module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1810cbff6e68eab48712f87cd4c86210'),
  },
});
