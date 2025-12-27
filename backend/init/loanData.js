const loanData = [
  {
    name: "Home Loan",
    image: "images/home.png",
    description: "A home loan helps you buy, build, or renovate a residential property with long repayment tenure and lower interest rates.",
    type: "secured",
    minAmount: 500000,
    maxAmount: 50000000,
    interestRate: "7.45% - 10.5%",
    tenure: 30,
    eligibilityRules: {
      minAge: 21,
      maxAge: 65,
      minIncome: 25000,
      employmentType: ["salaried", "self-employed"],
      creditScore: 700
    },
    documentsRequired: ["Aadhaar", "PAN", "Income Proof", "Property Papers"],
    isActive: true
  },

  {
    name: "Loan Against Property",
    image: "images/loanAP.png",
    description: "A loan against property allows you to borrow money by keeping your residential or commercial property as collateral.",
    type: "secured",
    minAmount: 500000,
    maxAmount: 20000000,
    interestRate: "9% - 13%",
    tenure: 20,
    eligibilityRules: {
      minAge: 25,
      maxAge: 65,
      minIncome: 40000,
      employmentType: ["self-employed", "business"],
      creditScore: 680
    },
    documentsRequired: ["Property Papers", "Income Proof", "KYC"],
    isActive: true
  },

  {
    name: "Personal Loan",
    image: "images/personalLoan.png",
    description: "A personal loan is an unsecured loan used for personal needs like medical expenses, travel, or emergencies.",
    type: "unsecured",
    minAmount: 50000,
    maxAmount: 2000000,
    interestRate: "10.5% - 24%",
    tenure: 5,
    eligibilityRules: {
      minAge: 21,
      maxAge: 60,
      minIncome: 20000,
      employmentType: ["salaried", "self-employed"],
      creditScore: 650
    },
    documentsRequired: ["Aadhaar", "PAN", "Bank Statement"],
    isActive: true
  },

  {
    name: "Car Loan",
    image: "images/carLoan.png",
    description: "A car loan helps you purchase a new or used vehicle with flexible repayment options.",
    type: "secured",
    minAmount: 100000,
    maxAmount: 2000000,
    interestRate: "8% - 11%",
    tenure: 7,
    eligibilityRules: {
      minAge: 21,
      maxAge: 65,
      minIncome: 25000,
      employmentType: ["salaried", "self-employed"],
      creditScore: 700
    },
    documentsRequired: ["Income Proof", "Vehicle Quotation", "KYC"],
    isActive: true
  },

  {
    name: "Two Wheeler Loan",
    image: "images/bikeLoan.png",
    description: "A two-wheeler loan helps you finance bikes or scooters with minimal documentation and quick approval.",
    type: "secured",
    minAmount: 30000,
    maxAmount: 200000,
    interestRate: "9% - 15%",
    tenure: 4,
    eligibilityRules: {
      minAge: 18,
      maxAge: 60,
      minIncome: 12000,
      employmentType: ["any"],
      creditScore: 600
    },
    documentsRequired: ["Aadhaar", "PAN"],
    isActive: true
  },

  {
    name: "Education Loan",
    image: "images/educationLoan.png",
    description: "An education loan supports students in financing higher studies in India or abroad.",
    type: "secured",
    minAmount: 100000,
    maxAmount: 5000000,
    interestRate: "8% - 12%",
    tenure: 15,
    eligibilityRules: {
      minAge: 18,
      maxAge: 35,
      minIncome: 0,
      employmentType: ["student"],
      creditScore: 0
    },
    documentsRequired: ["Admission Letter", "Co-applicant KYC"],
    isActive: true
  },

  {
    name: "Business Loan",
    image: "images/businessLoan.png",
    description: "A business loan provides funds to expand, manage, or start a business without collateral.",
    type: "unsecured",
    minAmount: 100000,
    maxAmount: 10000000,
    interestRate: "12% - 22%",
    tenure: 5,
    eligibilityRules: {
      minAge: 25,
      maxAge: 65,
      minIncome: 50000,
      employmentType: ["business"],
      creditScore: 680
    },
    documentsRequired: ["GST", "ITR", "Bank Statements"],
    isActive: true
  },

  {
    name: "Gold Loan",
    image: "images/goldLoan.png",
    description: "A gold loan allows you to borrow money by pledging your gold ornaments as security.",
    type: "secured",
    minAmount: 25000,
    maxAmount: 5000000,
    interestRate: "7.5% - 12%",
    tenure: 3,
    eligibilityRules: {
      minAge: 18,
      maxAge: 70,
      minIncome: 0,
      employmentType: ["any"],
      creditScore: 0
    },
    documentsRequired: ["Gold Ownership Proof", "KYC"],
    isActive: true
  },

  {
    name: "Loan Against FD",
    image: "images/fdLoan.png",
    description: "A loan against FD lets you borrow money by keeping your fixed deposit as collateral.",
    type: "secured",
    minAmount: 10000,
    maxAmount: 10000000,
    interestRate: "FD Rate + 1%",
    tenure: 10,
    eligibilityRules: {
      minAge: 18,
      maxAge: 75,
      minIncome: 0,
      employmentType: ["any"],
      creditScore: 0
    },
    documentsRequired: ["FD Receipt", "KYC"],
    isActive: true
  },

  {
    name: "Agriculture Loan",
    image: "images/AgLoan.png",
    description: "An agriculture loan helps farmers meet crop production, equipment, and farming expenses.",
    type: "secured",
    minAmount: 50000,
    maxAmount: 5000000,
    interestRate: "4% - 7%",
    tenure: 5,
    eligibilityRules: {
      minAge: 18,
      maxAge: 65,
      minIncome: 0,
      employmentType: ["farmer"],
      creditScore: 0
    },
    documentsRequired: ["Land Records", "KCC Card"],
    isActive: true
  },

  {
    name: "Credit Card Loan",
    image: "images/creditCardLoan.png",
    description: "A credit card loan allows you to convert your credit card limit into a short-term loan.",
    type: "unsecured",
    minAmount: 10000,
    maxAmount: 500000,
    interestRate: "14% - 24%",
    tenure: 3,
    eligibilityRules: {
      minAge: 21,
      maxAge: 60,
      minIncome: 20000,
      employmentType: ["salaried"],
      creditScore: 700
    },
    documentsRequired: ["Credit Card Statement", "KYC"],
    isActive: true
  }
];

module.exports = loanData;
