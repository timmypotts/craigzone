module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: []
      }
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priceMin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priceMax: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Search.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Search.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Search;
};
