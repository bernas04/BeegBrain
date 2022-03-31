import numpy as np
import pyedflib
import matplotlib.pyplot as plt


f = pyedflib.EdfReader("./eeg.edf")

n = f.signals_in_file # isto vai buscar os sinais e descarta o resto da informação 

signal_labels = f.getSignalLabels() # Returns a list with all labels (name) (“FP1”, “SaO2”, etc.).
print(signal_labels)                # descomentem esta linha se quiserem ver as labels para perceberem melhor, mas neste caso acho que
                                     # se referem aos canais

sigbufs = np.zeros((n, f.getNSamples()[0])) # a partir daqui já tem a ver com o display do sinal
fig = plt.figure()
ax = plt.axes()


for i in np.arange(n):
    """o 'i' é um inteiro"""
    sigbufs[i, :] = f.readSignal(i) # o parâmetro passado aqui dentro tem a ver com o channel!
    ax.plot(f.readSignal(i))        # pelos vistos ele está a ler o conteúdo de todos os channels
    plt.show()                      # neste caso em concreto existem 129 channels
                                    # quanto aos plots é semelhante a matlab