import os
import mne
              
# file = "edf_file.edf"
file = "eeg.edf"
raw = mne.io.read_raw_edf(file)

print(raw.info)
print()

raw.crop(tmax=60).load_data()
raw.pick([ ch for ch in raw.ch_names ])        # escolher os canais que queremos, neste caso, queremos todos

colors = dict( eeg='steelblue' )
bad_colors = dict( eeg='darkred' )

raw.plot(block=True, duration=1, color=colors, bad_color=bad_colors)

