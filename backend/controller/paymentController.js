const Razorpay = require('razorpay');
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.error("❌ Razorpay keys are missing in environment variables.");
}

const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET
});

const renderProductPage = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "Payment endpoint is working" });
    } catch (error) {
        console.error("❌ Error in renderProductPage:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// console.log("Using Razorpay ID:", process.env.RAZORPAY_KEY_ID);
// console.log("Using Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET);


const createOrder = async (req, res) => {
    try {
        const amount = req.body.amount * 100; 

        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'receipt_order_' + new Date().getTime()
        };

        razorpay.orders.create(options, (err, order) => {
            if (!err) {
                res.status(200).json({
                    success: true,
                    msg: 'Order Created',
                    order_id: order.id,
                    amount: amount,
                    key_id: RAZORPAY_KEY_ID,
                    product_name: req.body.name,
                    description: req.body.description,
                    contact: "8847453863",
                    name: "Kabir Saini",
                    email: "kabirrsaini7@gmail.com"
                });
            } else {
                console.error("❌ Razorpay order creation failed:", err);
                res.status(400).json({ success: false, msg: 'Something went wrong!', error: err });
            }
        });

    } catch (error) {
        console.error("❌ Error in createOrder:", error.message);
        res.status(500).json({ success: false, message: "Order creation failed", error });
    }
};

module.exports = {
    renderProductPage,
    createOrder
};
