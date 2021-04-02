from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
import joblib
import json
import pandas as pd
from django.core.files.storage import FileSystemStorage
model = joblib.load("modelPipeline.pkl")


def scoreJson(request):
    data = json.loads(request.body)
    dataF = pd.DataFrame({'x':data}).transpose()
    #print(dataF)
    score = model.predict_proba(dataF)[:,1][0]
    score = float(score)
    #print(score)

    return JsonResponse({'score':score})

def scoreFile(request):
    fileObj = request.FILES['filePath']
    fs = FileSystemStorage()
    filePathName = fs.save(fileObj.name, fileObj)
    filePathName1 = fs.url(filePathName)
    filePath = '.'+filePathName1

    data = pd.read_csv(filePath)
    score = model.predict_proba(data)[:,-1]

    score = {j:k for j,k in zip(data['Loan_ID'],score)}
    score = sorted(score.items(), key=lambda x:x[1], reverse=True)

    return JsonResponse({'score':score})