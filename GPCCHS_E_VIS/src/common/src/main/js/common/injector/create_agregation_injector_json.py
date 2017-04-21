#!/usr/share/isis/bin/python3.4
# -*- coding: UTF-8 -*-

import json
import sys
from collections import OrderedDict

#Recuperate the content of a file. Ex: Reporting_1.0.json
def read_file_json(path):
    with open(path) as file:
        contents = json.load(file)
    return contents
def parse_json(json):
    oidsParameters = []
    #To parse the second level of the dictionnary. The first level is just : Key/Catalog : Value/the rest of json
    for k,val in json["Catalog"].items():
        if k == 'Items':
            #The value of the "Items" key is a list of dictionnary. "val" : list
            #Parse each element of the list "val" and each key/value of each element of the list
            for i in range(len(val)):
                for cle,valeur in val[i].items():
                    #Recuperate the oid value in a list "oids", when the key is "Oid", and go to next element
                    if cle == 'Oid':
                        oidsParameters.append(valeur)
                        break
    return oidsParameters
#Ask at user the number of parameter that he want for each aggregation
#And create a dictionnary "parameters"
#If type of argument is bad, the program is stopped
def ask_user(nb_aggregation,oidsParameters):
    nbParameters = []
    i = 1
    while i < nbAggregation+1:
        print("Combien de paramètre pour l'agregation n°{} ?".format(i))
        try:
            parameter = int(input())
            if parameter > len(oidsParameters):
                raise ValueError ('Le nombre de paramètres max est : {}'.format(len(oidsParameters)))
            nbParameters.append(parameter)
            i = i + 1
        except TypeError:
            print ('La donnée doit être un entier')
            sys.exit()
    return sorted(nbParameters) 
#Split each oid recuperated like that : "area/service/version/number/domain/uid"
def split_elts_list(liste):
    area=[]
    service=[]
    version=[]
    number=[]
    domain=[]
    uid=[]
    for oid in liste:
        area.append(oid[0:4])
        service.append(oid[4:8])
        version.append(oid[8:10])
        number.append(oid[10:14])
        domain.append(oid[14:18])
        uid.append(oid[18:34])
    return area,service,version,number,domain,uid
#Function to build the JSON for the aggregationInjector.json
def build_json(nbAggregation,parameters,area,service,version,number,domain,uid):
    i = 0
    aggregationInjector = []
    while i < nbAggregation:   
        values = []
        #Create a list of dictionnary
        for j in range(int(parameters[i])):
            values.append({ 'extractedValue' : '1','rawValue' : j+10, 'convertedValue' : 1,'triggerCount' : 1,'monitoringState' : '1','validityState' : 2,'definition' : { 'objectType' : { 'area' : int(area[j],16),'service': int(service[j],16),'version' : int(version[j],16),'number' : int(number[j],16),    'objectKey' : { 'domaineId' : int(domain[j],16),'uid' : int (uid[j],16) }}}}) 
        aggregationInjector.append({'domaineId' : 1,'uid' : i+1,'generationMode' : 1,'filtered' : False,'deltaTime' : 1,'intervalTime' : 1,'setIntervalTime' : 1,'packetType' : 1,'apid' : 1 ,'service' : 1,'subService' : 1,'destinationId' : 1,'values' : values})
        i = i + 1
    aggregationInjectorJson = json.dumps(aggregationInjector,indent=4) #Convert the list in json format.
    return aggregationInjectorJson
def write_json_file(path,json):
    #Create the aggregationInjector.json with the oid recuperated with N aggregation
    with open(path, 'w') as file:
        file.write(json)

if __name__ == '__main__':
    #Recuperate the argument (nb_aggregation)
    #If no argument, nb_aggregation = 5 bu default
    #An exception is raise if type of argument is bad
    try:
        sys.argv[1]
        nbAggregation = int(sys.argv[1])
    except IndexError:
        print("""By default, the aggregationInjector.json is create with five aggregations
Indicate one argument to change the number of aggregation created""")
        nbAggregation = 5
    except TypeError:
        print ("The argument must be an integer")
        sys.exit()

    contentJson = read_file_json("/data/isis/documents/DATA_REF/CCC/SDB/ISIS/SupSup/Reporting/1.0/Reporting_1.0.json")
    listOidsParameters = parse_json(contentJson)
    listNbParameters = ask_user(nbAggregation,listOidsParameters)
    listArea,listService,listVersion,listNumber,listDomain,listUid = split_elts_list(listOidsParameters)
    aggregationInjectorJson = build_json(nbAggregation,listNbParameters,listArea,listService,listVersion,listNumber,listDomain,listUid)
    write_json_file("/data/isis/documents/SESSION/INTEGRATION/ESSAIS/GPVIMA-0101/CCC/CONF_COMPONENT/GPDSTD/aggregation_injector.json",aggregationInjectorJson)

    #Create the ParameterAggregations.json
    i = 0
    values = []
    parameterAggregations = []
    d = OrderedDict()
    listNbAggregation = list(range(nbAggregation))
    for i in range(len(listNbParameters)):
        #Create a list of dictionnary
        if i == 0:
            for j in range(int(listNbParameters[i])):
                values2 = []
                d = OrderedDict()
                for z in listNbAggregation:
                    values2.append({'oid' : '000200020100c70001'+str(z+1).zfill(16)})
                d['aggregations']= values2
                d['parameterOid'] = listOidsParameters[j]
                values.append(d)
                #values.append(OrderedDict({'aggregations' : values2, 'parameterOid' : listOidsParameters[j]}))
            del listNbAggregation[0]
        else:
            x = 0
            while x < (listNbParameters[i]-listNbParameters[i-1]):
                j = j + 1
                values2 = []
                d = OrderedDict()
                for z in listNbAggregation:
                    values2.append({'oid' : '000200020100c70001'+str(z+1).zfill(16)})
                d['aggregations']= values2
                d['parameterOid'] = listOidsParameters[j]
                values.append(d)
                #values.append(OrderedDict({'aggregations' : values2, 'parameterOid' : listOidsParameters[j]}))
                x = x + 1
            del listNbAggregation[0]
    parameterAggregationsJson = json.dumps({'parameterAggregations' : values}, indent=4)
    write_json_file("/data/isis/documents/SESSION/INTEGRATION/ESSAIS/GPVIMA-0101/CCC/CONF_COMPONENT/GPCCDC/ParameterAggregations.json",parameterAggregationsJson)