const Sequelize = require('sequelize');
(async () => {
    const sequelize = new Sequelize('student','root','10170551',{
        host:'127.0.0.1',  // mysql服务器地址
        port:3306,  // 端口号
        dialect:'mysql', // 告诉sequelize当前要操作的数据库类型，因为他不仅仅能操作mysql还可以操作其他数据库
        pool:{
            max:5,  // 最多有多少个连接
            min:0,  // 最少有多少个连接
            idle:10000,  // 当前连接多久没有操作就断开
            acquire:30000  // 多久没有获取到连接就断开
        }
    });
    let Student = sequelize.define('student',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true
        }
    },{
        freezeTableName:true,  // 不需要将表名变成负数
        timestamps:false,  //不需要createAt和updateAt两个字段
    });
    let Teacher = sequelize.define('teacher',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true
        }
    },{
        freezeTableName:true,  // 不需要将表名变成负数
        timestamps:false,  //不需要createAt和updateAt两个字段
    });
    let Relation = sequelize.define('relation',{
        studentId:{
            type:Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:Student,
                key:'id'
            }
        },
        teacherId:{
            type:Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:Teacher,
                key: 'id'
            }
        }
    },{
        freezeTableName:true,  // 不需要将表名变成负数
        timestamps:false,  //不需要createAt和updateAt两个字段
    });
    /*
    * 4.建立查询关系
    * 注意点：
    * 只要建立了人和书的关系，那么在查询人的时候就可以把人拥有的那本书也查出来
    * 只要建立了书和人的关系，那么在查询书的时候就可以把书对应的人也查询出来
    * 如果没有建立相互关系，那么就不能查询相关的内容
    * */
    Student.belongsToMany(Teacher,{
        through:Relation
    });
    Teacher.belongsToMany(Student,{
        through:Relation
    });
    // sequelize.sync();
   // 5.关联查询
    let u = await Student.findAll({
        include:{
            model:Teacher
        }
    });
    u = u.map(item => item.dataValues);
    console.log(u);

    let b = await Teacher.findAll({
        include:{
            model:Student
        }
    });
    b = b.map(item => item.dataValues);
    console.log(b);
})();