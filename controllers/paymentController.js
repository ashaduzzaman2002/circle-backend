const Razorpay = require('razorpay');
const crypto = require('crypto');

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRECT,
});

exports.checkout = async (req, res) => {
  const { amount } = req.body;
  var options = {
    amount: Number(amount) * 100,
    currency: 'INR',
    receipt: 'order_rcptid_11',
  };

  instance.orders.create(options, function (err, order) {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: 'An error occurred while creating the order' });
    }
    res.json({ success: true, order });
  });
};

exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_signature, razorpay_payment_id } =
    req.body;

  let body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_API_SECRECT)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if(isAuthentic) {
    const otp = Math.floor(Math.random() * 9000) + 1000;
    res.redirect(`http://localhost:3000/payment/success?paymentId=${razorpay_payment_id}&otp=${otp}`)
  }else {
    res.redirect(`http://localhost:3000/payment/failed?redirect=true`)
  }
};
