# -*- coding: latin-1 -*-
'''
This code has been created to run on Python 2.6.6
http://www.python.org/download/releases/2.6.6/
'''
import sys                          #Required to retrieve the arguments given to the script
from copy import deepcopy           #Required to copy a object with all the objects it reference
import json                         #Required to read json file
import math                         #Required to compute mathematical functions
from os.path import isfile          #Required to check if file exists
from os.path import expanduser      #Required to resolve user path "~/" into actual path
from os import remove               #Required to delete a file
from struct import pack             #Required for number to raw value conversion
from struct import unpack           #Required for number to raw value conversion
import argparse                     #Required for script arguments management
from collections import OrderedDict # Required for parameter aggregation file generation

class GPDSTD_ScriptError(Exception):
    """
    Class for error in the parameters provided to this script
    """
    def __init__(self, msg):    
        print "ERROR : " + msg
        sys.exit(1)
        pass

# Creation of an argument parser manage the arguments given to this script
GPDSTD_ArgsParser = argparse.ArgumentParser(formatter_class=argparse.RawDescriptionHelpFormatter,description='''\
Generate injected data files for GPDSTD_P_INJ aggregation injector

Usage example in command line:

python gpdstd_injected_data_gen.py -n 10 -w -o ~/aggregation_injector.json -c "/data/isis/documents/DATA_REF/CCC/SDB/ISIS/SupSup/Reporting/1.0/Reporting_1.0.json" -t "/data/isis/documents/DATA_REF/CCC/SDB/ISIS/SupSup/TelemetryPacket/1.0/TelemetryPacket_1.0.json" -g ~/TelemetryPacket_1.0.json -p ~/ParameterAggregations.json -b ~/ParameterAggregation_1.0.json 2 2 1 90 -d 1 -a 100 -a 52 -a 20 -a 10 -a 5 -a 5 -a 5 -a 3 -a 3 -a 1 -f "str(100+int(math.sin(4*t/3.1415926535)*100))" 10 -f "str(t)" 90 -f "str(100+int(math.sin(4*(t+(3.1415926535/2))/3.1415926535)*100))" 10 -f "str(t)" 42 -f "str(10*t)" 10 -f "str(t)" 10 -f "str(2*t)" 10 -f "str(t+10)" 15 -f "str(t+50)" 10 -s "(t%4)" 9999 -v

Script for python 2.x, check python version with python --version or use \python to prevent aliasing of python command''')
requiredArgs = GPDSTD_ArgsParser.add_argument_group('required arguments')
requiredArgs.add_argument("--output","-o",required=True,type=str,
                              help="Full path of the output json file containing injected data")
requiredArgs.add_argument("--catalog","-c",required=True,type=str,
                              help="Full path of the reporting parameters catalog json file")
requiredArgs.add_argument("--tmpacket","-t",required=True,type=str,
                              help="Full path of the telemetry packet json file")
GPDSTD_ArgsParser.add_argument("--overwrite","-w",default=False,action='store_true',
                              help="Overwrite existing output files if they exist")
GPDSTD_ArgsParser.add_argument("--verbose","-v",default=False,action='store_true',
                              help="Display each generated parameter with the formula for its value during the generation of the injection data file")
GPDSTD_ArgsParser.add_argument("--niter","-n",default=1,type=int,
                              help="Number of times all the aggregations shall appear in the output json file containing injected data (default=1)")
GPDSTD_ArgsParser.add_argument("--domain","-d",default=1,type=int,
                              help="Default domain to use if it is not found in catalog or telemetry packet files (default=1)")
GPDSTD_ArgsParser.add_argument("--agg","-a",action='append',type=int,
                              help="Number of parameters of an aggregation to generate, use this option as many times as different aggregations shall be generated. If not used, all the aggregations of tmpacket file will be used")
GPDSTD_ArgsParser.add_argument("--generate","-g",default=None,type=str,
                              help="Full path of the telemetry packet file to generate as replacement to the given one. This file will be generated only if the one of --tmpacket option doesn't fit with the aggregations specified by the --agg options")
GPDSTD_ArgsParser.add_argument("--dcparamagg","-p",default=None,type=str,
                              help="Full path of the parameter aggregation file to generate for GPCCDC configuration. File not generated is option not present.")
GPDSTD_ArgsParser.add_argument("--sdbparamagg","-b",default=None,type=str,
                              help="Full path of the parameter aggregation file to generate for SDB configuration. This file is not generated if this option is not present.")
GPDSTD_ArgsParser.add_argument("--valueformula","-f",default=None,nargs=2,action='append',
                              help="Define a formula to compute parameter value, and the numbers of parameters for which it shall be used. The number of times a forumla is used is computed accroding to the content of tmpacket file content or --agg options values if used")
GPDSTD_ArgsParser.add_argument("--stateformula","-s",default=None,nargs=2,action='append',
                              help="Define a formula to compute parameter monitoringState, and the numbers of parameters for which it shall be used. The number of times a forumla is used is computed accroding to the content of tmpacket file content or --agg options values if used.")

# Create a global variable with the number of iteration (number of times the whole set of aggregations is written in the output file)
GPDSTD_NbIterations = 1


def uidToOid(uid):
    '''
    Convert val into hexadecimal with padding to 64bits
    val shall be an integer
    '''
    oid = hex((uid + (1 << 64)) % (1 << 64)) # Conversion to signed 64bits hexadecimal value (negative values management)
    if oid[0:2] == "0x": # Remove leading "0x" due to hexadecimal conversion
        oid = oid[2:]
    if oid[-1:] not in "0123456789abcdef": # Remove trailing "L" due to automatic conversion to long type
        oid = oid[:-1]
    while len(oid)<16: # Padding with 0 up to 64 bits
        oid = "0" + oid
    return oid
    
def oidToUid(oid):
    '''
    Convert val into decimal providing that val is a signed hexadecimal value coded on 64bits
    val shall be an integer
    '''
    uid = int(oid,16) # Conversion to integer value from hexadecimal
    if uid > 0x8000000000000000: # Manage negative values for signed 64bits data type
        uid -= 0x10000000000000000
    return uid

def toNatualNumberNotation(num):
    '''
    Convert a long or float number into a string with natual notation:
    ex : 1.0000000000000003e+128 wourld return 100000000000000026756709529735062665617767955333489749609882350892732973358369159258310443848648172397448790271910467870279073792
         1000000000000000000000000L would return 999999999999999983222784
         The numbers are not exactly the same due to computation artefact of python
    '''
    ret_val = '{0:.73f}'.format(num)
    # Remove all trailing "0"
    while ret_val[-1:] == "0":
        ret_val = ret_val[:-1]
    # If the last character on the right after trailing "0" removal is decimal ".", remove it also        
    if ret_val[-1:] == ".":
        ret_val = ret_val[:-1]
    # Return the converted number in string format
    return ret_val

