""" from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms """

""" 
class SignUpForm(UserCreationForm):
    email = forms.EmailField(label='Email address', max_length=75)

    class Meta:
        model = User
        fields = ('username', 'email',)

    def clean_email(self):
        email = self.cleaned_data["email"]
        try:
            user = User.objects.get(email=email)
            raise forms.ValidationError(
                "This email address already exists. Did you forget your password?")
        except User.DoesNotExist:
            return email

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        user.email = self.cleaned_data["email"]
        user.is_active = True  # change to false if using email activation
        if commit:
            user.save()
        return user

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        user.email = self.cleaned_data["email"]
        user.is_active = True  # change to false if using email activation
        if commit:
            user.save()
        return user
 """