import {
    createWorkflow,
    WorkflowResponse,
    createStep,
    StepResponse
} from "@medusajs/framework/workflows-sdk"
import {
    createProductsWorkflow,
    createInventoryItemsWorkflow,
    createLinksWorkflow
} from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"

interface CreateSimpleProductInput {
    title: string
    description: string
    price: number
    inventory_quantity: number
    thumbnail?: string
}

export const createSimpleProductWorkflow = createWorkflow(
    "create-simple-product",
    function (input: CreateSimpleProductInput) {
        const products = createProductsWorkflow.runAsStep({
            input: {
                products: [{
                    title: input.title,
                    description: input.description,
                    thumbnail: input.thumbnail,
                    options: [{
                        title: "Default",
                        values: ["Default Variant"]
                    }],
                    variants: [{
                        title: "Default Variant",
                        options: {
                            "Default": "Default Variant"
                        },
                        prices: [{
                            amount: input.price,
                            currency_code: "inr",
                        }]
                    }]
                }]
            }
        })

        return new WorkflowResponse(products)
    }
)
