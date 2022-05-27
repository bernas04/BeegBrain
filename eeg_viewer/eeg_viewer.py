import numpy as np
import pyedflib
import matplotlib.pyplot as plt


f = pyedflib.EdfReader("/home/ricardo/Downloads/S002/S002R07.edf")

n = f.signals_in_file 
print(n)

signal_labels = f.getSignalLabels() 
print(signal_labels)                
                                   

annot = f.readAnnotations()
print(annot[0])
for i in range(len(annot[0])):
    print("=======")
    print("start: " + str(annot[0][i]))
    print("duration: " + str(annot[1][i]))
    print("description: " + str(annot[2][i]))



print("start date time")
print(f.getStartdatetime())
seconds = f.getFileDuration()
print(str(f.getFileDuration()) + "seconds")
print(len(f.readSignal(0)))
length = len(f.readSignal(1))
print(length/seconds)


f.close()

