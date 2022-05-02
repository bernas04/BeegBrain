import numpy as np
import pyedflib
import matplotlib.pyplot as plt
import pyflac
""" 
f = pyedflib.EdfReader("./eeg.edf")

n = f.signals_in_file # isto vai buscar os sinais e descarta o resto da informação 
print(n)

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

# show signal

for i in np.arange(n):
    sigbufs[i, :] = f.readSignal(i) # o parâmetro passado aqui dentro tem a ver com o channel!
    #print("channel: " + signal_labels[i])
    ax.plot(f.readSignal(i))        # pelos vistos ele está a ler o conteúdo de todos os channels
    #plt.show()                      # neste caso em concreto existem 129 channels
                                    # quanto aos plots é semelhante a matlab


# [canal, range]
print(sigbufs[0,:10])
print(sigbufs[1,:10])


#sigbufs - matriz bidensional com n colunas (numero de canais) e x sinais (frequencia)

# SEPARAR O FICHEIRO EEG EM VÁRIAS PARTES - UM FICHEIRO PARA CADA CANAL:
# https://pyflac.readthedocs.io/en/latest/

f.close()
 """
def deassembleEEG(file_path):

    f = pyedflib.EdfReader(file_path)
    n = f.signals_in_file # isto vai buscar os sinais e descarta o resto da informação 
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
