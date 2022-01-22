export default {
  mongo: {
    'default': {
      sharding: false,
      uri     : process.env.CONNECTION_DATABASE_MONGO || '',
    },
  },
};
