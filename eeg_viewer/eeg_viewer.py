import numpy as np
import pyedflib
import matplotlib.pyplot as plt


f = pyedflib.EdfReader("./edf_file.edf")

n = f.signals_in_file # isto vai buscar os sinais e descarta o resto da informação 

signal_labels = f.getSignalLabels() # Returns a list with all labels (name) (“FP1”, “SaO2”, etc.).
print(signal_labels)                # descomentem esta linha se quiserem ver as labels para perceberem melhor, mas neste caso acho que
                                     # se referem aos canais

sigbufs = np.zeros((n, f.getNSamples()[0])) # a partir daqui já tem a ver com o display do sinal
fig = plt.figure()
ax = plt.axes()

# info sobre o eeg
print(f.file_info_long())

# Returns the transducer of signal chn (“AgAgCl cup electrodes”, etc.).
print(f.getTransducer(0))

# Mínimos para o canal 0 - Se não tiver parâmetro retorna uma lista com os mínimos de todos os canais numa matriz
print(f.getPhysicalMinimum(0))

# Máximos para o canal 10 - Se não tiver parâmetro retorna uma lista com os máximos de todos os canais numa matriz
print(f.getPhysicalMaximum(0))

# Tempo de início do EEG
print(f.getStartdatetime())

# Tempo de duração  
print(f.getFileDuration())

# Técnico e paciente (algo que podemos usar no projeto)
print(f.getPatientName())
print(f.getTechnician())


# Anotações do EEG - caso existam
for annot in f.readAnnotations():
    print(annot)

for i in np.arange(n):
    """o 'i' é um inteiro"""
    sigbufs[i, :] = f.readSignal(i) # o parâmetro passado aqui dentro tem a ver com o channel!
    print("channel: " + signal_labels[i])
    ax.plot(f.readSignal(i))        # pelos vistos ele está a ler o conteúdo de todos os channels
    plt.show()                      # neste caso em concreto existem 129 channels
                                    # quanto aos plots é semelhante a matlab


# [canal, range]
print(sigbufs[0,:10])
print(sigbufs[1,:10])

#sigbufs - matriz bidensional com n colunas (numero de canais) e x sinais (frequencia)

f.close()