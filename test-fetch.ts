
import Medusa from "@medusajs/js-sdk";

const medusa = new Medusa({
    baseUrl: "http://localhost:9000",
    debug: true,
    publishableKey: "pk_8b5da050bd28e5149f444fb9f426269f4e27ad650e3584ade146074d3a348325"
});

async function testFetch() {
    console.log("Fetching product with region_id and fields...");
    try {
        const response = await medusa.store.product.list({
            handle: "dry-fruits",
            limit: 1,
            region_id: "reg_01KHDS81C9AB0RD3XK6GW46M7D",
            fields: "*variants.calculated_price,+variants.prices",
        });

        if (response.products && response.products.length > 0) {
            const p = response.products[0];
            const v = p.variants[0];
            console.log(`Product: ${p.title}`);
            console.log(`Calculated Price:`, v.calculated_price);
            console.log(`Prices Array:`, v.prices);
        } else {
            console.log("No product found");
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

testFetch();
