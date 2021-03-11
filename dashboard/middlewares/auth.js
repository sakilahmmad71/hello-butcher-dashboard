const checkUserRole = (roles) => (req, res, next) => {
	if (roles.includes(req.user.role)) {
		return next();
	}

	return res.status(401).json('Unauthorized');
};

module.exports = {
	checkUserRole,
};
