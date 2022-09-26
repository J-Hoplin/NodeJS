const Sequelize = require('sequelize')

class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            comment : {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            created_at : {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            }
        },{
            sequelize,
            timestamps: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    // 다른 모델의 정보가 들어가는 테이블에 belongsTo를 사용한다.
    // Comments라는 테이블의 commenter에 User가 들어가기 때문에, belongsTo를 적어주는 것이다.
    static associate(db){
        db.Comment.belongsTo(db.User, {
            foreignKey : 'commenter',
            targetKey : 'id'
        })
    }
}

module.exports = {
    Comment
}