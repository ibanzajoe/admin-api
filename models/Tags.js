module.exports = function(sequelize, DataTypes) {
  const Tags = sequelize.define('Tags', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Tags',
    timestamps: true
  })

  Tags.buildNewTag = function (params) {
    

    return tag
  }

  Tags.addHook('beforeSave', function (tag, options) {
    
  })

  /* Users.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password_digest)
  } */

  return Tags
}