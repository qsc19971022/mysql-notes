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
    let User = sequelize.define('user',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true
        },
        age:{
            type:Sequelize.INTEGER,
            defaultValue:33
        },
        gender:{
            type:Sequelize.ENUM(['男','女','妖']),
            defaultValue: '男'
        }
    },{
        freezeTableName:true,  // 不需要将表名变成负数
        timestamps:false,  //不需要createAt和updateAt两个字段
        indexes:[
            {
                name:'index_age',  // 索引名称
                fields:['age']   // 索引字段名称
            }
        ]
    });
//    5.查询数据
//     let u = await User.findByPk(2);
    // console.log(u.dataValues);
    // 6.修改数据
    // u.name = 'qsc';
    // await u.save();

    // User.update({
    //     name:'woftsun',
    // },
    //     {
    //         where:{
    //             id:2
    //         }
    //     });

    // 7.删除数据
    User.destroy({
        where:{
            id:2
        }
    })
})();