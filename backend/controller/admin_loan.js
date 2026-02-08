const LoanApplication = require("../Models/loanApplication");

module.exports.LoanApplications = async (req, res) => {
  try {
    const applications = await LoanApplication.find({ status: "pending" })
      .populate("user", "name email phone")
      .populate("loan")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.rejectLoanApplications = async (req, res) => {
  try {
    const applications = await LoanApplication.find({ status: "rejected" })
      .populate("user", "name ")
      .populate("loan")
      .sort({ createdAt: -1 });
    console.log(applications);
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.approveLoanApplications = async (req, res) => {
  console.log("request come");
  try {
    const applications = await LoanApplication.find({ status: "approved" })
      .populate("user", "name ")
      .populate("loan")
      .sort({ createdAt: -1 });
    console.log(applications);
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.ApplicationDetail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Application ID missing" });
    }

    const application = await LoanApplication.findById(id)
      .populate("user", "name email phone")
      .populate("loan");

    console.log(application);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminRemark } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await LoanApplication.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    application.adminRemark = adminRemark;
    application.reviewedBy = req.user._id;
    application.reviewedAt = new Date();

    await application.save();

    res.json({
      message: `Application ${status} successfully`,
      application,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.NewLoan = async (req, res) => {
  try {
    const newLoan = new loan(req.body);
    await newLoan.save();

    console.log(newLoan);
    res.json({ message: "New loan Saved Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving loan", error });
  }
};

module.exports.DeleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteloan = await loan.findByIdAndDelete(id);
    if (!deleteloan) {
      return res.json({ message: "Loan Not Found" });
    }
    res.json({ message: "Loan Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Some Server Error Come" });
  }
};
