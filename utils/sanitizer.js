exports.sanitizeUser = function(user) {
    return {
      id: user.id,
      name: user.username,
      email: user.email
    };
  };