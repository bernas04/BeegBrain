# Generated by Django 4.0.4 on 2022-05-13 00:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EEG',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='')),
                ('status', models.BooleanField(default=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('address', models.CharField(max_length=300)),
                ('telephone', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('health_number', models.CharField(max_length=20, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('address', models.CharField(max_length=300)),
                ('telephone', models.CharField(max_length=20)),
                ('birthday', models.DateField()),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='app.person')),
                ('medical_number', models.CharField(max_length=20)),
            ],
            bases=('app.person',),
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='app.person')),
                ('medical_info', models.TextField()),
            ],
            bases=('app.person',),
        ),
        migrations.CreateModel(
            name='Providence',
            fields=[
                ('institution_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, to='app.institution')),
                ('institution', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='%(class)s_institution', serialize=False, to='app.institution')),
            ],
            bases=('app.institution',),
        ),
        migrations.CreateModel(
            name='RevisionCenter',
            fields=[
                ('institution_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, to='app.institution')),
                ('institution', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='%(class)s_institution', serialize=False, to='app.institution')),
            ],
            bases=('app.institution',),
        ),
        migrations.CreateModel(
            name='SharedFolder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(max_length=300, null=True)),
                ('eeg', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_eeg', to='app.eeg', verbose_name='eeg')),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_institution', to='app.institution', verbose_name='institution')),
            ],
        ),
        migrations.AddField(
            model_name='eeg',
            name='report',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_report', to='app.report', verbose_name='report'),
        ),
        migrations.AddField(
            model_name='report',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_doctor', to='app.doctor', verbose_name='doctor'),
        ),
        migrations.CreateModel(
            name='Operator',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='app.person')),
                ('operator_number', models.CharField(max_length=20)),
                ('providence', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_providence', to='app.providence', verbose_name='providence')),
            ],
            bases=('app.person',),
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('eeg', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_eeg', to='app.eeg', verbose_name='eeg')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_doctor', to='app.doctor', verbose_name='doctor')),
            ],
        ),
        migrations.AddField(
            model_name='eeg',
            name='operator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_operator', to='app.operator', verbose_name='operator'),
        ),
        migrations.AddField(
            model_name='eeg',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_patient', to='app.patient', verbose_name='patient'),
        ),
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('providence', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_providence', to='app.providence', verbose_name='providence')),
                ('revision_center', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_revision_center', to='app.revisioncenter', verbose_name='revision_center')),
            ],
        ),
        migrations.CreateModel(
            name='AccessEEG',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eeg', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_eeg', to='app.eeg', verbose_name='eeg')),
                ('patient', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_patient', to='app.patient', verbose_name='patient')),
            ],
        ),
        migrations.CreateModel(
            name='DoctorRevisionCenter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_doctor', to='app.doctor', verbose_name='doctor')),
                ('revision_center', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_revision_center', to='app.revisioncenter', verbose_name='revision center')),
            ],
            options={
                'unique_together': {('doctor', 'revision_center')},
            },
        ),
    ]
