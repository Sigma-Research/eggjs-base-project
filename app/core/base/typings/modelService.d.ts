import * as sequelize from "sequelize"

// 对默认类型的拓展
declare module 'sequelize' {

}

// 新接口
declare namespace superSequelize {

    interface GetOneOptions<T> extends sequelize.FindOptions<T> {
        where?: sequelize.WhereOptions<T>,
    }

    interface GetListOptions<T> extends GetOneOptions<T> {
        where?: sequelize.WhereOptions<T>,
        page?: number,
        pageSize?: number
    }

    interface UpdateOptions<T> extends sequelize.UpdateOptions {
        where: sequelize.AnyWhereOptions & T,
    }

    interface DefineAttributeColumnOptions extends sequelize.DefineAttributeColumnOptions {
        allowUpdate?: boolean;
    }

    interface DefineAttributes extends sequelize.DefineAttributes {
        [name: string]: DefineAttributeColumnOptions;
    }
}

export = superSequelize

