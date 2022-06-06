# Generated by Django 4.0.4 on 2022-06-05 23:15

import app.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='EEG',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.TextField(blank=True, null=True)),
                ('timestamp', models.DateTimeField(blank=True, null=True)),
                ('priority', models.CharField(choices=[('1', 'Very Low'), ('2', 'Low'), ('3', 'Medium'), ('4', 'High'), ('5', 'Very High')], max_length=1)),
                ('duration', models.IntegerField(blank=True, null=True)),
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
                ('email', models.EmailField(max_length=254, unique=True)),
                ('address', models.CharField(max_length=300)),
                ('telephone', models.CharField(max_length=20)),
                ('birthday', models.DateField()),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='app.person')),
                ('medical_number', models.CharField(max_length=20, unique=True)),
            ],
            bases=('app.person',),
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='app.person')),
                ('medical_info', models.TextField(null=True)),
            ],
            bases=('app.person',),
        ),
        migrations.CreateModel(
            name='Providence',
            fields=[
                ('institution_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='app.institution')),
            ],
            bases=('app.institution',),
        ),
        migrations.CreateModel(
            name='RevisionCenter',
            fields=[
                ('institution_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='app.institution')),
            ],
            bases=('app.institution',),
        ),
        migrations.CreateModel(
            name='SharedFolder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('contract', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_contract', to='app.contract', verbose_name='contract')),
                ('eeg', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_eeg', to='app.eeg', verbose_name='eeg')),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('eeg', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_eeg', to='app.eeg', verbose_name='eeg')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_person', to='app.person', verbose_name='person')),
            ],
        ),
        migrations.AddField(
            model_name='eeg',
            name='report',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_report', to='app.report', verbose_name='report'),
        ),
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=50)),
                ('file', models.FileField(upload_to='')),
                ('eeg', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_eeg', to='app.eeg', verbose_name='eeg')),
            ],
        ),
        migrations.CreateModel(
            name='Annotation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.FloatField()),
                ('duration', models.FloatField(null=True)),
                ('description', models.TextField()),
                ('eeg', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_eeg', to='app.eeg', verbose_name='eeg')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=50, null=True)),
                ('password', models.CharField(max_length=256)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', app.models.CustomUserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Operator',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='app.person')),
                ('operator_number', models.CharField(max_length=20, unique=True)),
                ('providence', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_providence', to='app.providence', verbose_name='providence')),
            ],
            bases=('app.person',),
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
            name='DoctorRevisionCenter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_doctor', to='app.doctor', verbose_name='doctor')),
                ('revision_center', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_revision_center', to='app.revisioncenter', verbose_name='revision center')),
            ],
        ),
        migrations.AddField(
            model_name='contract',
            name='providence',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_providence', to='app.providence', verbose_name='providence'),
        ),
        migrations.AddField(
            model_name='contract',
            name='revision_center',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_revision_center', to='app.revisioncenter', verbose_name='revision_center'),
        ),
    ]
