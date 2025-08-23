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

interface ClashFlow {
    // 余额
    balance: string
    // 提现类型, 提现 | 佣金提现到余额 | 抢单解冻资金 | 余额支付购买商品
    type: "withdral" | "extract" | "orderpay" | "pay_product"
    // 提现金额
    number: string
    // 状态
    status: 0 | 1,
    // 时间
    add_time: string
}
interface Rechrage {
    // 充值币种
    currency: string
    // 充值金额
    price: string
    // 充值时间
    _add_time: string
}
interface Withdraw {
    // 提现地址
    bank_address: string
    // 提现金额
    extract_price: string
    // 提现状态
    status: number
    // 提现时间
    add_time: string
}

interface Paginate<T> {
    page: number
    limit: number
    count: number
    data: T[]
}