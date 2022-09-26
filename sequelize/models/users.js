const Sequelize = require('sequelize')

class User extends Sequelize.Model {
    /**
     * 
     * 모델은 크게 static int, static associate메소드로 나뉜다
     * 
     * init메소드에는 테이블에 대한 설정을 한다
     * 
     * associate메소드에는 다른 모델과의 관계를 적는다.
     * 
     * sequelize는 알아서 id를 기본 키로 연결하므로 id 컬럼은 적어줄 필요가 없다.
     */
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull:false
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            created_at : {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        },{
            sequelize, // static init 메소드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣어야 한다.
            timestamps: false, // true시 createAt, updateAt칼럼이 추가된다. 그리고 각각 생성 수정 시간이 반영된다
            underscored: false, // 테이블과 칼럼 명을 자동으로 카멜 케이스로 만든다.
            modelName: 'User', // 프로젝트에서 사용하는 모델 명
            tableName: 'users', // 실제 데이터 베이스의 테이블 이름
            paranoid: false, // deletedAt이라는 컬럼이 생긴다.로우를 삭제할때 완전히 지워지지 않고 deletedAt에 지운 시각이 기록된다.. https://sequelize.org/docs/v6/core-concepts/paranoid/
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    // User는 여러개의 Comment를 가질 수 있다.
    // 이러한 관계를 1 : N이라고 하는데 이럴때는 hasMany()메소드를 사용한다
    static associate(db){
        db.User.hasMany(db.Comment, {
            foreignKey : 'commenter',
            sourceKey : 'id'
        })
    }
}

module.exports = {
    User
}