module.exports = function(sequelize, DataTypes) {
  const Entries = sequelize.define('Entries', {
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
    },
    images: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    main_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    tableName: 'Entries',
    timestamps: true
  })

  Entries.buildNewUser = function (params) {
    

    return entry
  }

  Entries.addHook('beforeSave', function (entry, options) {
    
  })

  /* Users.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password_digest)
  } */

  return Entries
}