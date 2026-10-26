/**
 * Reflexology & Foot Massage Studio - Form Validation
 */

const FormValidator = {
  patterns: {
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
    phone: /^(?:\+?[1-9]\d{0,3}[\s.-]?)?(?:\(\d{1,4}\)[\s.-]?|\d{1,4}[\s.-]?){1,4}\d{1,9}$/
  },

  /**
   * Comprehensive Mobile & International Phone Number Validation
   * Rejects:
   * - Empty or whitespace-only inputs
   * - Alphabetic characters (e.g. yfAUYFcuSU, 123abc456)
   * - Arbitrary special characters (only digits, +, -, space, (), . allowed)
   * - Multiple or misplaced '+' characters (+ must be first character only)
   * - Unbalanced or malformed parentheses
   * - Consecutive or malformed punctuation (--, .., () )
   * - Numbers too short (< 8 digits) or too long (> 15 digits under ITU-T E.164)
   * - Repetitive fake sequences (e.g. 0000000000)
   * Accepts:
   * - Standard 10-digit formats: (555) 349-8812, 555-349-8812, 555 349 8812, 5553498812
   * - US 11-digit format: 1-555-349-8812, +1 (555) 349-8812
   * - International E.164 formats: +44 7911 123456, +61 412 345 678, +33 6 12 34 56 78, +81 90 1234 5678, +91 98765 43210
   *
   * @param {string} rawValue
   * @returns {{ isValid: boolean, error: string, normalized?: string }}
   */
  validatePhoneNumber(rawValue) {
    if (rawValue === undefined || rawValue === null) {
      return { isValid: false, error: 'Please enter your mobile number.' };
    }
    const value = String(rawValue).trim();
    if (!value) {
      return { isValid: false, error: 'Please enter your mobile number.' };
    }

    // 1. Strictly reject alphabetic characters
    if (/[a-zA-Z]/.test(value)) {
      return { isValid: false, error: 'Please enter a valid mobile number.' };
    }

    // 2. Reject arbitrary special characters (only digits, +, -, space, (, ), . allowed)
    if (/[^\d+\-\s().]/.test(value)) {
      return { isValid: false, error: 'Please enter a valid mobile number.' };
    }

    // 3. Leading + validation: + can ONLY be the first character and cannot appear multiple times
    const plusMatches = value.match(/\+/g);
    if (plusMatches && (plusMatches.length > 1 || !value.startsWith('+'))) {
      return { isValid: false, error: 'Please enter a valid mobile number.' };
    }

    // 4. Balanced and valid parentheses check
    const openParens = (value.match(/\(/g) || []).length;
    const closeParens = (value.match(/\)/g) || []).length;
    if (openParens !== closeParens || openParens > 1) {
      return { isValid: false, error: 'Please enter a valid mobile number.' };
    }
    if (openParens === 1) {
      // Must contain 2 to 5 digits inside parentheses, e.g. (555) or (020)
      if (!/\(\d{2,5}\)/.test(value)) {
        return { isValid: false, error: 'Please enter a valid mobile number.' };
      }
    }

    // 5. Reject malformed consecutive punctuation
    if (/--|\.\.|\(\)|\s{3,}/.test(value)) {
      return { isValid: false, error: 'Please enter a valid mobile number.' };
    }

    // 6. Extract digits only for length and range checks
    const digitsOnly = value.replace(/\D/g, '');

    // Standard length checks: 8 to 15 digits (ITU E.164)
    if (digitsOnly.length < 8) {
      return { isValid: false, error: 'Please enter a valid mobile number.' };
    }
    if (digitsOnly.length > 15) {
      return { isValid: false, error: 'Please enter a valid mobile number.' };
    }

    // Reject all identical repeated digits (e.g. 0000000000, 1111111111)
    if (/^(\d)\1{7,}$/.test(digitsOnly)) {
      return { isValid: false, error: 'Please enter a valid mobile number.' };
    }

    // 7. If starts with +, ensure country code has 1-3 digits followed by valid subscriber digits
    if (value.startsWith('+')) {
      const intlPattern = /^\+[1-9]\d{0,3}[\s.-]?(?:\(\d{1,4}\)[\s.-]?|\d{1,4}[\s.-]?){1,4}\d{1,9}$/;
      if (!intlPattern.test(value)) {
        return { isValid: false, error: 'Please enter a valid mobile number.' };
      }
      return { isValid: true, error: '', normalized: '+' + digitsOnly };
    }

    // 8. Domestic format: standard 10 digits (NANP / US / Canada) or 8-15 valid digits
    if (digitsOnly.length === 10) {
      return { isValid: true, error: '', normalized: digitsOnly };
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      return { isValid: true, error: '', normalized: digitsOnly };
    } else if (digitsOnly.length >= 8 && digitsOnly.length <= 15) {
      return { isValid: true, error: '', normalized: digitsOnly };
    }

    return { isValid: false, error: 'Please enter a valid mobile number.' };
  },

  /**
   * Normalizes a valid phone number into standard format
   * E.g. (555) 349-8812 -> +15553498812 (or +447911123456)
   */
  normalizePhoneNumber(rawValue) {
    if (!rawValue) return '';
    const trimmed = String(rawValue).trim();
    const digits = trimmed.replace(/\D/g, '');
    if (trimmed.startsWith('+')) {
      return '+' + digits;
    }
    if (digits.length === 10) {
      return '+1' + digits;
    }
    if (digits.length === 11 && digits.startsWith('1')) {
      return '+' + digits;
    }
    return digits;
  },

  /**
   * Formats a 10-digit domestic phone number to (555) 349-8812
   */
  formatPhoneNumber(rawValue) {
    if (!rawValue) return '';
    const trimmed = String(rawValue).trim();
    if (trimmed.startsWith('+')) return trimmed;
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    if (digits.length === 11 && digits.startsWith('1')) {
      return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    return trimmed;
  },

  validateInput(input) {
    if (!input) return true;
    const value = input.value ? input.value.trim() : '';
    let isValid = true;
    let errorMessage = '';

    const isPhoneField = input.type === 'tel' ||
      (input.id && input.id.toLowerCase().includes('phone')) ||
      (input.name && input.name.toLowerCase().includes('phone'));

    const isEmailField = input.type === 'email' ||
      (input.id && input.id.toLowerCase().includes('email')) ||
      (input.name && input.name.toLowerCase().includes('email'));

    // 1. Required check
    if (input.hasAttribute('required') && !value) {
      isValid = false;
      if (isPhoneField) {
        errorMessage = input.getAttribute('data-err-required') || 'Please enter your mobile number.';
      } else if (isEmailField) {
        errorMessage = input.getAttribute('data-err-required') || 'Please enter your email address.';
      } else {
        errorMessage = input.getAttribute('data-err-required') || 'This field is required.';
      }
    }
    // 2. Phone check
    else if (isPhoneField && value) {
      const phoneRes = this.validatePhoneNumber(value);
      if (!phoneRes.isValid) {
        isValid = false;
        errorMessage = phoneRes.error || 'Please enter a valid mobile number.';
      }
    }
    // 3. Email check
    else if (isEmailField && value) {
      if (!this.patterns.email.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      }
    }
    // 4. Minlength check
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
    if (!input) return;
    const formGroup = input.closest('.form-group') || input.parentElement;
    let feedback = formGroup ? formGroup.querySelector('.invalid-feedback') : null;

    if (!feedback && formGroup) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      feedback.setAttribute('role', 'alert');
      feedback.setAttribute('aria-live', 'polite');
      if (input.parentElement === formGroup && input.nextSibling) {
        formGroup.insertBefore(feedback, input.nextSibling);
      } else {
        formGroup.appendChild(feedback);
      }
    }

    if (!isValid) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      if (feedback) {
        feedback.textContent = errorMessage;
        feedback.style.display = 'block';
      }
    } else {
      input.classList.remove('is-invalid');
      input.setAttribute('aria-invalid', 'false');
      if (feedback) {
        feedback.textContent = '';
        feedback.style.display = 'none';
      }
    }
  },

  validateForm(form) {
    if (!form) return false;
    const inputs = form.querySelectorAll('input:not([type="hidden"]), select, textarea');
    let formIsValid = true;
    let firstInvalid = null;

    inputs.forEach(input => {
      const isInputValid = this.validateInput(input);
      if (!isInputValid) {
        formIsValid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return formIsValid;
  },

  attach(form) {
    if (!form) return;
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      // Validate when the user leaves the field
      input.addEventListener('blur', () => {
        this.validateInput(input);
      });

      const isPhone = input.type === 'tel' ||
        (input.id && input.id.toLowerCase().includes('phone')) ||
        (input.name && input.name.toLowerCase().includes('phone'));

      // Real-time input listener
      input.addEventListener('input', () => {
        // If the field is currently invalid, immediately re-validate so the error clears as soon as it's corrected
        if (input.classList.contains('is-invalid')) {
          this.validateInput(input);
        } else if (isPhone && /[a-zA-Z]/.test(input.value)) {
          // If the user inputs alphabetic characters in a phone field, immediately alert them
          this.validateInput(input);
        }
      });
    });
  }
};

window.FormValidator = FormValidator;
