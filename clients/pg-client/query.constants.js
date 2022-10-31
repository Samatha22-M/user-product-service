const updateInventoryCount = (product_name, inventory_count) => {
    return `update "product_details" set "inventory_count"= ${inventory_count} where "product_name"='${product_name}'`;
};

module.exports = {
    updateInventoryCount,
};