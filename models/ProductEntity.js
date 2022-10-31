
module.exports = (sequelize, DataTypes) => {
    var ProductDetails = sequelize.define(
        'product_details',
        {
            productName: {
                primaryKey: true,
                field: "product_name",
                type: DataTypes.STRING,

            },
            productPrice: {
                field: "product_price",
                type: DataTypes.INTEGER,
                allowNull: false
            },
            productDescription: {
                field: "product_description",
                type: DataTypes.STRING,
                allowNull: false,
            },
            inventoryCount: {
                field: "inventory_count",
                type: DataTypes.INTEGER,
                allowNull: false
            },

        },
        {
            timestamps: false,
            underscored: true
        }
    );

    return ProductDetails;
};

