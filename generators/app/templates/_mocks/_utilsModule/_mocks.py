# MOCKS
from datetime import datetime, timedelta

""" postExample """
def postExample():
    response = {
                 "listaAttribute": [
                   {
                     "id": "12345",
                     "nome": "attribute1",
                     "descrizione": "descrizione attr1",
                     "ultimaModifica": "2020-01-13T15:57:09.707Z",
                     "flagEnabled": True,
                     "documentiCollegati": [
                       {
                         "idDocument": "1234",
                         "nomeDocument": "doc collegato1",
                         "flagEnabledDocument": True
                       }
                     ]
                   }
                 ]
               }
    return response
