const Tags = require("./Tags")
const Lessons = require("./Lessons")
const Entries = require("./Entries")

module.exports = function(sequelize, DataTypes) {
  const TagsTo = sequelize.define('TagsTo', {
    TagsId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tags,
        key: 'id'
      }
    },
    LessonsId: {
      type: DataTypes.INTEGER,
      references: {
        model: Lessons,
        key: 'id'
      }
    },
    EntriesId: {
      type: DataTypes.INTEGER,
      references: {
        model: Entries,
        key: 'id'
      }
    }
  }, {
    tableName: 'TagsTo',
    timestamps: true
  })

  /* Users.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password_digest)
  } */

  return TagsTo
}