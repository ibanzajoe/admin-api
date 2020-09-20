const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password_digest, salt, null))
    .then(hash => {
      user.setDataValue('password_digest', hash)
    })
}

module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password_digest: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM({
        values: [ 'active', 'pending', 'inactive', 'banned' ]
      }),
      allowNull: false,
      defaultValue: 'pending'
    },
    role: {
      type: DataTypes.ENUM({
        values: [ 'admin', 'user', 'contributor', 'associate', 'sales' ]
      }),
      allowNull: false,
      defaultValue: 'user'
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    company: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reset_password_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    oauth: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    tableName: 'Users',
    timestamps: true
  })

  Users.buildNewUser = function (params, role = 'users') {
    let user = Users.build({
      email: params.email,
      password_digest: bcrypt.hashSync(params.password, bcrypt.genSaltSync(10), null)
    })

    return user
  }

  Users.addHook('beforeSave', (user) => {
    if (user.password) user.password_digest = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
  })

  Users.addHook('beforeBulkCreate', (users) => {
    for (var i = 0; i < users.length; i++) {
      if (users[i].password) {
        const user_password = users[i].password
        users[i].password_digest = bcrypt.hashSync(user_password, bcrypt.genSaltSync(10), null)
        users[i].password = null
      }
    }
    
  })

  Users.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password_digest)
  }

  return Users
}