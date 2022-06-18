from __future__ import annotations
import pyedflib


f = pyedflib.EdfReader("eeg.edf")
signal_labels = f.getSignalLabels() 
annotations = f.readAnnotations()
channels = len(signal_labels)-1
f.close()

fw = pyedflib.EdfWriter("eeg.edf", channels)
fw.writeAnnotation(3, 2, "Closed Eyes")
fw.close()

f = pyedflib.EdfReader("eeg.edf")
annotations = f.readAnnotations()
print(annotations)
f.close()