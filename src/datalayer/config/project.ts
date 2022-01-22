export default {
  restify: {
    name   : process.env.APPLICATION_NAME || 'Backend Service',
    port   : process.env.PORT || 6000,
    version: process.env.APPLICATION_API_VERSION || '1.0.0',
  },
};

