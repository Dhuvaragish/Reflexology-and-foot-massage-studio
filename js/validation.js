/**
 * Reflexology & Foot Massage Studio - Form Validation
 */

const FormValidator = {
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  },

  validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required check
    if (input.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = input.getAttribute('data-err-required') || 'This field is required.';
    }
    // Email check
    else if (input.type === 'email' && value) {
      if (!this.patterns.email.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      }
    }
    // Phone check
    else if (input.type === 'tel' && value) {
      if (value.length < 7) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
      }
    }
    // Minlength check
    else if (input.hasAttribute('minlength')) {
      const min = parseInt(input.getAttribute('minlength'), 10);
      if (value.length < min) {
        isValid = false;
        errorMessage = `Must be at least ${min} characters.`;
      }
    }

    this.setStatus(input, isValid, errorMessage);
    return isValid;
  },

  setStatus(input, isValid, errorMessage) {
    const formGroup = input.closest('.form-group') || input.parentElement;
    let feedback = formGroup.querySelector('.invalid-feedback');

    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      formGroup.appendChild(feedback);
    }

    if (!isValid) {
      input.classList.add('is-invalid');
      feedback.textContent = errorMessage;
    } else {
      input.classList.remove('is-invalid');
      feedback.textContent = '';
    }
  },

  validateForm(form) {
    const inputs = form.querySelectorAll('input:not([type="hidden"]), select, textarea');
    let formIsValid = true;

    inputs.forEach(input => {
      const isInputValid = this.validateInput(input);
      if (!isInputValid) {
        formIsValid = false;
      }
    });

    return formIsValid;
  },

  attach(form) {
    if (!form) return;
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateInput(input);
      });
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          this.validateInput(input);
        }
      });
    });
  }
};

window.FormValidator = FormValidator;
