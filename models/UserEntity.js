"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	var UserDetails = sequelize.define(
		'user_details',
		{
			username: {
				type: DataTypes.STRING,
				field: "username"
				
			},
			phone: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: true,
				field: "phone",
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				field: "email",
                primaryKey: true
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "role"
			},
			password: {
				type: DataTypes.STRING,
				field: "password",
                 allowNull: false
			}
		},
		{
			timestamps: false,
			underscored: true
		}
	);

	return UserDetails;
};

