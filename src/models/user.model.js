module.exports = (sequelize, DataTypes, Model) => {
    class User extends Model {};

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        username: {
            type: DataTypes.STRING(30),
            allowNull: false
        },

        mail: {
            type: DataTypes.STRING(70),
            allowNull: false
        },

        pass: {
            type: DataTypes.STRING(250),
            allowNull: false
        },

        lastLogin: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: process.env.DBTABLE,
        modelName: 'User',
        createdAt: true,
        updatedAt: false,
        sequelize
    })

    return User;
}