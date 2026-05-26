const DEFAULT_SUBMIT_TEXT = 'Submit Private Enquiry';

function setSubmitState(button, text, disabled = false) {
  button.textContent = text;
  button.style.background = 'rgba(201,168,76,0.3)';
  button.style.color = 'var(--gold)';
  button.style.border = '1px solid rgba(201,168,76,0.4)';
  button.disabled = disabled;
}

function resetSubmitState(button) {
  if (!button || button.disabled) return;

  button.textContent = DEFAULT_SUBMIT_TEXT;
  button.style.background = '';
  button.style.color = '';
  button.style.border = '';
}

function valueOf(id) {
  return document.getElementById(id)?.value.trim() || '';
}

function getInquiryPayload() {
  return {
    firstName: valueOf('first-name'),
    lastName: valueOf('last-name'),
    phone: valueOf('phone'),
    email: valueOf('email'),
    line: valueOf('line-id'),
    other: valueOf('other-contact'),
    interest: document.getElementById('interest')?.value || '',
    budget: document.getElementById('budget-range')?.value || '',
    message: valueOf('message'),
    submittedAt: new Date().toISOString()
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[+()0-9\s-]{8,}$/.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

function validateInquiry(payload) {
  if (!payload.firstName || !payload.phone || !payload.email || !payload.message) {
    return 'Please Add Name, Phone, Email, and Message';
  }

  if (!isValidPhone(payload.phone)) {
    return 'Please Add a Valid Phone Number';
  }

  if (!isValidEmail(payload.email)) {
    return 'Please Add a Valid Email Address';
  }

  return '';
}

export function initInquiryForm(endpoint) {
  const submitButton = document.getElementById('inquiry-submit');
  if (!submitButton) return;

  document.querySelectorAll('.inquiry-form input, .inquiry-form select, .inquiry-form textarea')
    .forEach(field => {
      field.addEventListener('input', () => resetSubmitState(submitButton));
      field.addEventListener('change', () => resetSubmitState(submitButton));
    });

  submitButton.addEventListener('click', async () => {
    if (endpoint.includes('PASTE_GOOGLE_APPS_SCRIPT')) {
      setSubmitState(submitButton, 'Email Setup Needed: Add Apps Script URL');
      return;
    }

    const payload = getInquiryPayload();
    const validationMessage = validateInquiry(payload);
    if (validationMessage) {
      setSubmitState(submitButton, validationMessage);
      return;
    }

    const defaultText = submitButton.textContent;
    submitButton.textContent = 'Sending Enquiry...';
    submitButton.disabled = true;

    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });
      setSubmitState(submitButton, 'Enquiry Sent - We Will Be In Touch', true);
    } catch {
      submitButton.textContent = 'Unable to Send - Please Try Again';
      submitButton.disabled = false;
      setTimeout(() => {
        submitButton.textContent = defaultText;
      }, 3000);
    }
  });
}
