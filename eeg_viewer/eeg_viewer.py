import numpy as np
import pyedflib
import matplotlib.pyplot as plt

f = pyedflib.EdfReader("/home/ricardo/Downloads/S001/S001R14.edf")

n = f.signals_in_file # isto vai buscar os sinais e descarta o resto da informação 
print(n)

signal_labels = f.getSignalLabels() # Returns a list with all labels (name) (“FP1”, “SaO2”, etc.).
print(signal_labels)                # descomentem esta linha se quiserem ver as labels para perceberem melhor, mas neste caso acho que
                                     # se referem aos canais

#print("--> ",f.readAnnotations())
for an in f.readAnnotations():
    print("====")
    print(an)


#sigbufs - matriz bidensional com n colunas (numero de canais) e x sinais (frequencia)

# SEPARAR O FICHEIRO EEG EM VÁRIAS PARTES - UM FICHEIRO PARA CADA CANAL:
# https://pyflac.readthedocs.io/en/latest/

f.close()


"""
def deassembleEEG(file_path):

    f = pyedflib.EdfReader(file_path)
    n = f.signals_in_file-1 # isto vai buscar os sinais e descarta o resto da informação 
    m = f.getNSamples()[0]
    signal_labels = f.getSignalLabels() # Returns a list with all labels (name) (“FP1”, “SaO2”, etc.)
    sigbufs = np.zeros((n, m)) # matriz de zeros n channels por comprimento de sinal
    for i in np.arange(n):
        sigbufs[i, :] = f.readSignal(i) 
        channelLabel = signal_labels[i]
        with open('subparts/channel' + channelLabel + '.npy', 'wb') as file:
            np.save(file, sigbufs[i, :])
        
    f.close()
    return signal_labels,n,m

def assembleEEG(n,m,channel_labels, output_file):


    signal = np.zeros((n,m)) # matriz de zeros n channels por comprimento de sinal
    for i in range(n):
        channel = channel_labels[i]
        with open('subparts/channel' + channel + '.npy', 'rb') as file:
            signal[i,:] = np.load(file)

    f = pyedflib.EdfWriter(file_name=output_file, n_channels=n)
    f.close()
    print("ASSEMBLE DONE")




channel_labels,n,m = deassembleEEG("./eeg.edf")
assembleEEG(n,m,channel_labels,"assembled.edf")
"""
