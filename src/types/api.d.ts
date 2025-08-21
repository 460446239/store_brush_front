interface BrushOrder {
    id: number
    // 订单ID
    order_id: string
    // 订单总价
    total_price: string
    // 欠款
    pay_price: string
    // 单价
    price: string
    // 评分
    evaluate: string
    // 付款结果
    paid: boolean
    // 利润
    rebate_fee: string
    // 产品信息
    cart_id: {
        num: number
        goods: {
            image: string
            store_name: string
            price: string
        }
    }
    // 交易时间
    add_time: number
}

interface Address {
    address: string
    chain: string
}

interface Paginate<T> {
    page: number
    limit: number
    count: number
    data: T[]
}