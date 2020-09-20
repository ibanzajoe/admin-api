module.exports = function(sequelize, DataTypes) {
  const Lessons = sequelize.define('Lessons', {
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
    tableName: 'Lessons',
    timestamps: true
  })

  Lessons.buildNewUser = function (params) {
    

    return lesson
  }

  Lessons.addHook('beforeSave', function (lesson, options) {
    
  })

  /* Users.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password_digest)
  } */

  return Lessons
}