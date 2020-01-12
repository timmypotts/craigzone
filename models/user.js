const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      wantsEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      item: {
        type: DataTypes.STRING,
        allowNull: true
      },
      priceMin: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      priceMax: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    { freezeTableName: true, timestamps: false }
  );

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  //Associating the user with their search preferences
  // User.associate = function(models) {
  //   User.hasMany(models.Results, {
  //     onDelete: "cascade"
  //   });
  // };

  return User;
};
