export const createPayment = async (req, res) => {
  try {

    const paymentData = {
      bookingId: req.body.bookingId,
      amount: req.body.amount,
      status: "pending"
    };

    res.json({
      message: "Payment created",
      payment: paymentData
    });

  } catch (error) {
    res.status(500).json(error);
  }
};


export const verifyPayment = async (req, res) => {
  try {

    const { paymentId } = req.body;

    res.json({
      message: "Payment verified",
      paymentId
    });

  } catch (error) {
    res.status(500).json(error);
  }
};