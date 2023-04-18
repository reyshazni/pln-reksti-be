const { pushEnabled } = require('./index');

const switchRtHandler = (request, h) => {
  const {condition} = request.payload;

  if (condition == 'on') {
    pushEnabled.pushEnabled = true;
    return {
      message: 'Pipeline to real-time database is running!',
    }
  } else if (condition == 'off') {
    pushEnabled.pushEnabled = false;
    return {
      message: 'Pipeline to real-time database has been stopped!',
    }
  } else {
    const response = h.response({
      message: 'GAGAL',
    }).code(404);
    return response;
  }
};

module.exports = { switchRtHandler };