def resolveValue(formula, t):
    '''
    Resolve a value from a formula which car represent a number of a function of 't' variable
    Manage numerical (int, float, long) or string datatypes as input
    Return value is always a string with a flag telling if it represent a numerical value or not
    '''
    ret_val = None
    isNumerical = False
    typeFound = False
    # By default, computed value is the input formula
    computedValue = formula
    
    # If formula is a string, try to evaluate it
    if isinstance(formula,str):
        # Try to evaluate the formula (not always possible depending on the content)
        try:
            # If the string evaluation succeed, put the evaluation result in the output stream
            computedValue = eval(formula)
        except Exception,e:
            # If the string evaluation fails, computedValue stay the same as formua (init value)
            # Is is not possible to use an exception name because the potential exception upon formula evaluation depends on formula content (as it may include a function call)
            pass
        # Manage the result of the evaluation, depending on its type
        if isinstance(computedValue,str):
            # If evaluated paramValue is not numerical ("e" and "+" are for exponential and "L" for long notation)
            if False in [computedValue[i] in "0123456789.-+eL" for i in range(len(computedValue))]:
                # If string represent a non numerical value, use it as it is
                ret_val  = computedValue
                typeFound = True
            else:
                # If the evaluated paramValue is a string that seems to represent a number, try to convert it
                isConversionToNumOk = False
                try:
                    # Into long (fixed point)
                    computedValueNumVal = long(computedValue)
                    isConversionToNumOk = True
                except ValueError:
                    # Conversion failed, leave isConversionToNumOk = False
                    pass
                if not isConversionToNumOk == True:
                    try:
                        # Into float (floating point)
                        computedValueNumVal = float(computedValue)
                        isConversionToNumOk = True
                    except ValueError:
                        # Conversion failed, leave isConversionToNumOk = False
                        pass
                if isConversionToNumOk == True:
                    # If a conversion to number succeeded, convert back to natual representation
                    ret_val  = toNatualNumberNotation(computedValueNumVal)
                    isNumerical = True
                    typeFound = True
                else:
                    # If all conversion to a number fails, use the string as it is
                    ret_val  = computedValue
                    typeFound = True
    # Further processing in case string processing is not sufficient
    if typeFound == False:
        # If the type of the formula is not yet found, try to process it as a numerical type
        try:
            # In case the evaluated paramValue is not a string, convert it to avoid exponential ('1.0e+128') or long (e.g. 1000000L) notations 
            ret_val  = toNatualNumberNotation(computedValue)
            # Set the computed value as numerical (here because this mean that no exception occurred)
            isNumerical = True
            typeFound = True
        except ValueError:
            # In case paramValue is not a numerical type (int, float, long...), use it as a string with quotes (added by repr() function)
            ret_val  = repr(computedValue)
            pass
    # return result
    return ret_val, isNumerical
    

class GPDSTD_ReportingParameterValue(object):
    '''
    Class representing the computed value of a parameter from Reporting catalog with all the necessary information for injected data generation
    '''
    def __init__(self, paramType, formula, datatype=None, rawValueDatatype=None, paramName=None):
        '''
        Initialize the parameter properties
        '''
        self._paramType = paramType               # String representing the field of the Reporting parameter value : convertedValue, extractedValue or rawValue
        self._formula = formula                   # str, int, float or bool representing the value of the parameter. It may be a formula using a variable named "t".
        self._datatype = datatype                 # String representing the "DataType" of the parameter from the Reporting catalog, only relevant for convertedValue type
                                                  # Possible datatype : "AbsoluteTime",  "Enumerated", "Integer", "LongInteger", "LongReal", "LongUnsignedInteger", "OctetString", "Real", "Record", "RelativeTime", "String", "UnsignedInteger"
        self._rawValueDatatype = rawValueDatatype # String representing the "RawValueDataType" of the parameter from the Reporting catalog, only relevant for rawValue type
                                                  # Possible rawValueDatatype are : "Absolutetime", "Bitstring", "Boolean", "Characterstring", "Deduced", "Octetstring", "PacketData", "Real", "Relativetime", "Signedinteger", "TCpacket", "Unsignedinteger"
        self._name = paramName                    # For debug trace purpose
    
    def getValue(self,t=0):
        '''
        Return the value of the parameter according to its type and potential computation using "t"
        '''
        ret_val = None
        # Compute parameter value
        computedVal, isNumerical = resolveValue(self._formula, t)
        # Manage parameter type
        if self._paramType == "convertedValue":
            # If datatype is numerical
            if self._datatype  in ["AbsoluteTime",  "Enumerated", "Integer", "LongInteger", "LongReal", "LongUnsignedInteger", "Real", "RelativeTime", "UnsignedInteger"]:
                if not isNumerical:
                    print "WARNING: Generated value for " + self._name + " parameter is not numerical when its type in Reporting catalog is " + self._datatype 
            # else : No problem to generate a numerical value in a non numerical type
            # Add quotes if the type is not numerical
            if isNumerical:
                ret_val = computedVal
            else:
                ret_val = str('"' + computedVal + '"')
        elif self._paramType == "extractedValue":
            # extractedValue always coded as a string, add quotes any times
            ret_val = str('"' + computedVal + '"')
        elif self._paramType == "rawValue":
            # If datatype is numerical
            if self._rawValueDatatype  in ["Absolutetime", "Real", "Relativetime", "Signedinteger", "Unsignedinteger"]:
                if not isNumerical:
                    print "WARNING: Generated value for " + self._name + " parameter is not numerical when its type in Reporting catalog is " + self._datatype
            # else : No problem to generate a numerical value in a non numerical type
            # Add quotes if the type is not numerical
            if isNumerical:
                ret_val = computedVal
            else:
                ret_val = str('"' + computedVal + '"')
        # return computed parameter value
        return ret_val
    
    def getCCDDS_mal_type(self):
        '''
        Return the ccsds_mal.type_pb2 depending on datatype used at object creation 
        '''
        # Default type is BLOB
        retType = 'BLOB'
        if self._paramType == "extractedValue":
            # Extracted value is always a BLOD
            retType = 'BLOB'
        elif self._paramType == "rawValue":
            if self._rawValueDatatype in ["Absolutetime","Relativetime"]:
                reType = 'TIME'
            elif self._rawValueDatatype == "Real":
                retType = 'FLOAT'
            elif self._rawValueDatatype == "Signedinteger":
                retType = 'INTEGER'
            elif self._rawValueDatatype == "Unsignedinteger":
                retType = 'UINTEGER'
            elif self._rawValueDatatype in ["Bitstring","Octetstring", "Deduced",  "PacketData",  "TCpacket"]:
                retType = 'BLOB'
            elif self._rawValueDatatype == "Boolean":
                retType = 'BOOLEAN'
            elif self._RawValueDataType in ["Characterstring"]:
                retType = 'STRING'
        elif self._paramType == "convertedValue":
            if self._datatype in ["Absolutetime","Relativetime"]:
                reType = 'TIME'
            elif self._datatype == "Real":
                retType = 'FLOAT'
            elif self._datatype == "LongReal":
                retType = 'DOUBLE'
            elif self._datatype == "Integer":
                retType = 'INTEGER'
            elif self._datatype == "LongInteger":
                retType = 'LONG'
            elif self._datatype == "LongUnsignedInteger":
                retType = 'ULONG'
            elif self._datatype in ["Unsignedinteger","Enumerated"]:
                retType = 'UINTEGER'
            elif self._datatype in ["Octetstring","Record"]:
                retType = 'BLOB'
            elif self._datatype in ["String"]:
                retType = 'STRING'
        # Return type
        return retType
 
