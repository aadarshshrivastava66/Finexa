from fastapi import FastAPI
from pydantic import BaseModel

import torch
import joblib
import numpy as np

from model import ANN
app = FastAPI()

model = ANN()

model.load_state_dict(
    torch.load(
        "loan_model.pth",
        map_location=torch.device("cpu")
    )
)

model.eval()
scaler = joblib.load("scaler.pkl")

class LoanData(BaseModel):

    salary: float
    age: int
    dependents: int
    creditScore: float
    appliedAmount: float
    employmentType: str

@app.get("/")
def home():

    return {
        "message": "Finexa Loan ML API is running"
    }

@app.post("/predict")
def predict(data: LoanData):

    employment_salaried = (
        1 if data.employmentType == "salaried" else 0
    )

    employment_self_employed = (
        1 if data.employmentType == "self-employed" else 0
    )

    employment_unemployed = (
        1 if data.employmentType == "Unemployed" else 0
    )

    features = np.array([[
        data.salary,
        data.age,
        data.dependents,
        data.creditScore,
        data.appliedAmount,
        employment_salaried,
        employment_self_employed,
        employment_unemployed
    ]])

    features = scaler.transform(features)


    features = torch.tensor(
        features,
        dtype=torch.float32
    )

    with torch.no_grad():

        prediction = model(features)


    probability = float(prediction.item())

    eligible = probability >= 0.5


    return {
        "eligible": eligible,
        "probability": probability
    }