from django.conf import settings
from django_mako_plus import view_function, jscontext
from datetime import datetime, timezone
from homepage import models as m
from django import forms
from django.http import  HttpResponse, HttpResponseRedirect
import urllib.request
import json
import ast
from django.core import serializers
from is415_project.settings import AZURE_API_URL
from is415_project.settings import AZURE_API_KEY

@view_function
def process_request(request):

    champs = m.Champions.objects.all()
    champs_json = serializers.serialize('json', champs)

    form = PredictForm()
    if request.method == 'POST':
        form = PredictForm(request.POST)
        if form.is_valid():
            champ1 = form.cleaned_data.get('Champion1')
            champ2 = form.cleaned_data.get('Champion2')
            champ3 = form.cleaned_data.get('Champion3')
            champ4 = form.cleaned_data.get('Champion4')
            champ5 = form.cleaned_data.get('Champion5')
            champ6 = form.cleaned_data.get('Champion6')
            champ7 = form.cleaned_data.get('Champion7')
            champ8 = form.cleaned_data.get('Champion8')
            champ9 = form.cleaned_data.get('Champion9')

            result = call_api(champ1, champ2, champ3, champ4, champ5, champ6, champ7, champ8, champ9)
            str_result = result.decode('ascii')

            js = json.loads(str_result)
            print(js)
            return HttpResponse(json.dumps(js))

    context = {
        'form': form,
        jscontext('champs'): champs_json,
    }
    return request.dmp_render('index.html', context)

class PredictForm(forms.Form):
    Champion1 = forms.ChoiceField(label='Team Member 1', choices=[], required=False, widget=forms.Select(attrs={ 'class' : "form-control" }))
    Champion2 = forms.ChoiceField(label='Team Member 2', choices=[], required=False, widget=forms.Select(attrs={ 'class' : "form-control" }))
    Champion3 = forms.ChoiceField(label='Team Member 3', choices=[], required=False, widget=forms.Select(attrs={ 'class' : "form-control" }))
    Champion4 = forms.ChoiceField(label='Team Member 4', choices=[], required=False, widget=forms.Select(attrs={ 'class' : "form-control" }))
    Champion5 = forms.ChoiceField(label='Opposing Team Member 1', choices=[], required=False, widget=forms.Select(attrs={ 'class' : "form-control" }))
    Champion6 = forms.ChoiceField(label='Opposing Team Member 2', choices=[], required=False, widget=forms.Select(attrs={ 'class' : "form-control" }))
    Champion7 = forms.ChoiceField(label='Opposing Team Member 3', choices=[], required=False, widget=forms.Select(attrs={ 'class' : "form-control" }))
    Champion8 = forms.ChoiceField(label='Opposing Team Member 4', choices=[], required=False, widget=forms.Select(attrs={ 'class' : "form-control" }))
    Champion9 = forms.ChoiceField(label='Opposing Team Member 5', choices=[], required=False, widget=forms.Select(attrs={ 'class' : "form-control" }))

    def __init__(self, *args, **kwargs):
        super(PredictForm, self).__init__(*args, **kwargs)
        self.fields['Champion1'].choices = [[0, 'N/A']] + [(x.pk, x.name) for x in m.Champions.objects.all().order_by('name')]
        self.fields['Champion2'].choices = [[0, 'N/A']] + [(x.pk, x.name) for x in m.Champions.objects.all().order_by('name')]
        self.fields['Champion3'].choices = [[0, 'N/A']] + [(x.pk, x.name) for x in m.Champions.objects.all().order_by('name')]
        self.fields['Champion4'].choices = [[0, 'N/A']] + [(x.pk, x.name) for x in m.Champions.objects.all().order_by('name')]
        self.fields['Champion5'].choices = [[0, 'N/A']] + [(x.pk, x.name) for x in m.Champions.objects.all().order_by('name')]
        self.fields['Champion6'].choices = [[0, 'N/A']] + [(x.pk, x.name) for x in m.Champions.objects.all().order_by('name')]
        self.fields['Champion7'].choices = [[0, 'N/A']] + [(x.pk, x.name) for x in m.Champions.objects.all().order_by('name')]
        self.fields['Champion8'].choices = [[0, 'N/A']] + [(x.pk, x.name) for x in m.Champions.objects.all().order_by('name')]
        self.fields['Champion9'].choices = [[0, 'N/A']] + [(x.pk, x.name) for x in m.Champions.objects.all().order_by('name')]

def call_api(champ1, champ2, champ3, champ4, champ5, champ6, champ7, champ8, champ9):

    inputs = "{ 'Inputs': { 'input1': ["
    if champ1 is not "0" or champ1 is not None:
        inputs = inputs + "{ 'gameID': '1', 'heroID': " + champ1 + ", 'win': '1', },"
    if champ2 is not "0" or champ2 is not None:
        inputs = inputs + "{ 'gameID': '1', 'heroID': " + champ2 + ", 'win': '1', },"
    if champ3 is not "0" or champ3 is not None:
        inputs = inputs + "{ 'gameID': '1', 'heroID': " + champ3 + ", 'win': '1', },"
    if champ4 is not "0" or champ4 is not None:
        inputs = inputs + "{ 'gameID': '1', 'heroID': " + champ4 + ", 'win': '1', },"
    if champ5 is not "0" or champ5 is not None:
        inputs = inputs + "{ 'gameID': '1', 'heroID': " + champ5 + ", 'win': '0', },"
    if champ6 is not "0" or champ6 is not None:
        inputs = inputs + "{ 'gameID': '1', 'heroID': " + champ6 + ", 'win': '0', },"
    if champ7 is not "0" or champ7 is not None:
        inputs = inputs + "{ 'gameID': '1', 'heroID': " + champ7 + ", 'win': '0', },"
    if champ8 is not "0" or champ8 is not None:
        inputs = inputs + "{ 'gameID': '1', 'heroID': " + champ8 + ", 'win': '0', },"
    if champ9 is not "0" or champ9 is not None:
        inputs = inputs + "{ 'gameID': '1', 'heroID': " + champ9 + ", 'win': '0', },"

    inputs = inputs + "], }, 'GlobalParameters':  { } }"

    data = ast.literal_eval(inputs)

    body = str.encode(json.dumps(data))

    url = AZURE_API_URL
    api_key = AZURE_API_KEY
    headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}

    req = urllib.request.Request(url, body, headers)

    try:
        response = urllib.request.urlopen(req)
        result = response.read()

    except urllib.error.HTTPError as error:
        print("The request failed with status code: " + str(error.code))
        print(error.info())
        print(json.loads(error.read().decode("utf8", 'ignore')))
        result = error.info()

    return result