class GPDSTD_AggregationsGenerator(object):
    '''
    Generator of aggragation structure data by using catalogs files
    '''
    def __init__(self, defaultDomain, Overwrite=False):
        '''
        Initialize and configure the generator
        '''
        self._defaultDomain = defaultDomain
        self._reportingParameters = dict()                # Dictionnary of parameters oid with their names as key
        self._aggregations = OrderedDict()                # Dictionnary of aggregation oid and parameters names with aggregation names as key
        self._tmPacketJson = None                         # Content of the tm packet json file
        self._overwriteFiles = Overwrite
        self._nbParamPerAggInExistingFile = dict()        # Dictionnary of number of parameters by aggregation with aggregation names as key
        self._aggUidInExistingFile = dict()               # Dictionnary of aggregation uid with aggregation names as key
        self._existingTmPacketJsonFile = None             # Path of tm packet json file
        self._reportingParamsCatalogJsonFile = None       # Path of the reporting parameter catalog
        self._namesOfParamsInExistingTmPacketFile = []    # List of the names of the parameters in all aggregations
        self._aggsOidListByParamOid = dict()              # Dictionnary of the list of the aggregations oid for each parameter with parameter oid as key
        self._injectionData = dict()                      # Dictionnary of the list of parameters in each aggregation and aggregation uid with aggregation name as key
        self._asvnReportingCatalog = OrderedDict()        # Area, service, version and number of the read Reporting Catalog
        self._reportingParamsDatatype = dict()            # Dictionnary of "Datatype" field from Reporting catalog with parameter Oid as key
        self._reportingParamsRawValueDatatype = dict()    # Dictionnary of "RawValueDataType" field from Reporting catalog with parameter Oid as key

    def getParametersFromReportingCatalogFile(self,filePath):
        '''
        Read a reporting catalog json file and get all the parameters defined in it with their names and Oid in a dictionnary like this:
        {'STAT_SU_CSTIME': '000200020100c400010000000000000017','STAT_SU_SIGCATCH': '000200020100c400010000000000000034','STAT_SU_SIGIGNORE_2': '000200020100c400010000000000000137'}
        '''
        area = None
        service = None
        version = None
        number = None
        name = None
        domain = None
        uid = None
        # Read catalog file
        self._reportingParamsCatalogJsonFile = filePath
        try:
            Inputfile = open(self._reportingParamsCatalogJsonFile,'r')
        except IOError as e:
            raise GPDSTD_ScriptError("Cannot open reporting catalog file : {0}, message is : {1}".format(self._reportingParamsCatalogJsonFile,e.strerror))
        catalog = json.load(Inputfile)
        Inputfile.close() 
        # Analyse its content to retrieve relevant information       
        if "Catalog" in catalog and "ObjectType" in catalog["Catalog"]:
            area = int(catalog["Catalog"]["ObjectType"]["Area"])
            service = int(catalog["Catalog"]["ObjectType"]["Service"])
            version = int(catalog["Catalog"]["ObjectType"]["Version"])
            number = int(catalog["Catalog"]["ObjectType"]["Number"])
            # Save these infos about the Reporting Catalog for ParameterAggregation file generation for SDB
            self._asvnReportingCatalog["Area"] = catalog["Catalog"]["ObjectType"]["Area"]
            self._asvnReportingCatalog["Service"] = catalog["Catalog"]["ObjectType"]["Service"]
            self._asvnReportingCatalog["Version"] = catalog["Catalog"]["ObjectType"]["Version"]
            self._asvnReportingCatalog["Number"] = catalog["Catalog"]["ObjectType"]["Number"]
            if 'Items' in catalog["Catalog"]:
                #print '"Items" found in catalog'
                items = catalog["Catalog"]["Items"]
                for parameter in items:
                    if "Uid" in parameter:
                        uid = int(parameter["Uid"])
                        name = parameter["Name"]
                        #print 'Uid of current parameter is : ' + repr(uid) + " and value in dict is: " + repr(parameter["Uid"])
                        if "IsisCommon" in parameter and "ts180.isisCommonRecord" in parameter["IsisCommon"] and "Domain" in parameter["IsisCommon"]["ts180.isisCommonRecord"]:
                            #print '"IsisCommon" found in parameter and "Domain" found in "IsisCommon"'
                            domain = parameter["IsisCommon"]["ts180.isisCommonRecord"]["Domain"]
                            if not domain:
                                domain = int(self._defaultDomain)
                            else:
                                domain = int(domain)
                            oid = '{0:04x}'.format(area) + '{0:04x}'.format(service) + '{0:02x}'.format(version) + '{0:04x}'.format(number) + \
                                                              '{0:04x}'.format(domain) + uidToOid(uid)
                            self._reportingParameters[name] = oid
                            #print "Parameter : name : " + repr(name) + " area : " + repr(area) + ", service : " + repr(service) + ", version : " + repr(version) + ", number: " + repr(number) + ", domain : " + repr(domain) + ", uid : " + repr(uid) +  " Oid : " + repr(self._reportingParameters[name])
                            if "Datatype" in parameter and "ts180.simpleEngineeringDataTypeEnumOrRecord" in parameter["Datatype"]:
                                self._reportingParamsDatatype[oid] = parameter["Datatype"]["ts180.simpleEngineeringDataTypeEnumOrRecord"]
                            if "TelemetryParameter" in parameter and parameter["TelemetryParameter"] and "ts180.telemetryParameterRecord" in parameter["TelemetryParameter"] and "RawValueDataType" in parameter["TelemetryParameter"]["ts180.telemetryParameterRecord"] and "ts180.rawDataTypeEnum" in parameter["TelemetryParameter"]["ts180.telemetryParameterRecord"]["RawValueDataType"]:
                                self._reportingParamsRawValueDatatype[oid] = parameter["TelemetryParameter"]["ts180.telemetryParameterRecord"]["RawValueDataType"]["ts180.rawDataTypeEnum"]
            else:
                raise GPDSTD_ScriptError('Catalog file (' + self._reportingParamsCatalogJsonFile + ') doesn\'t contain expected element "Items"')
        else:
            raise GPDSTD_ScriptError('Catalog file (' + self._reportingParamsCatalogJsonFile + ') doesn\'t contain expected elements "Catalog" and "ObjectType"')
        return self._reportingParameters

    def getAggregationsFromTelemetryPacketFile(self,filePath):
        '''
        Read a telemetry packet json file and get all the its aggregations and parameters names in a dictionnary like this:
        {
         'STAT_SU_STATFILE': {'oid': '000200020100c700010000000000000001', 'parameters': ['STAT_SU_PID', 'STAT_SU_COMM', 'STAT_SU_STATE']},
         'TEST_STAB_VIMA_PACKET_1': {'oid': '000200020100c700010000000000000002', 'parameters': ['STAT_SU_PID_1', 'STAT_SU_COMM_1']},
         'TEST_STAB_VIMA_PACKET_3': {'oid': '000200020100c700010000000000000003', 'parameters': ['STAT_SU_STARTCODE_1', 'STAT_SU_ENDCODE_1', 'STAT_SU_STARTSTACK_1]}
        }
        '''
        area = None
        service = None
        version = None
        number = None
        name = None
        domain = None
        uid = None
        # Read telemetry packet file
        self._existingTmPacketJsonFile = filePath
        try:
            Inputfile = open(self._existingTmPacketJsonFile,'r')
        except IOError as e:
            raise GPDSTD_ScriptError("Cannot open telemetry packet file : {0}, message is : {1}".format(self._existingTmPacketJsonFile,e.strerror))
        # Read the Telemetry packet json file and put it in an ordered dictionnary (essential to let avro accepte the file)
        self._tmPacketJson = json.load(Inputfile,object_pairs_hook=OrderedDict)
        Inputfile.close()
        # Analyse its content to retrieve relevant information
        if "Catalog" in self._tmPacketJson:
            if "ObjectType" in self._tmPacketJson["Catalog"]:
                area = int(self._tmPacketJson["Catalog"]["ObjectType"]["Area"])
                service = int(self._tmPacketJson["Catalog"]["ObjectType"]["Service"])
                version = int(self._tmPacketJson["Catalog"]["ObjectType"]["Version"])
                number = int(self._tmPacketJson["Catalog"]["ObjectType"]["Number"])
            if 'Items' in self._tmPacketJson["Catalog"]:
                items = self._tmPacketJson["Catalog"]["Items"]
                for aggregation in items:
                    if "Uid" in aggregation:
                        uid = int(aggregation["Uid"])
                        name = aggregation["Name"]
                        #print 'Uid of current aggregation is : ' + repr(uid)
                        if "IsisCommon" in aggregation and "ts180.isisCommonRecord" in aggregation["IsisCommon"] and "Domain" in aggregation["IsisCommon"]["ts180.isisCommonRecord"]:
                            domain = aggregation["IsisCommon"]["ts180.isisCommonRecord"]["Domain"]
                            if not domain:
                                domain = int(self._defaultDomain)
                            else:
                                domain = int(domain)
                        # Compute aggregation Oid
                        oid = '{0:04x}'.format(area) + '{0:04x}'.format(service) + '{0:02x}'.format(version) + '{0:04x}'.format(number) + \
                              '{0:04x}'.format(domain) + uidToOid(uid)
                        # Analyse the list of parameters in the aggregation                                
                        if "Components" in aggregation:
                            parameters =  aggregation["Components"]
                            paramsList = []
                            # Initialize the flag to decide if the aggregation shall be ignored
                            isAggSupported = True
                            # Robustness in case there is no parameter
                            if not len(parameters):
                                isAggSupported = False
                            for parameter in parameters:
                                #print "Parameters: " + repr(parameter)
                                if "TelemetryPacketEntry" in parameter and \
                                   "ts180.referenceRecord" in parameter["TelemetryPacketEntry"] and \
                                   "TargetItem" in parameter["TelemetryPacketEntry"]["ts180.referenceRecord"] and \
                                   "string" in parameter["TelemetryPacketEntry"]["ts180.referenceRecord"]["TargetItem"]:
                                    paramName = parameter["TelemetryPacketEntry"]["ts180.referenceRecord"]["TargetItem"]["string"]
                                    # Update the list of existing parameters in aggregations (doesn't depends on isAggSupported value)
                                    if paramName not in self._namesOfParamsInExistingTmPacketFile:
                                        self._namesOfParamsInExistingTmPacketFile.append(paramName)
                                    # Update the dictionnary of parameters Oid and Oids of aggregations in which they are
                                    if self._reportingParameters and paramName in self._reportingParameters:
                                        if self._reportingParameters[paramName] not in self._aggsOidListByParamOid:
                                            self._aggsOidListByParamOid[self._reportingParameters[paramName]] = []
                                        if oid not in self._aggsOidListByParamOid[self._reportingParameters[paramName]]:
                                            self._aggsOidListByParamOid[self._reportingParameters[paramName]].append(oid)
                                        # Append the parameter as a member of this aggregation
                                        paramsList.append(paramName)
                                    else:
                                        # If this aggregation contains a parameter which is not in Reporting catalog, this means that it may comes from TelemetryStructureContainer, but
                                        # this kind of structure composed of a group of Reporting parameters is not supported by this script
                                        isAggSupported = False
                                    #print "Parameter : name : " + repr(parameter["TelemetryPacketEntry"]["ts180.referenceRecord"]["TargetItem"]["string"]) + " in aggregation : " + repr(name)
                                else:
                                    # Robustness in case aggregation structure is not supported
                                    isAggSupported = False
                            # Save the data related to the aggregation in case all its parameters exists in Reporting catalog
                            if isAggSupported == True:
                                self._aggregations[name] = { "oid" : oid, "parameters" : paramsList }
                                self._aggUidInExistingFile[name] = uid
            else:
                raise GPDSTD_ScriptError('Telemetry packet file (' + self._existingTmPacketJsonFile + ') doesn\'t contain expected element "Items"')
        else:
            raise GPDSTD_ScriptError('Telemetry packet file (' + self._existingTmPacketJsonFile + ') doesn\'t contain expected element "Catalog"')
        # Build analysis data for later telemetry packet file generation
        for agg in self._aggregations:
            if 'parameters' in self._aggregations[agg]:
                self._nbParamPerAggInExistingFile[agg] = len(self._aggregations[agg]['parameters'])
        # Update the injected data
        if len(self._reportingParameters):
            for aggName in self._aggregations.keys():
                paramsOid = []
                for paramName in self._aggregations[aggName]['parameters']:
                    # paramName is for sure in self._reportingParameters because this has been tested prior to insertion in self._aggregations
                    paramsOid.append(self._reportingParameters[paramName])
                self._injectionData[aggName] = {'uid' : self._aggUidInExistingFile[aggName], 'paramsOids' : paramsOid }
        #print "nbParamPerAggInExistingFile : " +  repr(self._nbParamPerAggInExistingFile)
        return self._aggregations

    def getAggregationsDetails(self):
        '''
        Return a list with the number of parameters in each aggregations found in the read telemetry packet json file
        '''
        return self._nbParamPerAggInExistingFile.values()

    def getParametersDetails(self):
        '''
        Return the number of parameters found in the read reporting catalog json file
        '''
        return len(self._reportingParameters)
        
    def getAggsOidsByParamOid(self):
        '''
        Return an oid dictionnary with the lists of oid of all aggregations in which each parameter appear
        '''
        return self._aggsOidListByParamOid
    
    def getConvertedValueDatatypeByParamOid(self, oid):
        '''
        Return the datatype of the converted value of a parameter with given oid
        '''
        ret_val = None
        if oid in self._reportingParamsDatatype.keys():
            ret_val = self._reportingParamsDatatype[oid]
        return ret_val
    
    def getRawValueDatatypeByParamOid(self, oid):
        '''
        Return the datatype of the raw value value of a parameter with given oid
        '''
        ret_val = None
        if oid in self._reportingParamsRawValueDatatype.keys():
            ret_val = self._reportingParamsRawValueDatatype[oid]
        return ret_val
    
    def generateTelemetryPacketFile(self,filePath,nbParamsPerAgg):
        '''
        Generate a telemetry packet file based using the read one as template and put in it aggregations with the specified number of parameters for each of them
        '''
        if not len(self._tmPacketJson):
            raise GPDSTD_ScriptError("Telemetry packet file shall be read with getAggregationsFromTelemetryPacketFile() function before before generating a telemetry packet file")
        # First copy the read telemetry packet json file content to use it as basis
        outputJsonContent = deepcopy(self._tmPacketJson)
        # We reuse as much as read telemetry packet json file content as possible, the aim is to only replace the aggregations which doesn't fit the requirements
        if "Catalog" in outputJsonContent and 'Items' in outputJsonContent["Catalog"]:
            items = outputJsonContent["Catalog"]["Items"]
            # Create a list of references to the aggregations which doesn't fit with any requested aggregations requirements
            uselessAggs = []
            if len(items) == 0:
                raise GPDSTD_ScriptError("Given telemetry packet json file (" + self._existingTmPacketJsonFile + ") doesn't contains any aggregation which can be used as template to create the request ones")
            for aggregation in items:
                name = aggregation["Name"]
                # Check if this aggregation meet the requirements (first check that this aggregation hasn't been ignore due to parameters not in Reporting catalog)
                if name in self._aggregations.keys():
                    if self._nbParamPerAggInExistingFile[name] in nbParamsPerAgg:
                        # Remove it from the required aggregations, as it is fullfilled by an existing one
                        nbParamsPerAgg.remove(self._nbParamPerAggInExistingFile[name])
                    else:
                        # Save the name of this aggregation because it doesn't fit requirement and can be replaced
                        uselessAggs.append(aggregation)
                        # Remove the useless aggregation from injected data
                        del self._injectionData[name]
            # Check if required aggregations remains, which means they shall be added
            createdAggCounter = 0
            # Initialize the parameter index counter to use as many parameters of the catalog as possible in the aggregations
            newParamIdx = 0
            while len(nbParamsPerAgg):
                # Update aggregation counter used to name them
                createdAggCounter = createdAggCounter + 1
                # Get the number of parameters to put in this new aggregation and remove from the list this requested aggregation
                nbParamsInNewAgg = nbParamsPerAgg.pop(0)
                #print "Create a new aggregation with " + nbParamsInNewAgg + " parameters"
                # Try to replace a useless aggregation to create the new required one
                if len(uselessAggs):
                    aggToAdd = uselessAggs.pop()
                else:
                    # If replacement is not possible, use the first aggregation as template to create the new one
                    aggToAdd = deepcopy(items[0])
                    # And add it at the end of the aggregation list
                    items.append(aggToAdd)
                # First try to generate original aggregation name and oid (only check in given telemetry packet file)
                # Start with original name
                #print "Name of the aggregation used as template (replaced or copied): " +  aggToAdd["Name"]
                nameOfTheTemplateAgg = aggToAdd["Name"]
                # Create the new aggregation name by simple copy of the template one, because this template may be a useless aggregation, so its name may be free
                newAggName = aggToAdd["Name"]
                # Check if generated name already exist
                while newAggName in self._injectionData.keys():
                    # Concatenate "_" and added aggregation index to create an original name
                    newAggName = newAggName + "_" + str(createdAggCounter)
                # Continue with original uid generation
                newAggUid = createdAggCounter + 1
                # Check if generated uid exists
                while newAggUid in self._aggUidInExistingFile.values():
                    newAggUid = newAggUid + 1
                #print "New agg name: " + newAggName +  " and uid: " +  newAggUid +  repr(self._aggregations)
                # Check if the reporting parameters catalog has been read
                if not self._reportingParamsCatalogJsonFile:
                    raise GPDSTD_ScriptError("Reporting parameter catalog shall be read with getParametersFromReportingCatalogFile() function before any telemetry packet file generation")
                # Check if there enough parameters in catalog for this new aggregation
                if nbParamsInNewAgg > len(self._reportingParameters):
                    raise GPDSTD_ScriptError("There is not enough parameter in given catalog (" + self._reportingParamsCatalogJsonFile + ") to generate an aggregation with " + nbParamsInNewAgg + " parameters")
                # Fill in the new aggregation fields
                aggToAdd["Name"] = unicode(newAggName)
                aggToAdd["Uid"] = newAggUid
                # Compute the new aggregation Oid
                newAggOid = self._aggregations[nameOfTheTemplateAgg]["oid"][0:18] + uidToOid(newAggUid)
                # Update the injected data
                self._injectionData[newAggName] = {'uid' : newAggUid, 'paramsOids' : [] }
                paramsOids = []
                # Fill in the new aggregation parameters list
                if "Components" in aggToAdd:
                    parameters =  aggToAdd["Components"]
                    # Loop until all requested parameters have been update or created
                    addedParamIdx = -1
                    while addedParamIdx < nbParamsInNewAgg -1:
                        # Increment created parameter index
                        addedParamIdx = addedParamIdx + 1
                        # Check if we need to update or add a new parameter
                        if len(parameters) > addedParamIdx:
                            # We only update
                            paramToAdd = parameters[addedParamIdx]
                        else:
                            # We add, to check if there is a parameter to be used as template
                            if len(parameters) == 0:
                                raise GPDSTD_ScriptError("Given telemetry packet json file (" + self._existingTmPacketJsonFile + ") has an aggregation without any parameters in it. This is a problem for new telemetry packet file generation")
                            # Use the first parameter as template and add it to the aggregation
                            paramToAdd = deepcopy(parameters[0])
                            parameters.append(paramToAdd)
                        #print "Parameters: " + repr(parameter)
                        if "TelemetryPacketEntry" in paramToAdd and \
                           "ts180.referenceRecord" in paramToAdd["TelemetryPacketEntry"] and \
                           "TargetItem" in paramToAdd["TelemetryPacketEntry"]["ts180.referenceRecord"] and \
                           "string" in paramToAdd["TelemetryPacketEntry"]["ts180.referenceRecord"]["TargetItem"]:
                            # Fill in the new parameter order
                            if "Order" in paramToAdd:
                                paramToAdd["Order"] = addedParamIdx
                            # Fill in the new parameter name
                            paramName = self._reportingParameters.keys()[newParamIdx]
                            paramToAdd["TelemetryPacketEntry"]["ts180.referenceRecord"]["TargetItem"]["string"] = paramName
                            # Update the dictionnary of parameters Oid and Oids of aggregations in which they are
                            if self._reportingParameters[paramName] not in self._aggsOidListByParamOid:
                                self._aggsOidListByParamOid[self._reportingParameters[paramName]] = []
                            if newAggOid not in self._aggsOidListByParamOid[self._reportingParameters[paramName]]:
                                self._aggsOidListByParamOid[self._reportingParameters[paramName]].append(newAggOid)
                                #print "Parameter of oid " + self._reportingParameters[paramName] + " added in aggregation of oid : " + newAggOid
                            # Update the injected data
                            paramsOids.append(self._reportingParameters[paramName])
                            # Update parameter index
                            newParamIdx = (newParamIdx + 1) % len(self._reportingParameters)
                            #print "Added parameter " + self._reportingParameters.keys()[newParamIdx] + " in aggregation named " + newAggName
                    # Check if there is parameters to remove from template aggregation
                    while len(parameters) > nbParamsInNewAgg:
                        parameters.pop()
                    # Update the injected data
                    self._injectionData[newAggName]['paramsOids'] = paramsOids
                    #print "Update injection data by adding paramsOids of len " + repr(len(paramsOids)) + " to agg named " + newAggName + ", then injection data have " + repr(len(self._injectionData)) + " aggregations"
            # Once generated, write the telemetry packet json file content
            try:
                # Open for writing
                outputfile = open(filePath,'w+')
            except IOError as e:
                raise GPDSTD_ScriptError("Cannot open output file for telemetry packet json generation: {0}, message is : {1}".format(filePath,e.strerror))
            filecontent = json.dumps(outputJsonContent, indent=4)
            outputfile.write(filecontent)
            outputfile.close()
            
    def generateDcParameterAggregationFile(self,filePath):
        '''
        Generate the parameter aggregation file for GPCCDC configuration, format is:
        {"parameterAggregations": [{"aggregations": [{"oid": "000200020100c700010000000000000001"},{"oid": "000200020100c700010000000000000004"}],"parameterOid":"000200020100c400010000000000000001"},
        {(...)},{(...)}
        ]}
        '''
        if not len(self._aggsOidListByParamOid):
            raise GPDSTD_ScriptError("Telemetry packet file shall be read with getAggregationsFromTelemetryPacketFile() function before any parameter aggregation file generation")
        try:
            # Open for writing
            outputfile = open(filePath,'w+')
        except IOError as e:
            raise GPDSTD_ScriptError("Cannot open output file for parameter aggregation json generation: {0}, message is : {1}".format(filePath,e.strerror))
        values = []
        paramOidList = self._aggsOidListByParamOid.keys()
        paramOidList.sort()
        for paramOid in paramOidList:
            paramEntry = OrderedDict()
            paramEntry['aggregations']= [{ "oid" : o } for o in self._aggsOidListByParamOid[paramOid]]
            paramEntry['parameterOid'] = paramOid
            values.append(paramEntry)
        filecontent = json.dumps({'parameterAggregations' : values}, indent=4)
        outputfile.write(filecontent)
        outputfile.close()
        
    def generateSdbParameterAggregationFile(self,filePath):
        '''
        Generate the parameter aggregation file for SDB configuration, format is:
        {"Catalog": {"Name": "ParameterAggregation","Version": "1.0","ObjectType": {"Area": 2,"Service": 2,"Version": 1,"Number": 90},
        "Items": [{"ItemNamespace": "Aggregation","Name": "STAT_SU_PID","Oid": null,"Uid": 1,"Aggregations": [{"Oid": "000200020100c700030000000000000001"}]},
        {(...)},{(...)}
        ]}}
        '''
        if not len(self._aggsOidListByParamOid):
            raise GPDSTD_ScriptError("Telemetry packet file shall be read with getAggregationsFromTelemetryPacketFile() function before any parameter aggregation file generation")
        if not(len(self._reportingParameters)):
            raise GPDSTD_ScriptError("Reporting catalog file shall be read with getParametersFromReportingCatalogFile() function before any parameter aggregation file generation")
        try:
            # Open for writing
            outputfile = open(filePath,'w+')
        except IOError as e:
            raise GPDSTD_ScriptError("Cannot open output file for parameter aggregation json generation: {0}, message is : {1}".format(filePath,e.strerror))
        paramOidList = self._aggsOidListByParamOid.keys()
        paramOidList.sort()
        itemsList = []
        for paramOid in paramOidList:
            # Look for parameter Name
            paramName = next((name for name, oid in self._reportingParameters.items() if oid == paramOid), None)
            # If the name of the parameter has been found
            if paramName:
                itemsEntry = OrderedDict()
                itemsEntry["ItemNamespace"] = "Aggregation"
                itemsEntry["Name"] = paramName
                itemsEntry["Oid"] = None
                itemsEntry["Uid"] = oidToUid(self._reportingParameters[paramName][-16:])
                itemsEntry['Aggregations']= [{ "Oid" : o } for o in self._aggsOidListByParamOid[paramOid]]
                itemsList.append(itemsEntry)
        objectType = deepcopy(self._asvnReportingCatalog)
        genCatalog = OrderedDict()
        genCatalog["Name"] = "ParameterAggregation"
        genCatalog["Version"] = "1.0"
        genCatalog["ObjectType"] = objectType
        genCatalog["Items"] = itemsList
        filecontent = json.dumps({"Catalog": genCatalog}, indent=4)
        outputfile.write(filecontent)
        outputfile.close()
        
    def getInjectionData(self):
        '''
        Return a structure with all necesary information to generate the injection data, like this:
        {
            'STAT_SU_STATFILE': {'uid': 1, 'paramsOids': ['000200020100c400010000000000000001', '000200020100c400010000000000000002']},
            'TEST_STAB_VIMA_PACKET_1': {'uid': 2, 'paramsOids': ['000200020100c400010000000000000053', '000200020100c400010000000000000054']},
            'TEST_STAB_VIMA_PACKET_2': {'uid': 3, 'paramsOids': ['000200020100c400010000000000000068', '000200020100c400010000000000000069']},
            'TEST_STAB_VIMA_PACKET_3': {'uid': 3, 'paramsOids': ['000200020100c400010000000000000078', '000200020100c400010000000000000079']},
            'STAT_SU_STATFILE_1': {'uid': 4, 'paramsOids': ['000200020100c400010000000000000017', '000200020100c400010000000000000034']}
        }
        '''
        if not len(self._injectionData):
            raise GPDSTD_ScriptError("Telemetry packet file shall be read with getAggregationsFromTelemetryPacketFile() function before before getting the injection data")
        return self._injectionData
       

