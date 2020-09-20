module.exports = function(sequelize, DataTypes) {
  const Journals = sequelize.define('Journals', {
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
    }
  }, {
    tableName: 'Journals',
    timestamps: true
  })

  Journals.buildNewUser = function (params) {
    

    return lesson
  }

  Journals.addHook('beforeSave', function (journal, options) {
    
  })

  /* Users.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password_digest)
  } */

  return Journals
}