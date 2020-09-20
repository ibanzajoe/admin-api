module.exports = function(sequelize, DataTypes) {
  const Courses = sequelize.define('Courses', {
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
    tableName: 'Courses',
    timestamps: true
  })

  Courses.buildNewUser = function (params) {
    

    return course
  }

  Courses.addHook('beforeSave', function (course, options) {
    
  })

  /* Users.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password_digest)
  } */

  return Courses
}