class GPDSTD_InjectedDataFileGenerator(object):
    '''
    Generator of data file for the GPDSTD data injector
    '''
    def __init__(self, NbAggGrpToGenerate, AggregationsList, GenFilePath, Overwrite=False):
        '''
        Initialize and configure the generator
        NbAggGrpToGenerate : Number of groups of aggregations to generate in the output file
        AggregationsList : Group of aggregations as a list of dictionaries to create the output file
        GenFilePath : Full path of the output file
        
        Each time the group of aggregation is written in the output file, a variable named t is incremented (from 0 to NbAggGrpToGenerate-1)
        Moreover, the values of the parameters, if they are strings, are evaluated with eval() function
        Due to this, the value of all parameters can be computed using the value of t in order to plot a mathematical function
        Each dictionary of AggregationsList, can contain as values the following types : dict, list, int, float, str
        '''
        self.nbAggToGen = NbAggGrpToGenerate
        if isinstance(AggregationsList,list) == False:
            raise GPDSTD_ScriptError("The second parameter shall be a list of dict objects, and this parameter is not a list")
        if len(AggregationsList) < 1:
            raise GPDSTD_ScriptError("The second parameter shall not be an empty list")
        if isinstance(AggregationsList[0],dict) == False:
            raise GPDSTD_ScriptError("The second parameter shall be a list of dict objects, and the objects of the list are not of dict type")
        self.aggrList = AggregationsList
        self.genFilePath = GenFilePath
        self.singleIndentBlk = "  "
        self.carriageRtn ='\n'
        self.overwrite = Overwrite

    def genElement(self, params):
        '''
        Recursive service to process any elements of a polymorphic tree to generate the output json stream
        params['currentIndentBlk'] is a string representing the current indentation in the output stream
        params['indentLevel'] is an integer representing the current indentation in the output stream
        params['output'] is the string to write the output stream
        params['backtrace'] is a list of string identifying the current processed element. It is only used to report error to script user.
        params['element'] is the polymorphic element to process. It shall have one of these types : list, dict, str, int, float      
        '''
        # Process the element to generate depending on its type
        typeFound = False
        t = params['t']

        # Manage the cases when element generation requires recursive call
        if not typeFound and isinstance(params['element'],list):
            typeFound = True
            self.genList(params)
        
        if not typeFound and isinstance(params['element'],dict):
            typeFound = True
            self.genDict(params)
            
        # Manage the case when element is a reporting parameter value
        if not typeFound and isinstance(params['element'],GPDSTD_ReportingParameterValue):
            typeFound = True
            params['output'] = params['output'] + params['element'].getValue(t)
       
        # In case of string type, assume that the element can be evaluated
        if not typeFound:
            paramValue, isNumerical = resolveValue(params['element'],t)
            if isNumerical == True:
                # In case of numerical value, no need to put quotes
                params['output'] = params['output'] + paramValue
                typeFound = True
            else:
                # Put quotes for non numerical values
                params['output'] = params['output'] + '"' + paramValue + '"'
                typeFound = True
               
        # Robustness in case of problem after code update 
        if not typeFound:
            raise GPDSTD_ScriptError("A parameter with not supported type (list, dict, int, long, float, string) has been found in : " + " ".join(params['backtrace'])) 
        
    def genListElt(self, params, listElt,eltPos):
        '''
        Recursive service to process list element entry of a polymorphic tree to generate the output json stream
        See genElement docString for description of "params" dict content
        listElt is the element from the list to process
        eltPos is the position of the element to process in the list (only used for error reporting)
        '''
        # Manage backtrace for error reporting
        params['backtrace'].append(repr(eltPos))
        # Request the list element generation in output stream
        params['element'] = listElt
        self.genElement(params)
        # Manage backtrace for error reporting
        params['backtrace'].pop()
       
    def genDictElt(self, params, eltKey, eltVal):
        '''
        Recursive service to process dict element entry of a polymorphic tree to generate the output json stream
        See genElement docString for description of "params" dict content
        eltKey is the key of the dict element to process
        eltVal is the value of the dict element to process
        '''
        # Manage backtrace for error reporting 
        params['backtrace'].append(eltKey)
        # Write the dict key in output stream
        params['output'] = params['output'] + '"' + eltKey + '": ' 
        # Request the element value generation in output stream
        params['element'] = eltVal
        self.genElement(params)
        # Manage backtrace for error reporting
        params['backtrace'].pop()
        
    def genDict(self, params):
        '''
        Recursive service to process full dict element of a polymorphic tree to generate the output json stream
        See genElement docString for description of "params" dict content
        '''
        processedDict = params['element']
        
        # Generate the dict start characters and indentation
        params['currentIndentBlk'] = params['currentIndentBlk'] + self.singleIndentBlk
        params['indentLevel'] = params['indentLevel'] + 1
        params['output'] = params['output'] + "{" + self.carriageRtn + params['currentIndentBlk']        
        # Manage backtrace for error reporting
        params['backtrace'].append("aggregationElement")

        # Generate the first element outside the for loop to easily manage the separation character, which shall not be present after the last element of the dict        
        dictKeys = processedDict.keys()
        firstKey =  dictKeys.pop()
        self.genDictElt(params,firstKey,processedDict[firstKey])
        # Generate each element of the dict
        for eltKey in dictKeys:
            params['output'] = params['output'] + ',' + self.carriageRtn + params['currentIndentBlk']
            self.genDictElt(params, eltKey, processedDict[eltKey])

        # Manage backtrace for error reporting
        params['backtrace'].pop()
        # Generate the dict end characters and indentation
        params['currentIndentBlk'] = params['currentIndentBlk'].replace(self.singleIndentBlk,"",1)
        params['indentLevel'] = params['indentLevel'] - 1
        params['output'] = params['output'] + self.carriageRtn + params['currentIndentBlk'] + "}"
        
    def genList(self,params):
        '''
        Recursive service to process full list element of a polymorphic tree to generate the output json stream
        See genElement docString for description of "params" dict content
        '''
        processedList = params['element']
        
        # Generate the list start characters and indentation
        params['currentIndentBlk'] = params['currentIndentBlk'] + self.singleIndentBlk
        params['indentLevel'] = params['indentLevel'] + 1
        params['output'] = params['output'] + "[" + self.carriageRtn + params['currentIndentBlk']
        # Manage backtrace for error reporting
        params['backtrace'].append("listElement")
        eltPos = 0
        
        if len(processedList):
            # Generate the first element outside the while loop to easily manage the separation character, which shall not be present after the last element of the list
            listElt = processedList[0]
            self.genListElt(params, listElt, eltPos)
            eltPos = eltPos + 1
            # Generate each element of the list
            while eltPos < len(processedList):
                params['output'] = params['output'] + ',' + self.carriageRtn + params['currentIndentBlk']
                self.genListElt(params, processedList[eltPos], eltPos)
                eltPos = eltPos + 1

        # Manage backtrace for error reporting
        params['backtrace'].pop()
        # Generate the list end characters and indentation
        params['currentIndentBlk'] = params['currentIndentBlk'].replace(self.singleIndentBlk,"",1)
        params['indentLevel'] = params['indentLevel'] - 1
        params['output'] = params['output'] + self.carriageRtn + params['currentIndentBlk'] + "]"

    def generate(self):
        '''
        Main function to generate the the output json file
        '''
        params  = dict()
        params['backtrace'] = []
        # Init the output stream with list start bracket and indentation to first level
        params['output'] = "[" + self.carriageRtn
        params['currentIndentBlk'] = self.singleIndentBlk
        params['indentLevel'] = 1
        
        # Check if file exists
        if isfile(self.genFilePath):
            if self.overwrite:
                remove(self.genFilePath)
            else:
                raise GPDSTD_ScriptError("Output file already exist and overwrite option is false, the following file is not written: " + self.genFilePath)
        
        # Open the output file to write in it at each loop iteration (in order to save memory)
        try:
            # Open with 'a' option to append content    
            outputfile = open(self.genFilePath,'a')
        except IOError as e:
            raise GPDSTD_ScriptError("Cannot open output file : {0}, message is : {1}".format(self.genFilePath,e.strerror))      
        
        # Main loop to generate the full aggregation list
        for t in range(self.nbAggToGen):
            params['t'] = t
            # Write the output file and flush buffer in memory at start because an output stream correction is required after last loop iteration
            outputfile.write(params['output'])
            params['output'] = ""
            # Compute and display progression status (usefull for huge file generation
            progress = float(t+1)/float(self.nbAggToGen) * 100
            sys.stdout.write("\rProgress status : %0.1f"%progress + "%       ")
            sys.stdout.flush()
            # Loop for each aggregation in order to not generate for each iteration the json list brackets (the entire file to generate shall be a single json list)
            for aggr in self.aggrList:
                params['element'] = aggr
                self.genElement(params)
                params['output'] = params['output'] + ',' + self.carriageRtn + params['currentIndentBlk']
            
        # Update progression status for the last time (with carriage return this time)
        progress = float(t+1)/float(self.nbAggToGen) * 100
        sys.stdout.write("\rProgress status : %0.1f"%progress + "%       \n")        
        
        # Remove from the last "," added by the processing loop, and put the end of list bracket
        params['output'] = params['output'][:params['output'].rfind(",")] + self.carriageRtn + "]"  
        # Write the end of the file to close the generated json list
        outputfile.write(params['output'])      
        
        # Close the output file
        outputfile.close()

