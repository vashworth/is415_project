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

    ## TEAM 1 ##
    if champ1 is None or champ1 is "" or champ1 is "0":
        t1_champ2_name = "0"
    else:
        t1_champ2 = m.Champions.objects.get(id=champ1)
        t1_champ2_name = t1_champ2.name
    if champ2 is None or champ2 is "" or champ2 is "0":
        t1_champ3_name = "0"
    else:
        t1_champ3 = m.Champions.objects.get(id=champ2)
        t1_champ3_name = t1_champ3.name
    if champ3 is None or champ3 is "" or champ3 is "0":
        t1_champ4_name = "0"
    else:
        t1_champ4 = m.Champions.objects.get(id=champ3)
        t1_champ4_name = t1_champ4.name
    if champ4 is None or champ4 is "" or champ4 is "0":
        t1_champ5_name = "0"
    else:
        t1_champ5 = m.Champions.objects.get(id=champ4)
        t1_champ5_name = t1_champ5.name

    ## TEAM 2 ##
    if champ5 is None or champ5 is "" or champ5 is "0":
        t2_champ1_name = "0"
    else:
        t2_champ1 = m.Champions.objects.get(id=champ5)
        t2_champ1_name = t2_champ1.name
    if champ6 is None or champ6 is "" or champ6 is "0":
        t2_champ2_name = "0"
    else:
        t2_champ2 = m.Champions.objects.get(id=champ6)
        t2_champ2_name = t2_champ2.name
    if champ7 is None or champ7 is "" or champ7 is "0":
        t2_champ3_name = "0"
    else:
        t2_champ3 = m.Champions.objects.get(id=champ7)
        t2_champ3_name = t2_champ3.name
    if champ8 is None or champ8 is "" or champ8 is "0":
        t2_champ4_name = "0"
    else:
        t2_champ4 = m.Champions.objects.get(id=champ8)
        t2_champ4_name = t2_champ4.name
    if champ9 is None or champ9 is "" or champ9 is "0":
        t2_champ5_name = "0"
    else:
        t2_champ5 = m.Champions.objects.get(id=champ9)
        t2_champ5_name = t2_champ5.name


    inputs = "{ 'Inputs': { 'input1': ["

    inputs = inputs + "{ 'gameId': '1', 'seasonId': '1', 'winner': '1', 't1_champ1id': '0', 't1_champ2id': '" + t1_champ2_name + "', 't1_champ3id': '" + t1_champ3_name + "', 't1_champ4id': '" + t1_champ4_name + "', 't1_champ5id': '" + t1_champ5_name + "', 't2_champ1id': '" + t2_champ1_name + "', 't2_champ2id': '" + t2_champ2_name + "', 't2_champ3id': '" + t2_champ3_name + "', 't2_champ4id': '" + t2_champ4_name + "', 't2_champ5id': '" + t2_champ5_name + "', },"

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