def float_to_raw(f):
    '''
    Convert a float to an integer number equal to its raw value in memory
    '''
    return unpack('<I', pack('<f', f))[0]
    
def int_to_raw(i):
    '''
    Convert a float to an integer number equal to its raw value in memory
    '''
    return unpack('<I', pack('<i', i))[0]


def monitoringStateGenerator(t,states=['nominal','warning','danger','critical']):
    '''
    Generate the monitoring state
    t is the iteration index, from 0 to the value of --niter, -n argument of the script
    states list of strings to use as return value, default list is ['nominal','warning','danger','critical']
    '''
    ret_val = "nominal"
    nb_states = GPDSTD_NbIterations # Value of --niter, -n argument of the script
    for i in range(nb_states):
        if len(states) > i and (t%nb_states) == i:
            ret_val = states[i]
    return ret_val
   
if __name__ == '__main__':    

    #Parse arguments of the command line
    args, unknown = GPDSTD_ArgsParser.parse_known_args()
    
    # Set the number of iterations in the global variable
    GPDSTD_NbIterations = args.niter
    
    # Read the Reporting and Telemetry packet catalogs
    #print "Args.agg: "  + repr(args.agg)
    aggGen = GPDSTD_AggregationsGenerator(args.domain,args.overwrite)
    print "Analyse catalog file " + expanduser(args.catalog)
    allParamsNamesOids = aggGen.getParametersFromReportingCatalogFile(expanduser(args.catalog))
    print "Analyse telemetry packet file " + expanduser(args.tmpacket)
    allAggrs = aggGen.getAggregationsFromTelemetryPacketFile(expanduser(args.tmpacket))
    nbParamsInExistingAggs = aggGen.getAggregationsDetails()
    nbParamsInExistingAggs.sort()
    nbExistingParamsInCatalog = aggGen.getParametersDetails()
    print "Number of parameters in each aggregation of analysed telemetry packet file are " + ", ".join(map(str,nbParamsInExistingAggs)) + " and total number of parameters in catalog is " + str(len(allParamsNamesOids))
    #print repr(aggGen.getAggsOidsByParamOid())

    # Check if telemetry packet file shall be generated
    # It shall be generated if a list of aggregations is specified and this list doesn't fit with provided TelemetryPacket file
    if args.agg and len(args.agg):
        nbRequestedParamsInAggs = deepcopy(args.agg)
        nbParamInAggsToChk = deepcopy(nbParamsInExistingAggs)
        # Telemetry packet file shall be generated if the specified list of aggregation doesn't have the same number of parameters as the ones in telemetry packet file
        isErrToRaise = False
        if not args.generate:
            for nbParams in nbRequestedParamsInAggs:
                if nbParams in nbParamInAggsToChk:
                    nbParamInAggsToChk.remove(nbParams)
                else:
                    isErrToRaise = True
            if isErrToRaise:
                raise GPDSTD_ScriptError("The number of parameters in the resquested aggregations (" + repr(nbRequestedParamsInAggs) + ") doesn't fit with the existing ones in the provided telemetry packet file (" + repr(nbParamsInExistingAggs) + "), and no path has been given for the generation of a telemetry packet file")
        else:
	    #At this point telemetry packet file generation is required and possible
	    print "Generate a telemetry packet file for aggregations with " + ", ".join(map(str,nbRequestedParamsInAggs))  + " parameter(s) in the file: ",expanduser(args.generate)
	    aggGen.generateTelemetryPacketFile(expanduser(args.generate),nbRequestedParamsInAggs)

    # Manage the GPCCDC parameter aggregation file generation
    if args.dcparamagg and len(args.dcparamagg):
        print "Generate a parameter aggregation file for GPCCDC configuration in " + expanduser(args.dcparamagg)
        aggGen.generateDcParameterAggregationFile(expanduser(args.dcparamagg))

    # Manage the SDB parameter aggregation file generation
    if args.sdbparamagg and len(args.sdbparamagg):
        print "Generate a parameter aggregation file for SDB configuration in " + expanduser(args.sdbparamagg)
        aggGen.generateSdbParameterAggregationFile(expanduser(args.sdbparamagg))

    # Manage the output json file generation containing injected data
    
    # Retreive the injection data
    injectedData = aggGen.getInjectionData()
    #print repr(injectedData)

    # Manage formulas for parameter value and monitoring state
    valFormulaParam = None
    if args.valueformula and len(args.valueformula):
        valFormulaParam = args.valueformula.pop(0)
        valFormulaCnt = int(valFormulaParam[1])
    
    stateFormulaParam = None
    if args.stateformula and len(args.stateformula):
        stateFormulaParam = args.stateformula.pop(0)
        stateFormulaCnt = int(valFormulaParam[1])
    
    # Loops for injected data generation
    
    # Build the list of aggregations names to put in injection data in order to respect the requested order
    OrderedAggrListNames = []
    AggrListNames = injectedData.keys()
    # Check if the number of parameters per aggregation has been specified
    if args.agg and len(args.agg):
        # For each aggregation to generate, look for the name of the aggregation with the requested number of parameters
        for nbParamInAgg in args.agg:
            # Build a dictionnary with not already used aggregation names as key and number of parameters as value
            aggNames = { name : len(injectedData[name]["paramsOids"]) for name in AggrListNames}
            # Look for the name of the aggregation with the required number of parameters from the remaining aggregations
            aggName  = next((name for name, nbParam in aggNames.items() if nbParam == nbParamInAgg), None)
            # Check if an aggregation with requested number of parameters has been found
            if aggName:
                # Remove the aggregation name from the list, to not use it twice
                AggrListNames.remove(aggName)
                # Add the aggregation name to the ordered list
                OrderedAggrListNames.append(aggName)
            else:
                raise GPDSTD_ScriptError("No aggregation found in generated injection data for aggregation with " + repr(nbParamInAgg) +  " parameters")
    else:
        # In case number of parameters in aggregation is not specified, simply read the keys of the ordered dict filled during the read of telemetry parcket file
        OrderedAggrListNames = allAggrs.keys()
        
    # For each aggregation to generate
    AggrList = []
    for aggrName in OrderedAggrListNames:
        paramValues = []
        # For each parameter of the aggregation
        for oid in injectedData[aggrName]['paramsOids']:
           
            # Set the value for the parameter with default or specified formula
            if valFormulaParam:
                # Get the next formula once the specified number of occurences have been done
                if not valFormulaCnt:
                    # In case the number of occurrences has reach the specified value, keep generation with last formula
                    if len(args.valueformula):
                        valFormulaParam = args.valueformula.pop(0)
                    valFormulaCnt = int(valFormulaParam[1])
                # Decrement occurence counter and update the formula
                valFormulaCnt = valFormulaCnt - 1
                paramFormula = valFormulaParam[0]
            else:
                # If there is no parameter value specified, put 10
                paramFormula = "str(10)"
                
            # Set the monitoring state value for the parameter with default or specified formula
            if stateFormulaParam:
                # Get the next formula once the specified number of occurences have been done
                if not stateFormulaCnt:
                    # In case the number of occurrences has reach the specified value, keep generation with last formula
                    if len(args.stateformula):
                        stateFormulaParam = args.stateformula.pop(0)
                    stateFormulaCnt = int(stateFormulaParam[1])
                # Decrement occurence counter and update the formula
                stateFormulaCnt = stateFormulaCnt - 1
                monitoringStateFormula = stateFormulaParam[0]
            else:
                # If there is no parameter value specified, put 10
                monitoringStateFormula = 1
        
            #print "Using formula " + paramFormula + " for value of parameter of oid: " + ,oid
            #print "Using formula " + monitoringStateFormula + " for monitoring state of parameter of oid: " + oid
       
            # Create the data structure of a parameter
            objType = {
                    "area" : int(oid[:4],16),
                    "service": int(oid[4:8],16),
                    "version" : int(oid[8:10],16),
                    "number" : int(oid[10:14],16)
                    }

            objKey = {
                    "domaineId" : int(oid[14:18],16),
                    "uid" : str(oidToUid(oid[18:])) #str() use necessary to avoid trailing "L" with long type uid
                    }
            
            objDef = {
                    "objectType" : objType,
                    "objectKey" : objKey
                    }
 
             # Retrieve parameter name from oid for verbose mode
            if args.verbose:
                # Create a list of the names of all parameter with the seek oid (sname for seek name and soid for seek oid)
                parameterNames = [sname for sname, soid in allParamsNamesOids.items() if soid == oid]
                parameterName = parameterNames[0]
            else:
                parameterName = None
            
            dataType = aggGen.getConvertedValueDatatypeByParamOid(oid)
            rawvalueDatatype = aggGen.getRawValueDatatypeByParamOid(oid)
            rawValue = GPDSTD_ReportingParameterValue("rawValue",paramFormula,rawValueDatatype=rawvalueDatatype,paramName=parameterName)
            extractedValue = GPDSTD_ReportingParameterValue("extractedValue",paramFormula,paramName=parameterName)
            convertedValue = GPDSTD_ReportingParameterValue("convertedValue",paramFormula,datatype=dataType,paramName=parameterName)

            # Manage the verbose generation
            if args.verbose:
                print "Create an aggregation named:", aggrName, "with a parameter named:", parameterName, "with a value equal to formula", paramFormula, "convertedValue type to", convertedValue.getCCDDS_mal_type(), "and rawValue type to", rawValue.getCCDDS_mal_type()  
           
            paramValue = {
                    "extractedValue" : extractedValue,
                    "rawValueType" : rawValue.getCCDDS_mal_type(),
                    "rawValue" : rawValue,
                    "convertedValueType" : convertedValue.getCCDDS_mal_type(),
                    "convertedValue" : convertedValue,
                    "triggerCount" : 1,
                    "monitoringState" : monitoringStateFormula,
                    "validityState" : 2,
                    "definition" : objDef
                    }
         
            # Add the created paramater in the aggregation (deepcopy is mandatory to copy the root data strcture and all the referenced ones)
            paramValues.append(deepcopy(paramValue))
    
        # Create the aggregation data structure
        aggr = {
                "TMPacketName" : str(aggrName),
                "uid" : injectedData[aggrName]['uid'],
                "generationModse" : 1,
                "filtered" : 0,
                "deltaTime" : 1,
                "intervalTime" : 1,
                "setIntervalTime" : 1,
                "onboardDate" : 1,
                "groundDate" : 1,
                "packetType" : 1,
                "apid" : 1,
                "service" : 1,
                "subService" : 1,
                "destinationId" : 1,
                "values":paramValues
                }
                  
        # Create the list of aggregations for the generator
        AggrList.append(deepcopy(aggr))
  
    # Create the generator instance
    print "Writing the injection data file " + expanduser(args.output) + " with " + str(args.niter) + " times " + str(len(AggrList)) + " aggregation(s) containing the following number of parameters: " + " ".join(map(str,[len(a["values"]) for a in AggrList]))
    injDataGen = GPDSTD_InjectedDataFileGenerator(args.niter,AggrList,expanduser(args.output),args.overwrite)
    # Generate the output file
    injDataGen.generate()
